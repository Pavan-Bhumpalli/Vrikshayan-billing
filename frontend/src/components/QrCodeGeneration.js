import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Modal from 'react-modal';
import { BsQrCode } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
    }
};

function QrCodeGeneration({ id, name }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = () => {
        setModalContent(
            <QRCode
                value={id}
                title={name}
            />
        );
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
    };

    return (
        <div className="App">
            <center>
                
                <BsQrCode onClick={openModal}/>

                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={customModalStyles}
                    ariaHideApp={false} // This line is important for accessibility
                >
                    <div className='flex flex-row-reverse'>
                    <IoMdClose onClick={closeModal} className='w-8 h-8'/>
                    </div>

                    <div className="text-center">
                        {modalContent}
                    </div>
                </Modal>
            </center>
        </div>
    );
}

export default QrCodeGeneration;
