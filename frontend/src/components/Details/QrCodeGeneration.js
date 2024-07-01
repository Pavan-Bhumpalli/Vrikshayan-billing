import React from 'react';
import QRCode from 'react-qr-code';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BsQrCode } from 'react-icons/bs';

const MySwal = withReactContent(Swal);

function QrCodeGeneration({ id, name, bgImage, topImage }) {
  const handlePrint = () => {
    const printableArea = document.getElementById('printableArea');
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printableArea.outerHTML;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.innerHTML = `
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        #printableArea {
          background-image: url('${bgImage}') !important;
          background-size: cover !important;
        }
        #name {
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);

    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore the original content
  };

  const showAlert = () => {
    MySwal.fire({
      title: "Vrikshayan",
      html: (
        <div 
          id="printableArea" 
          style={{ 
            width: '50mm', 
            height: '85mm', 
            backgroundImage: `url(${bgImage})`, 
            backgroundSize: 'cover', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent:"center",
            position: 'relative'
          }}
        >
          <img src={topImage} alt="Top Image" style={{ position: 'absolute', top: '10mm', width: '60%' }} className='pt-3'/>
          <div style={{ marginTop: '30mm' }} className='flex flex-col justify-center items-center'>
            <QRCode value={String(id)} size={100} />
            <p className='font-bold text-lg p-3' id='name'>{name}</p>
          </div>
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: 'Print',
      cancelButtonText: 'Close',
      preConfirm: () => handlePrint()
    });
  };

  return (
    <div className="App">
      <BsQrCode onClick={showAlert}/>
    </div>
  );
}

export default QrCodeGeneration;
