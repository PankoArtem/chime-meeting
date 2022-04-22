import { ChangeEventHandler, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Flex, FormField, Input, PrimaryButton,
} from 'amazon-chime-sdk-component-library-react';
import { CreateMeetingResponse } from 'amazon-chime-sdk-component-library-react/lib/types';
import meetingApi from '../src/axios/meetingApi';

const Home: NextPage = () => {
  const router = useRouter();

  const [meeting, setMeeting] = useState<CreateMeetingResponse & {MeetingId: string}>();
  const [clientName, setClientName] = useState('');

  const [existingMeetingId, setExistingMeetingId] = useState('');

  useEffect(() => {
    if (meeting) { setExistingMeetingId(meeting.MeetingId); }
  }, [meeting]);

  const handleIdChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setClientName(event.target.value);
  };

  const handleExistingMeetingIdChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setExistingMeetingId(event.target.value);
  };

  const handleCreateMeetingClick = async () => {
    try {
      const response = await meetingApi.createMeeting(clientName);
      const { Info } = response.data;
      setMeeting(Info.Meeting.Meeting);
    } catch (e) {
      console.error(e);
    }
  };

  const handleJoinMeetingClick = () => {
    router.push(`/meeting/${existingMeetingId}/${clientName}`);
  };

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Flex layout="stack">
        <FormField
          field={Input}
          label="How do you want another people call you?"
          value={clientName}
          fieldProps={{ name: 'clientName', placeholder: 'Your name' }}
          onChange={handleIdChange}
          layout="stack"
        />
        <PrimaryButton label="Create Meeting" onClick={handleCreateMeetingClick} />
        <span style={{ padding: '20px 0', textAlign: 'center' }}>or</span>
        <FormField
          field={Input}
          label="Join your friends with meeting ID"
          value={existingMeetingId}
          fieldProps={{ name: 'clientName', placeholder: 'Meeting Id' }}
          onChange={handleExistingMeetingIdChange}
          layout="stack"
        />
        <PrimaryButton label="Join Existing Meeting" onClick={handleJoinMeetingClick} />
      </Flex>
    </div>
  );
};

export default Home;
