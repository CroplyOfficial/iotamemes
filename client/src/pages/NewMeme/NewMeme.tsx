import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import Container80 from '../../components/Container80/Container80';
import Card from '../../components/Card/Card';
import StackGrid from '../../components/StackGrid/StackGrid';
import './NewMeme.css';

const NewMeme = () => {
  const userLogin: any = useSelector((state: RootState) => state.userLogin);
  const { error, loading, userInfo }: any = userLogin;

  const [tags, setTags] = useState(['iotameme']);
  const [file, setFile] = useState({ file: '' });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  console.log(error, loading, userInfo);

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append('image', file.file);
    formData.append('memeTags', tags);

    try {
      setUploading(true);
      const { data } = await axios.post('/api/memes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
        onUploadProgress: (data) => {
          console.log(progress);
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
    } catch (error) {}
  };

  return (
    <div>
      <Container80>
        <StackGrid>
          <Card>
            <form onSubmit={formSubmitHandler}>
              <input type='text' />
              <input
                type='file'
                name='image'
                id='image'
                onChange={(e: any) =>
                  setFile({
                    file: e.target.files[0],
                  })
                }
                required
              />
              <input type='submit' value='upload' />
            </form>
            {uploading && (
              <>
                <p>Uploading...</p>
                <div className='progressContainer'>
                  <div className='bar' style={{ width: `${progress}%` }}></div>
                </div>
              </>
            )}
          </Card>
        </StackGrid>
      </Container80>
    </div>
  );
};

export default NewMeme;
