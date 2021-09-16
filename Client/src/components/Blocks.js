const Blocks = (props) => {
  return (
    <div className="Blocks">

      <fieldset className="sno">
        <legend>S. No.</legend>
        <h1>{props.index}.</h1>
      </fieldset>
      <fieldset className="time">
        <legend>Time</legend>
        <h1>{props.time}</h1>
      </fieldset>
      <fieldset className="name">
        <legend>Sender</legend>
        <h1>{props.sname}</h1>
      </fieldset>
      <fieldset className="name">
        <legend>Recipient</legend>
        <h1>{props.rname}</h1>
      </fieldset>
      <fieldset className="amount">
        <legend>Amount</legend>
        <h1>$ {props.amount}</h1>
      </fieldset>
      <fieldset className="status" style={{backgroundColor: props.status==="OK" ? "lightgreen":"lightcoral"}}>
        <legend>Status</legend>
        <h1>{props.status}</h1>
      </fieldset>
    </div>
  );
};

export default Blocks;
