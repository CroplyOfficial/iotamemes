import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';

const AuthSuccess = ({ location, history }: any) => {
  const query: string = location.search;
  const discordCode: string = query.split('code=')[1] || '';

  const disptach: any = useDispatch();

  useEffect(() => {
    const auth = async () => {
      await disptach(login(discordCode));
      history.push('/');
    };

    auth();
  });

  return <div>{discordCode}</div>;
};

export default AuthSuccess;
