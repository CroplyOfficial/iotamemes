const IotaButton = ({ address }: any) => {
  return (
    <div style={{ margin: '10px 30px 30px 30px' }}>
      {/* @ts-ignore */}
      <iota-button
        address={address}
        currency='USD'
        label='Donate to Creator'
        type='donation'
      >
        {/* @ts-ignore */}
      </iota-button>
    </div>
  );
};

export default IotaButton;
