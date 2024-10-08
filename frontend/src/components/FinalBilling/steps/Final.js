import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdOutlineDelete } from 'react-icons/md';
import backendUrl from '../../../backendUrl.json';

export default function FinalBilling({ Customer_pk }) {
  const navigate = useNavigate();
  const columns = [
    {
      name: 'Pk',
      selector: row => row.produce_pk,
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
      selector: row => Math.round(row.price * row.quantity),
    },
    {
      name: 'Delete',
      cell: (row) => (
        <button
          onClick={async () => {
            try {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
              }).then((result) => {
                if (result.isConfirmed) {
                  let val = [...data];
                  val = val.filter((item) => item.produce_pk !== row.produce_pk);
                  setData(val);
                  Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                  });
                }
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <MdOutlineDelete className="w-6 h-6 text-red-500" />
        </button>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [billing, setBilling] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const pkRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${backendUrl.backend_url}/getFarmProduces`);
      setBilling(res.data);
    };

    fetchData();
  }, [Customer_pk]);

  const submitHandler = (e) => {
    e.preventDefault();
    const produce_pk = e.target[0].value;
    const quantity = e.target[1].value;
    const total = document.getElementById('total');

    setData([...data, { produce_pk, name, quantity, price }]);

    e.target[0].value = '';
    e.target[1].value = '1';
    setName('');
    setPrice('');
    setQuantity(1);
    total.innerText = '';

    pkRef.current.focus();
  };

  const addTotal = (e) => {
    const form = e.target.form;
    const quantity = parseFloat(form[1].value);
    setQuantity(quantity);
    const total = document.getElementById('total');
    if (!isNaN(quantity) && !isNaN(price)) {
      total.innerText = Math.round(quantity * price);
    } else {
      total.innerText = 0;
    }
  };

  const show = (e) => {
    const pk = e.target.value;
    const item = billing.find((item) => item.produce_pk == pk);
    const total = document.getElementById('total');
    if (item) {
      setName(item.name);
      setPrice(item.cost);
      setQuantity(1);
      total.innerText = Math.round(item.cost);
    } else {
      setName('');
      setPrice('');
      setQuantity(1);
      total.innerText = "";
    }
  };

  const UpdateItems = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backendUrl.backend_url}/customer/farmProduce/${Customer_pk}`, data);
      Swal.fire({
        text: 'Nursery Items Updated Successfully!',
        icon: 'success',
      }).then(() => {
        navigate('/bill', { state: { Customer_id: Customer_pk } });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const calculateGrandTotal = () => {
    return data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div>
            <form className="flex items-center justify-between" onSubmit={submitHandler}>
              <label className="font-bold">Pk</label>
              <input
                className="w-16 p-2 border rounded shadow appearance-none"
                autoFocus
                onChange={show}
                ref={pkRef}
                min={1}
                list="item-list"
                required
              />

              <datalist id="item-list">
                {billing.map(item => (
                  <option key={item.produce_pk} value={item.produce_pk}>{item.produce_pk}-{item.name}</option>
                ))}
              </datalist>

              <label className="font-bold">Item Name</label>
              <div className="p-2 border rounded shadow appearance-none w-60 h-11" id="name">
                {name}
              </div>

              <label className="font-bold">Quantity</label>
              <input
                id="quantityId"
                type="number"
                value={quantity}
                className="w-16 p-2 border rounded shadow appearance-none"
                onChange={addTotal}
                step="any"
                min={0}
              />

              <label className="font-bold">Price</label>
              <div className="w-16 p-2 border rounded shadow appearance-none h-11" id="price">
                {price}
              </div>

              <label className="font-bold">Total</label>
              <div className="p-2 border rounded shadow w-28 h-11" id="total"></div>

              <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold w-16">Add</button>
            </form>
          </div>
          <DataTable columns={columns} data={data} />
          <div className="flex justify-between mt-4">
            <div className="p-3 font-semibold bg-gray-200 rounded-lg">
              Grand Total: {calculateGrandTotal()}
            </div>
            <form onSubmit={UpdateItems}>
              <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
