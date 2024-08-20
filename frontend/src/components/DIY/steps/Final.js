import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import backendUrl from '../../../backendUrl.json';

const FinalDiy = ({ Customer_pk }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios(`${backendUrl.backend_url}/getDIYItems`);
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItems();
  }, [Customer_pk]);

  useEffect(() => {
    const calculateGrandTotal = () => {
      const total = selectedItems.reduce((acc, index) => {
        return acc + (items[index].count * items[index].cost);
      }, 0);
      setGrandTotal(total);
    };

    calculateGrandTotal();
  }, [selectedItems, items]);

  const handleCheckboxChange = (index) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(index)) {
        // Reset the count to 0 when deselected
        const updatedItems = items.map((item, i) =>
          i === index ? { ...item, count: 0 } : item
        );
        setItems(updatedItems);
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
    try {
      await axios.put(`${backendUrl.backend_url}/customer/diy/${Customer_pk}`, selectedData);
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
              <td className="py-2 px-4 border-b"><center>{item.name}</center></td>
              <td className="py-2 px-4 border-b">
                {selectedItems.includes(index) ? (
                  <input
                    type="number"
                    className="w-16 p-2 border rounded shadow appearance-none"
                    value={item.count}
                    onChange={(e) => handleCountChange(index, e.target.value)}
                  />
                ) : (
                  <center>0</center>
                )}
              </td>
              <td className="py-2 px-4 border-b"><center>{item.cost}</center></td>
              <td className="py-2 px-4 border-b">
                <center>{selectedItems.includes(index) ? item.count * item.cost : 0}</center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
      <div className="bg-gray-200 p-3 rounded-lg font-semibold">
        Grand Total: {grandTotal}
      </div>
        <button
          className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FinalDiy;
