import React, { useState, useEffect } from 'react';
import topImage from './Images/top.png';

const Bill = () => {
  const [data, setData] = useState({});
  const [sno, setSno] = useState(1); // State for sequential numbering
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCustomer/17');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    const printableArea = document.getElementById('printableArea').outerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printableArea;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore the original content
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col justify-center h-screen bg-slate-50'>
      <div
        id="printableArea"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <img src={topImage} alt="Top Image" style={{ position: 'absolute', width: '20%' }} className='pt-3' />
        <div style={{ marginTop: '24mm' }} className='flex flex-col pl-8'>
          <p style={{ fontSize: '16px' }}>50-50-30/12/2, abdsxtefcv plaza,</p>
          <p style={{ fontSize: '16px' }}>ASDCFVGBHN, VISHAKAPATNAM,</p>
          <p style={{ fontSize: '16px' }}>GSTIN: 37ACJPL9300K2ZB, Ph: 08912796666,</p>
          <p style={{ fontSize: '16px' }}>State Code: 37</p>
          <div style={{ borderBottom: '2px dotted', width: '100%' }} />
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>INVOICE</p>
          <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{data.paymentMode}</p>
          <div style={{ borderBottom: '2px dotted', width: '100%' }} />
          <div className='flex flex-col items-start'>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Customer: {data.name}</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Phone: {data.phoneNumber}</p>
          </div>
          <div style={{ borderBottom: '1px dotted #000', width: '100%' }} />
          <div className='flex flex-col items-start'>
            <p style={{ fontSize: '16px' }}>Bill No. : {data.pk}</p>
            <p style={{ fontSize: '16px' }}>Date: {data.createdAt?.substring(0, 10)}</p>
          </div>
          <div style={{ borderBottom: '1px dotted #000', width: '100%' }} />
          <div className='flex justify-around'>
            <p style={{ fontSize: '13px', flex: '0.5' }}>#</p>
            <p style={{ fontSize: '13px', flex: '2' }}>ItemName</p>
            <p style={{ fontSize: '13px', flex: '1' }}>Rate</p>
            <p style={{ fontSize: '13px', flex: '1' }}>Count</p>
            <p style={{ fontSize: '13px', flex: '1' }}>Price</p>
          </div>
          <div style={{ borderBottom: '1px dotted #000', width: '100%' }} />

          {/* Render activities */}
          {data.activities && (
            <>
              {renderMovieAndLunch(data)}
              {data.activities.diyCount && renderItems(data.activities.diyCount, 'DIY Activities', sno)}

              {data.activities.beverages && renderItems(data.activities.beverages, 'Beverages', sno)}
              {data.activities.farmProduce && renderItems(data.activities.farmProduce, 'Farm Produce', sno)}
              {data.activities.nurseryCount && renderItems(data.activities.nurseryCount, 'Nursery Items', sno)}
            </>
          )}

          {/* Cumulative total */}
          <div className='flex justify-around mt-4'>
            <p style={{ fontSize: '16px', flex: '2', fontWeight: 'bold' }}>Total</p>
            <p style={{ fontSize: '16px', flex: '1' }}></p>
            <p style={{ fontSize: '16px', flex: '1' }}></p>
            <p style={{ fontSize: '16px', flex: '1' }}></p>
            <p style={{ fontSize: '16px', flex: '1', fontWeight: 'bolder' }}>{calculateTotal(data)}</p>
          </div>

          <p style={{ fontSize: '16px' }}>Thank you for your visit</p>
          <p style={{ fontSize: '16px' }}>Have a nice day</p>
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='px-4 py-2 mt-4 font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800' onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}

const renderItems = (items, title, sno) => {
  let total = 0;
  return (
    <>
      <p style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>{title}</p>
      {items.map((item, index) => {
        total += (item.count || item.quantity) * (item.cost || item.price);
        return (
          <div key={index} className='flex justify-around'>
            <p style={{ fontSize: '13px', flex: '0.5' }}>{sno + index}</p> {/* Use sno + index for sequential numbering */}
            <p style={{ fontSize: '13px', flex: '2' }}>{item.name}</p>
            <p style={{ fontSize: '13px', flex: '1' }}>{item.cost || item.price}</p>
            <p style={{ fontSize: '13px', flex: '1' }}>{item.count || item.quantity}</p>
            <p style={{ fontSize: '13px', flex: '1' }}>{(item.count || item.quantity) * (item.cost || item.price)}</p>
          </div>
        );
      })}
      <div style={{ borderBottom: '1px dotted #000', width: '100%' }} />
    </>
  );
};

const calculateTotal = (data) => {
  let total = 0;
  if (data.activities) {
    if (data.activities.diyCount) {
      data.activities.diyCount.forEach((item) => {
        total += item.count * item.cost;
      });
    }
    if (data.activities.beverages) {
      data.activities.beverages.forEach((item) => {
        total += item.quantity * item.price;
      });
    }
    if (data.activities.farmProduce) {
      data.activities.farmProduce.forEach((item) => {
        total += item.quantity * item.price;
      });
    }
    if (data.activities.nurseryCount) {
      data.activities.nurseryCount.forEach((item) => {
        total += item.quantity * item.price;
      });
    }
    if (data.activities.movieCount) {
      total += data.activities.movieCount * 100;
    }
    if (data.activities.lunchCount) {
      total += data.activities.lunchCount * 300;
    }
  }
  return total;
};

const renderMovieAndLunch = (data) => {
  return (
    <>
      {data.activities.movieCount > 0 && (
        <div className='flex justify-around'>
          <p style={{ fontSize: '13px', flex: '0.5' }}>1</p>
          <p style={{ fontSize: '13px', flex: '2' }}>Movie</p>
          <p style={{ fontSize: '13px', flex: '1' }}>100</p>
          <p style={{ fontSize: '13px', flex: '1' }}>{data.activities.movieCount}</p>
          <p style={{ fontSize: '13px', flex: '1' }}>{data.activities.movieCount * 100}</p>
        </div>
      )}
      {data.activities.lunchCount > 0 && (
        <div className='flex justify-around'>
          <p style={{ fontSize: '13px', flex: '0.5' }}>#</p>
          <p style={{ fontSize: '13px', flex: '2' }}>Lunch</p>
          <p style={{ fontSize: '13px', flex: '1' }}>300</p>
          <p style={{ fontSize: '13px', flex: '1' }}>{data.activities.lunchCount}</p>
          <p style={{ fontSize: '13px', flex: '1' }}>{data.activities.lunchCount * 300}</p>
        </div>
      )}
      <div style={{ borderBottom: '1px dotted #000', width: '100%' }} />
    </>
  );
};

export default Bill;
