import './IotaButton.css';
import { v4 as uuid4 } from 'uuid';

const IotaButton = ({ address, text, style }: any) => {
  const identifier:any = uuid4();
  return (
    <>

      <button
        style={style}
        className="better-iota-button"
        onClick={(e: any) => {
      {/* @ts-ignore */}
            const iotaButton: any = document.getElementById(identifier).shadowRoot.querySelector('ibtn-button-donation').shadowRoot.querySelector('button');
            iotaButton.click()
        }}
      >{/* @ts-ignore */}
      {text}
      </button>
      <div style={{ display: 'none' }}>
        {/* @ts-ignore */}
        <iota-button
          id={identifier}
          address={address}
          currency='EUR'
          label={text}
          type='donation'
        >
          {/* @ts-ignore */}
        </iota-button>
      </div>
    </>
  );
};

IotaButton.defaultProps = {
  text: 'Donate To Artist',
  style: {}
};

export default IotaButton;
