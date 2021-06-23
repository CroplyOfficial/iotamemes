import Container80 from '../../components/Container80/Container80';
import Card from '../../components/Card/Card';
import './AboutPage.css';
import IotaButton from '../../components/IotaButton/IotaButton';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Container80>
      <Card>
        <div style={{padding: '30px'}}>
          <h1 className="aboutHeading">All you need to know about IOTA MEMES</h1>

          <p>IOTA Memes is a platform for sharing and rewarding creators for the joy they bring into this world, through a simple up-voting system using Likotas. Supported by community donations and competitions.</p>

          <p>As simple as the title suggests, we’re all about upping the meme game!</p>

          <p>Login using your discord and uploads are as easy as 1, 2, 3.</p>
          <ol>
            <li>Upload New Meme image - (1MB file limit, jpg, png, gif)</li>
            <li>Tag your image and submit - (add up to 6 tags, separated by a comma)</li>
            <li>Get Likotas and donations! - (confirm your image, rise in the ranks, to get more rewards and donations)</li>
          </ol>

          <strong>Voting</strong>
          <p>The voting system uses a simple up vote metric, the more Likotas your memes get, the higher in the page your meme becomes, the more exposure and reputation you generate, and hopefully more donations.</p>

          <strong>Sharing</strong>
          <p>Sharing is possible using the share buttons on each image card, to popular networks such as Twitter, Facebook, Reddit.</p>


          <strong>Donations</strong>
          <p>Donations are what keep the community going and all payments are made possible using the iota-button and Firefly Wallet using IOTA tokens. The donation system is 100% direct. All gifts, donations, and support goes directly to the creators wallet. No middleman.</p>


          <strong>Flagging</strong>
          <p>We have also included a community flagging system, so that any inappropriate content can be flagged, reveiwed, and removed.</p>
          <p>If you deem an image inappropriate, just click the flag.</p>
          <p>It’s that simple! So, get creating, get sharing, get supporting.</p>
          <div className="aboutBottom">
            <div className="iota-button">
              <IotaButton 
                text='SUPPORT OUR WORK' 
                address='iota1qplr8pw4tu24jdagkleqvp28rwsdfhx9cgcuaxvjaz5zd9gx9u50vg2v7md'
              ></IotaButton> 
            </div>
            <a href="https://firefly.iota.org/">
              <img src='/images/firefly.png' />
            </a>
          </div>
          <p>
            <Link to="/terms" style={{marginRight: '20px'}}>Terms</Link>     <Link to="/privacy">Privacy</Link>
          </p>
        </div>
      </Card>
    </Container80>
  );
}; 

export default AboutPage;
