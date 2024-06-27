import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

export default function Final({ Customer_pk }) {
  const columns = [
    {
      name: 'Pk',
      selector: row => row.pk,
    },
    {
      name: 'ItemName',
      selector: row => row.name,
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
    },
    {
      name: 'Price',
      selector: row => row.price,
    },
    {
      name: 'Total',
      selector: row => row.price * row.quantity,
    },
  ];

  const [data, setData] = useState([]);
  const [nursery, setNursery] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const pkRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/getNurseryItems');
      console.log("res:", res.data);
      setNursery(res.data);
    };

    fetchData();
  }, [Customer_pk]);

  const submitHandler = e => {
    e.preventDefault();
    const pk = e.target[0].value;
    const quantity = e.target[1].value;
    const total = document.getElementById('total');

    setData([...data, { pk, name, quantity, price }]);

    e.target[0].value = '';
    e.target[1].value = '';
    setName('');
    setPrice('');
    total.innerText = '';

    pkRef.current.focus();
  };

  const addTotal = e => {
    const form = e.target.form;
    const quantity = parseInt(form[1].value);
    const total = document.getElementById('total');
    console.log("quantity:", quantity, "price:", price);
    if (!isNaN(quantity) && !isNaN(price)) {
      total.innerText = quantity * price;
    } else {
      total.innerText = 0;
    }
  };

  const show = e => {
    const pk = e.target.value;
    const item = nursery.find(item => item.nursery_pk == pk);
    if (item) {
      console.log("item:", item);
      setName(item.name);
      setPrice(item.cost);
    } else {
      setName('');
      setPrice('');
    }
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div>
            <form className="flex items-center justify-between" onSubmit={submitHandler}>

              <label className="font-bold">Pk</label>
              <input
                type="number"
                className="w-16 p-2 border rounded shadow appearance-none"
                autoFocus
                onChange={show}
                ref={pkRef}
              />

              <label className="font-bold">Item Name</label>
              <div className="p-2 border w-60 h-11 rounded shadow appearance-none" id="name">{name}</div>

              <label className="font-bold">Quantity</label>
              <input
                type="number"
                className="w-16 p-2 border rounded shadow appearance-none"
                onChange={addTotal}
                min={0}
              />

              <label className="font-bold">Price</label>
              <div className="p-2 border w-16 h-11 rounded shadow appearance-none" id="price">{price}</div>

              <label className="font-bold">Total</label>
              <div className="p-2 border rounded shadow w-28 h-11" id="total"></div>

              <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold w-16">Add</button>
            </form>
          </div>
          <DataTable columns={columns} data={data} />
          <div className="flex flex-row-reverse">
            <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
