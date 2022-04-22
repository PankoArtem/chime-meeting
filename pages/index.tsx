import { ChangeEventHandler, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Flex, FormField, Input, PrimaryButton,
} from 'amazon-chime-sdk-component-library-react';
import axios from 'axios';

const Home: NextPage = () => {
  const router = useRouter();

  const [meeting, setMeeting] = useState();
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
    const response = await axios.post(`http://localhost:8080/join?clientId=${clientName}`);
    const { Info } = response.data;
    setMeeting(Info.Meeting.Meeting);
  };

  const handleJoinMeetingClick = () => {
    router.push(`/meeting/${meeting.MeetingId}`);
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
