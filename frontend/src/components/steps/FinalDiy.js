import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FinalDiy = ({ Customer_pk }) => {
  const initialItems = [
    { name: 'Item 1', count: 0, price: 100 },
    { name: 'Item 2', count: 0, price: 50 },
    { name: 'Item 3', count: 0, price: 80 },
  ];

  const [items, setItems] = useState(initialItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const calculateGrandTotal = () => {
      const total = selectedItems.reduce((acc, index) => {
        return acc + (items[index].count * items[index].price);
      }, 0);
      setGrandTotal(total);
    };

    calculateGrandTotal();
  }, [selectedItems, items]);

  const handleCheckboxChange = (index) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(index)) {
        return prevSelectedItems.filter(itemIndex => itemIndex !== index);
      } else {
        return [...prevSelectedItems, index];
      }
    });
  };

  const handleCountChange = (index, newCount) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, count: Number(newCount) } : item
    );
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    const selectedData = items.filter((item, index) => selectedItems.includes(index));
    console.log('Selected Items:', selectedData);
    try {
      const res = await axios.put(`http://localhost:5000/customer/diy/${Customer_pk}`, selectedData);
      Swal.fire({
        text: "Nursery Items Updated Successfully!",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Count</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">
                {selectedItems.includes(index) ? (
                  <input
                    type="number"
                    className="w-16 p-2 border rounded shadow appearance-none"
                    value={item.count}
                    onChange={(e) => handleCountChange(index, e.target.value)}
                  />
                ) : (
                  item.count
                )}
              </td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              <td className="py-2 px-4 border-b">{item.count * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold mt-4">
            {grandTotal}
        </button>
      </div>
    </div>
  );
};

export default FinalDiy;
