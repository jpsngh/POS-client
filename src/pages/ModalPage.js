import { Button, Modal } from 'antd';
import { useState } from 'react';
import DefaultLayout from '../Components/DefaultLayout';
const ModalPage = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <DefaultLayout>
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <input placeholder={props.item.name}></input>
       <input placeholder={props.item.price}></input>
       <input placeholder="Set image url"></input>
      </Modal>
    </>
    </DefaultLayout>
  );
};
export default ModalPage;