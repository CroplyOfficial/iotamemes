import { useState, useEffect } from 'react';
import Container80 from '../../components/Container80/Container80';
import Card from '../../components/Card/Card';
import StackGrid from '../../components/StackGrid/StackGrid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './SettingsPage.css';
import { RootState } from '../../store';
import { logout } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

const SettingsPage = ({ history }: any) => {
  const [user, setUser]: any = useState();
  const [message, setMessage]: any = useState();
  const [wallet, setWallet]: any = useState();
  const [tagline, setTagline]: any = useState();

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLogin;

  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const user = await axios.get(`/api/users/${userInfo.id}`);
      setUser(user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/')
  }

  const formSubmitHandler = async (e: any) => {
    try {
      e.preventDefault();
      const config: any = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data }: any = await axios.put(
        '/api/users',
        {
          wallet,
          tagline,
        },
        config
      );
      setMessage('updated successfully');
    } catch (error) {
      console.error(error);
      setMessage('Unable to update :(');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container80>
      <StackGrid>
        <div className='cardContainer'>
          <Card>
            <div className='settings'>
              <div className='formBody'>
                <form style={{ padding: 0 }} onSubmit={formSubmitHandler}>
                  {message && <div className='message'>{message}</div>}
                  <label htmlFor='walletAddress'>Wallet Address</label>
                  <br />
                  <input
                    type='text'
                    id='walletAddress'
                    placeholder='Wallet Address'
                    defaultValue={user && user.data.wallet}
                    onChange={(e) => setWallet(e.target.value)}
                  />
                  <br />
                  <label htmlFor='tagline'>Tagline</label>
                  <br />
                  <textarea
                    id='tagline'
                    cols={30}
                    rows={10}
                    defaultValue={user && user.data.bio}
                    onChange={(e) => setTagline(e.target.value)}
                  ></textarea>
                  <br />
                  <input type='submit' value='UPDATE' />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type='button' style={{ padding: '10px 30px', background: 'red', color: 'white', border: 'none', borderRadius: '5px' }} onClick={logoutHandler}>Logout</button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </StackGrid>
    </Container80>
  );
};

export default SettingsPage;
