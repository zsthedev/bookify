import React from 'react';
import { Modal } from 'react-bootstrap';
const __Modal__ = ({
  children,
  show,
  handleModal,
  title = 'Modal Heading',
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default __Modal__;
