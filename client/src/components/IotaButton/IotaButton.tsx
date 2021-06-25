import './IotaButton.css'

const IotaButton = ({ address, text, style }: any) => {
  return (
    <>

      <button
        style={style}
        className="better-iota-button"
        onClick={(e: any) => {
      {/* @ts-ignore */}
            const iotaButton: any = document.querySelector('iota-button').shadowRoot.querySelector('ibtn-button-donation').shadowRoot.querySelector('button');
            iotaButton.click()
        }}
      >{/* @ts-ignore */}
      {text}
      </button>
      <div style={{ display: 'none' }}>
        {/* @ts-ignore */}
        <iota-button
          id="iota-button"
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
