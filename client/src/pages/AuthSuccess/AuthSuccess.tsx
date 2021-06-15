import React from 'react';
import axios from 'axios';

const AuthSuccess = ({ location }: any) => {
  const query: string = location.search;
  const discordCode: string = query.split('code=')[1] || '';

  return <div>{discordCode}</div>;
};

export default AuthSuccess;
