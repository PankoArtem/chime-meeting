import { FC } from 'react';
import {
  Camera,
  ControlBar,
  ControlBarButton,
  Microphone, Phone,
  Sound,
} from 'amazon-chime-sdk-component-library-react';

interface CustomControlBarProps {
  isVideoEnabled: boolean,
  muted: boolean,
  isAudioOn: boolean
  toggleMute: () => void,
  toggleAudio: () => void,
  toggleVideo: () => void,
  leaveMeeting: () => void
}

const CustomControlBar: FC<CustomControlBarProps> = ({
  isVideoEnabled, toggleVideo, muted, toggleMute, toggleAudio, isAudioOn, leaveMeeting,
}) => {
  const controlButtonProps = [
    {
      label: 'Camera',
      icon: <Camera disabled={!isVideoEnabled} />,
      onClick: toggleVideo,
    },
    {
      label: 'Mute',
      icon: <Microphone muted={muted} />,
      onClick: toggleMute,
    },
    {
      label: 'Speakers',
      icon: <Sound disabled={!isAudioOn} />,
      onClick: toggleAudio,
    },
    {
      label: 'Leave',
      icon: <Phone />,
      onClick: leaveMeeting,
    },
  ];

  return (
    <ControlBar showLabels layout="bottom">
      {controlButtonProps.map(
        (buttonProps) => <ControlBarButton {...buttonProps} key={buttonProps.label} />,
      )}
    </ControlBar>
  );
};

export default CustomControlBar;
