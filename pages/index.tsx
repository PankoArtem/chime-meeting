import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  const [id, setId] = useState('0');

  return (
    <div>
      <p>HELLO NEXT</p>
      <input
        value={id}
        type="text"
        onChange={(event) => {
          event.preventDefault();
          setId(event.target.value);
        }}
      />
      <Link href={`custom/${id}`}>
        <a>lol</a>
      </Link>
    </div>
  );
};

export default Home;
