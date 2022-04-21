import { NextPage, NextPageContext } from 'next';
import { useEffect } from 'react';
import axios from 'axios';
import {
  LocalVideo, useLocalAudioOutput,
  useLocalVideo,
  useMeetingManager, useToggleLocalMute,
  VideoGrid, VideoTile,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import Head from 'next/head';
import CustomControlBar from '../../src/components/CustomControlBar/ControlBar';

// TODO resolve axios config working with SSR
export async function getServerSideProps({ query: { clientId } } : NextPageContext) {
  const response = await axios.post(`http://localhost:8080/join?clientId=${clientId}`);

  const { Info } = response.data;

  return {
    props: {
      meeting: Info.Meeting.Meeting,
      attendee: Info.Attendee.Attendee,
    },
  };
}

const Meeting: NextPage = ({ meeting, attendee }) => {
  const { toggleVideo, isVideoEnabled } = useLocalVideo();
  const { toggleAudio, isAudioOn } = useLocalAudioOutput();
  const { muted, toggleMute } = useToggleLocalMute();

  const meetingManager = useMeetingManager();

  useEffect(() => {
    const joinMeeting = async () => {
      const meetingSessionConfiguration = new MeetingSessionConfiguration(meeting, attendee);

      await meetingManager.join(meetingSessionConfiguration);

      await meetingManager.start();
    };
    joinMeeting();
  }, [meeting, attendee]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <Head>
        <title>ARAB ZOOM ZOOM</title>
      </Head>
      <CustomControlBar
        isVideoEnabled={isVideoEnabled}
        muted={muted}
        isAudioOn={isAudioOn}
        toggleVideo={toggleVideo}
        toggleMute={toggleMute}
        toggleAudio={toggleAudio}
      />
      <div style={{
        width: '100%',
        padding: '0 20px',
        height: '80%',
      }}
      >
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
            nameplate="Tile 3"
          />
        </VideoGrid>
      </div>
    </div>
  );
};

export default Meeting;
