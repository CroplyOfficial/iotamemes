import React, { useEffect } from 'react';
import axios from 'axios';

const AuthSuccess = ({ location, history }: any) => {
  const query: string = location.search;
  const discordCode: string = query.split('code=')[1] || '';

  const authorize = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/authenticate',
      { code: discordCode },
      config
    );

    return data;
  };

  useEffect(() => {
    const auth = async () => {
      await authorize();
      history.push('/');
    };

    auth();
  });

  return <div>{discordCode}</div>;
};

export default AuthSuccess;
