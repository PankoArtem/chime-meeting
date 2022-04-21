import { ChangeEventHandler, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  const [id, setId] = useState('');

  const handleIdChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setId(event.target.value);
  };

  const handleJoinClick = () => {
    router.push(`/meeting/${id}`);
  };

  return (
    <div>
      <label htmlFor="clientId">
        <p>YOU APPEAR WITH NAME</p>
        <input type="text" id="clientId" value={id} onChange={handleIdChange} />
      </label>
      <button type="button" onClick={handleJoinClick}>Join Meeting</button>
    </div>
  );
};

export default Home;
