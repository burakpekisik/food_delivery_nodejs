import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Customers = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/user/customers`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.users); // 'data' yerine 'users' kullanılıyor
    } else {
      toast.error("Error");
    }
  };

  const removeUser = async (customerId) => {
    const response = await axios.post(`${url}/api/user/remove`, { id: customerId });
    await fetchList();

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
      console.log(response.data)
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Customers List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Name</b>
          <b>Email</b>
          <b>Cart Items</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{JSON.stringify(item.cartData)}</p> {/* Sepet verisi JSON formatında gösteriliyor */}
              <p onClick={() => removeUser(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Customers;
