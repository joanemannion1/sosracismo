
import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserModal = ({ data = {}, show = false }) => {
    const handleClose = () => { show = false};

    return (
        <>
        <Modal show={show}  onHide={handleClose} dialogClassName='custom-dialog'>
                <Modal.Header closeButton={true}>
                    <Modal.Title>{data}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save changes</Button>
                </Modal.Footer>
        </Modal>

        </>
    );
}

export default UserModal;