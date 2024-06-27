import DataTable from "react-data-table-component";
import { useState } from "react";
import axios from "axios";

export default function Final() {
  const columns = [
    {
      name: "Pk",
      selector: row => row.pk
    },
    {
      name: "ItemName",
      selector: row => row.name
    },
    {
      name: "Quantity",
      selector: row => row.quantity
    },
    {
      name: "Price",
      selector: row => row.price
    },
    {
      name: "Total",
      selector: row => row.price * row.quantity
    }
  ];
  const [data, setData] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    const pk = e.target[0].value;
    const name = e.target[1].value;
    const quantity = e.target[2].value;
    const price = e.target[3].value;
    setData([...data, {pk, name, quantity, price }]);
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    e.target[4].value = "";
    const total = document.getElementById("total");
    total.innerText = "";

  }
  const addTotal = (e) => {
    const form = e.target.form;
    const quantity = parseInt(form[2].value);
    const price = parseInt(form[3].value);
    const total = document.getElementById("total");
    if (!isNaN(quantity) && !isNaN(price)) {
      total.innerText = quantity * price;
    } else {
      total.innerText = 0;
    }
  }
  const addItem =async (e) => {
    const res= await axios.get("http://localhost:5000/getNurseryItems");
    const name=document.getElementById("name");
    const price=document.getElementById("price");
    const pk=e.target.value;
    

  }
  return (
    <div className="container md:mt-10 ">
      <div className="flex flex-col items-center">
        <div className="w-full">
        <div>
            <form className="flex  items-center justify-between" onSubmit={submitHandler} >
              <label className="font-bold" >Pk</label>
              <input type="number" className="shadow appearance-none border rounded w-16 p-2 " autoFocus onChange={addItem}/>
              <label className="font-bold">Item Name</label>
              <input type="text" className="shadow appearance-none border rounded p-2 " id="name"/>
              <label className="font-bold">Quantity</label>
              <input type="number" className="shadow appearance-none border rounded p-2 w-16" onChange={addTotal} />
              <label className="font-bold " >Price</label>
              <input type="number" className="shadow appearance-none border rounded p-2 w-28" onChange={addTotal} id="price"/>
              <label className="font-bold ">Total</label>
              <div className="shadow border rounded p-2 w-28 h-11" id="total"></div>
              <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold w-16" >
                Add
              </button>
            </form>
          </div>
          <DataTable
            columns={columns}
            data={data}
          />
          <div className="flex flex-row-reverse">
            <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold " >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
