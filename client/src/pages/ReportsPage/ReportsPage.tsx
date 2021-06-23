import { useState, useEffect } from 'react';
import axios from 'axios';
import Container80 from '../../components/Container80/Container80';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import './ReportsPage.css';

const ReportsPage = () => {
  const [loading, setLoading]:any = useState(true);
  const [flags, setFlags]:any = useState(null);

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLogin;

  const getFlags = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    }

    const { data }: any = await axios.get('/api/flags', config).catch((error: any) => {
      console.log(error);
    });
    setFlags(data);
    setLoading(false);
  };

  const removeFlag = async (flagId: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      },
      data: {
        flagId
      }
    };
    await axios.delete(`/api/flags`, config);
    getFlags();
  };

  const deleteMeme = async (flagId: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }, 
      data: {
        flagId
      }
    };
    await axios.delete(`/api/flags/meme`, config);
    getFlags();
  };

  useEffect(() => {
    getFlags();
  }, []);

  return (
    <Container80>
      <Card>
        { loading ? (
          <Loader />
        ) : (
          <table>
            <tr>
              <th>Username</th>
              <th>Flag Count</th>
              <th>View Meme</th>
              <th>Actions</th>
            </tr>
          { flags.map((flag: any) => (
            <tr key={flag._id}>
              <td><Link to={`/user/${flag.user}`}>{flag.username}</Link></td>
              <td>{flag.flagCount}</td>
              <td><Link to={`/meme/${flag.meme}`}>View Meme</Link></td>
              <td>
                <button onClick={() => { removeFlag(flag._id) }}>Remove Flag</button>
                <button onClick={() => { deleteMeme(flag._id) }}>Delete Flag</button>
              </td>
            </tr>
          ))}
          </table>
        )}
      </Card>
    </Container80>
  );
};

export default ReportsPage;
