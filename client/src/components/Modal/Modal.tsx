import './Modal.css';

const Modal = ({ visible, setVisible, children }: any) => {
  
  const toggleVisible = () => {
    setVisible(false);
  }; 

  return (
    <>
      <div className={ visible ? 'backdrop' : 'hidden' } onClick={toggleVisible}></div>
      <div className={ visible ? 'modal__center' : 'hidden' }>
        <div className="closeButtonContainer">
          <button className='closeButton' onClick={toggleVisible}><b>X</b> close</button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
