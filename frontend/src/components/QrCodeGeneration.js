import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Modal from 'react-modal';

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
                size={256} 
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
                includeMargin={false}
                renderAs="svg"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-qr-code" viewBox="0 0 16 16 " onClick={openModal}>
                    <path d="M2 2h2v2H2z" />
                    <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                    <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                    <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
                    <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                </svg>

                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={customModalStyles}
                    ariaHideApp={false} // This line is important for accessibility
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7" onClick={closeModal}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                    <div className="text-center">
                        {modalContent}
                    </div>
                </Modal>
            </center>
        </div>
    );
}

export default QrCodeGeneration;
