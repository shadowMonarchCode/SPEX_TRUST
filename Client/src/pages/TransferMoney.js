import axios from "axios";
import { useState } from "react";

const TransferMoney = () => {
  // Sender Info
  const [senderName, setSenderName] = useState("");
  const [senderNameExist, setSenderNameExist] = useState(1);

  // Recipient Info
  const [recipientName, setRecipientName] = useState("");
  const [recipientNameExist, setRecipientNameExist] = useState(1);

  // Message
  const [info, setInfo] = useState("");

  // Form Info
  const [data, setData] = useState({
    sender: "",
    recipient: "",
    amount: 0,
  });
  const handleSubmit = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://spextrustapi.herokuapp.com/transfer-money",
      data: data,
    }).then((res) => {
      setInfo(res.data);
    });
  };

  return (
    <div className="Transfer">
      <form
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <h1>Transfer Money</h1>
        {
          <h2
            style={{
              fontSize: "15px",
              fontFamily: "Play",
              textAlign: "center",
              margin: "0px",
              padding: "10px",
              borderRadius: "10px",
              color: "white",
              backgroundColor: info
                ? info === "Insufficient Balance!"
                  ? "lightcoral"
                  : "lightgreen"
                : "",
            }}
          >
            {info}
          </h2>
        }
        <input
          id="sender"
          style={{
            borderColor: senderNameExist || senderName === "" ? "green" : "red",
          }}
          type="text"
          required
          placeholder="Sender's Name"
          value={senderName}
          onChange={(event) => {
            setSenderName(event.target.value);
            handleSubmit(event);
          }}
          onBlur={(event) => {
            axios
              .get("https://spextrustapi.herokuapp.com/check-username/" + event.target.value)
              .then((res) => {
                setSenderNameExist(res.data);
              });
          }}
        />
        {senderNameExist || senderName === "" ? (
          ""
        ) : (
          <p>!! Incorrect Sender Username</p>
        )}
        <input
          id="recipient"
          style={{
            borderColor:
              recipientNameExist || recipientName === "" ? "green" : "red",
          }}
          type="text"
          required
          placeholder="Recipient's Name"
          value={recipientName}
          onChange={(event) => {
            setRecipientName(event.target.value);
            handleSubmit(event);
          }}
          onBlur={(event) => {
            axios
              .get("https://spextrustapi.herokuapp.com/check-username/" + event.target.value)
              .then((res) => {
                setRecipientNameExist(res.data);
              });
          }}
        />
        {recipientNameExist || recipientName === "" ? (
          ""
        ) : (
          <p>!! Incorrect Recipient Username</p>
        )}
        <input
          id="amount"
          type="number"
          required
          placeholder="Amount"
          onChange={(event) => {
            handleSubmit(event);
          }}
        />
        <button disabled={!senderNameExist && !recipientNameExist}>
          Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferMoney;
