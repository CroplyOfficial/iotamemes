const IotaButton = ({ address, text }: any) => {
  return (
    <div style={{ margin: '10px 30px 30px 30px' }}>
      {/* @ts-ignore */}
      <iota-button
        address={address}
        currency='USD'
        label={text}
        type='donation'
      >
        {/* @ts-ignore */}
      </iota-button>
    </div>
  );
};

IotaButton.defaultProps = {
  text: 'Donate To Artist'
};

export default IotaButton;
