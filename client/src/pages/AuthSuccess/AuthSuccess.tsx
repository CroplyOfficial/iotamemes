import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import Container80 from '../../components/Container80/Container80';
import Loader from '../../components/Loader/Loader';

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
  }, []);

  return (
    <div>
      <Container80>
        <Loader />
      </Container80>
    </div>
  );
};

export default AuthSuccess;
