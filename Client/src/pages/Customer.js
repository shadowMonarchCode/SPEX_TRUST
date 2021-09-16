import Axios from "axios";
import { useState, useEffect } from "react";

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    Axios.get("https://spextrustapi.herokuapp.com/view-customer-list").then(function (response) {
      setCustomerList(response.data);
    });
  }, []);
  return (
    <div className="CustomerList">
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Account Number</th>
          <th>Email</th>
          <th>Balance</th>
        </tr>
        {customerList.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.customerId}</td>
              <td>{val.customerName}</td>
              <td>{val.customerAccount}</td>
              <td>{val.customerEmail}</td>
              <td>{val.customerBalance}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default CustomerList;
