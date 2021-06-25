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
import Modal from '../../components/Modal/Modal';

const SettingsPage = ({ history }: any) => {
  const [user, setUser]: any = useState();
  const [message, setMessage]: any = useState();
  const [wallet, setWallet]: any = useState();
  const [tagline, setTagline]: any = useState();
  const [visible, setVisible]: any = useState(false);

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

  const deleteUser = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        }
      };
      const deletedUser = await axios.delete('/api/users', config);
      logoutHandler();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container80>
      <StackGrid>
        <Modal visible={visible} setVisible={setVisible}>
          <h1>CONFIRM ACCOUNT DELETION</h1>
          <p style={{ padding: '10px 0' }}>You are about to delete your account for IotaMemes.com.</p>
          <p style={{ paddingBottom: '10px' }}>All of your memes will remain live and your connected user information will be removed.</p>
          <button className="confirm" onClick={deleteUser}>DELETE</button>
        </Modal>
        <div className='cardContainer'>
          <Card>
            <div className='settings'>
              <div className='formBody'>
                <form style={{ padding: 0 }} onSubmit={formSubmitHandler}>
                  {message && <div className='message'>{message}</div>}
                  <label htmlFor='walletAddress'>IOTA Wallet Address</label>
                  <br />
                  <input
                    type='text'
                    id='walletAddress'
                    placeholder='Iota Wallet Address'
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
                    <button type='button' style={{ padding: '10px 30px', background: '#f56642', color: 'white', border: 'none', borderRadius: '5px', margin: '5px', marginTop: '20px' }} onClick={(e) => {setVisible(true)}}>DELETE USER ACCOUNT</button>
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
