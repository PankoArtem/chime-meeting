import { NextPage, NextPageContext } from 'next';
import { useState } from 'react';
import axios from 'axios';

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
  const [mock, setMock] = useState();

  return (
    <div>
      <div>
        {JSON.stringify(meeting)}
      </div>
      <div>
        {JSON.stringify(attendee)}
      </div>
    </div>
  );
};

export default Meeting;
