const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true }
);

const CustomerSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAccount: {
    type: Number,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerBalance: {
    type: Number,
    required: true,
  },
});

const HistorySchema = new mongoose.Schema({
  SenderName: {
    type: String,
    required: true,
  },
  RecipientName: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
const History = mongoose.model("History", HistorySchema);

app.get("/view-customer-list", (req, res) => {
  Customer.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.get("/check-username/:name", (req, res) => {
  const name = req.params.name;
  Customer.findOne({ customerName: name }, (err, result) => {
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.post("/transfer-money", (req, res) => {
  let sender = req.body.sender;
  let recipient = req.body.recipient;
  let amount = req.body.amount;

  // Time
  const today = new Date();
  const time =
    today.getHours() +
    ":" +
    today.getMinutes() +
    " | " +
    today.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  Customer.findOne({ customerName: sender }, (e, r) => {
    if (e) {
      res.send(e);
    } else {
      let newAmount = r.customerBalance - amount;
      if (newAmount < 0) {
        const history = new History({
          SenderName: sender,
          RecipientName: recipient,
          Amount: amount,
          Time: time,
          Status: "Failed",
        });

        history.save();
        res.send("Insufficient Balance!");
      } else {
        Customer.updateOne(
          { customerName: sender },
          {
            $set: { customerBalance: newAmount },
            $currentDate: { lastModified: true },
          },
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log(result);
            }
          }
        );
        Customer.findOne({ customerName: recipient }, (e, r) => {
          if (e) {
            res.send(e);
          } else {
            let newAmount = r.customerBalance - -amount;
            Customer.updateOne(
              { customerName: recipient },
              {
                $set: { customerBalance: newAmount },
                $currentDate: { lastModified: true },
              },
              (error, result) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(result);
                }
              }
            );
          }
        });
        const history = new History({
          SenderName: sender,
          RecipientName: recipient,
          Amount: amount,
          Time: time,
          Status: "OK",
        });

        history.save();
        res.send("Transaction Completed at " + time);
      }
    }
  });
});

app.get("/view-history", (req, res) => {
  History.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
