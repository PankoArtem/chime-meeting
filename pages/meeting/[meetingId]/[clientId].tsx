import { NextPage } from 'next';
import { useEffect } from 'react';
import {
  Heading,
  LocalVideo, useLocalAudioOutput,
  useLocalVideo,
  useMeetingManager, useToggleLocalMute,
  VideoGrid, VideoTile,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CustomControlBar from '../../../src/components/CustomControlBar/ControlBar';
import meetingApi from '../../../src/axios/meetingApi';

const MeetingPage: NextPage = () => {
  const { toggleVideo, isVideoEnabled } = useLocalVideo();
  const { toggleAudio, isAudioOn } = useLocalAudioOutput();
  const { muted, toggleMute } = useToggleLocalMute();

  const { query: { meetingId, clientId } } = useRouter();

  const meetingManager = useMeetingManager();

  useEffect(() => {
    const joinMeeting = async () => {
      try {
        const response = await meetingApi.joinMeeting(clientId as string, meetingId as string);

        const { Info: { Meeting, Attendee } } = response.data;

        const meetingSessionConfiguration = new MeetingSessionConfiguration(
          Meeting.Meeting,
          Attendee.Attendee,
        );

        await meetingManager.join(meetingSessionConfiguration);

        await meetingManager.start();
      } catch (e) {
        console.error(e);
      }
    };
    joinMeeting();
  }, [meetingId, clientId]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
    }}
    >
      <Head>
        <title>ZOOM ZOOM</title>
      </Head>
      <CustomControlBar
        isVideoEnabled={isVideoEnabled}
        muted={muted}
        isAudioOn={isAudioOn}
        toggleVideo={toggleVideo}
        toggleMute={toggleMute}
        toggleAudio={toggleAudio}
        leaveMeeting={() => {}}
      />
      <div style={{
        width: '100%',
        padding: '0 20px',
        height: '80%',
      }}
      >
        <Heading level={2} tag="p">
          MEETING
        </Heading>
        <VideoGrid layout="featured">
          <VideoTile
            style={{
              border: '1px solid grey',
              gridArea: 'ft',
            }}
            nameplate="Featured Tile"
          />
          <VideoTile
            style={{
              border: '1px solid grey',
              gridArea: '',
            }}
            nameplate="Tile 2"
          />
          <LocalVideo
            nameplate={clientId as string}
          />
        </VideoGrid>
      </div>
    </div>
  );
};

export default MeetingPage;
