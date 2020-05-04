var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(7000, () => {
  console.log("Server running on port 7000");
});

var atmCash = {
  "twoThousandNotes": 100,
  "fiveHundredNotes": 500,
  "hundredNotes": 1000
}
var users = [];

app.post("/registerUser", (req, res, next) => {
  if (!(/^\d+$/.test(req.body.cardNum)) || req.body.cardNum.length !== 8 || !req.body.cardNum) {
    res.status(400).send({
      status: false,
      message: "Please enter valid Card Number."
    });
  } else if (!(/^\d+$/.test(req.body.cardPin)) || req.body.cardPin.length !== 4 || !req.body.cardPin) {
    res.status(400).send({
      status: false,
      message: "Please enter valid Card Pin."
    });
  } else {
    // Save the New user data and send success response.
    let newUser = {
      cardNum: req.body.cardNum,
      cardPin: req.body.cardPin,
      balance: 0
    };
    let userExist = false;
    users.forEach(function (item) {
      if (item.cardNum === req.body.cardNum) {
        userExist = true;
        res.status(200).send({
          status: true,
          message: "User Already Exist."
        });
      }
    });
    if (!userExist) {
      users.push(newUser);
      res.status(200).send({
        status: true,
        message: "User created succesfully."
      });
    }
  }
});


app.post("/authenticateUser", (req, res, next) => {
  if (!(/^\d+$/.test(req.body.cardNum)) || req.body.cardNum.length !== 8 || !req.body.cardNum) {
    res.status(400).send({
      status: false,
      message: "Please enter valid Card Number."
    });
  } else if (!(/^\d+$/.test(req.body.cardPin)) || req.body.cardPin.length !== 4 || !req.body.cardPin) {
    res.status(400).send({
      status: false,
      message: "Please enter valid Card Pin."
    });
  } else {
    // Authenticate the user data and send success response.
    let userauthenticated = false;
    users.forEach(function (item) {
      if (req.body.cardNum == item.cardNum && req.body.cardPin == item.cardPin) {
        userauthenticated = true;
        res.status(200).send({
          status: true,
          message: "User Authenticated."
        });
      }
    });
    if (!userauthenticated) {
      res.status(401).send({
        status: false,
        message: "User Authentication failed Or User not found."
      });
    }
  }
});


app.post("/depositeAmount", (req, res, next) => {
  if (!(/^\d+$/.test(req.body.cardNum)) || req.body.cardNum.length !== 8 || !req.body.cardNum) {
    res.status(400).send({
      status: false,
      message: "Please enter valid Card Number."
    });
  } else if (!req.body.amount || !(/^\d+$/.test(req.body.amount))) {
    res.status(400).send({
      status: false,
      message: "Please enter valid amount."
    });
  } else {
    // Deposit amount and send success response.
    let amountDeposited = false;
    users.forEach(function (item, index) {
      if (req.body.cardNum == item.cardNum) {
        amountDeposited = true;
        let totalAmount = parseInt(item.balance) + parseInt(req.body.amount);
        users[index].balance = totalAmount;
        res.status(200).send({
          status: true,
          message: "Deposited " + req.body.amount + " succesfully. Available balance is: " + totalAmount
        });
      }
      if (!amountDeposited) {
        res.status(400).send({
          status: true,
          message: "Deposite request failed something went wrong."
        });
      }
    });
  }
});


app.post("/withdrawAmount", (req, res, next) => {
  if (!(/^\d+$/.test(req.body.cardNum)) || req.body.cardNum.length !== 8 || !req.body.cardNum) {
    res.status(400).send({
      status: false,
      message: "Please enter valid Card Number."
    });
  } else if (!req.body.amount || !(/^\d+$/.test(req.body.amount))) {
    res.status(400).send({
      status: false,
      message: "Please enter valid amount."
    });
  } else {
    // Deposit amount and send success response.
    let amountWithdraw = false;
    users.forEach(function (item, index) {
      if (req.body.cardNum == item.cardNum) {
        amountWithdraw = true;
        if (req.body.amount % 100 !== 0) {
          res.status(400).send({
            status: false,
            message: "Please enter amount in multiple of 100."
          });
        } else if (req.body.amount > 20000) {
          res.status(400).send({
            status: false,
            message: "Your withdraw limit is 20000."
          });
        } else if (req.body.amount > item.balance) {
          res.status(400).send({
            status: false,
            message: "Your account balance is not sufficient."
          });
        } else {
          let remainingAmount = item.balance - req.body.amount;
          let partialAmount = req.body.amount;

          let noteTwoK = Math.floor(partialAmount / 2000);
          if (noteTwoK < atmCash.twoThousandNotes) {
            partialAmount = partialAmount - (noteTwoK * 2000);
          }

          let noteFiveH = Math.floor(partialAmount / 500);
          if (noteFiveH < atmCash.fiveHundredNotes) {
            partialAmount = partialAmount - (noteFiveH * 500);
          }

          let noteHundred = Math.floor(partialAmount / 100);
          if (noteHundred < atmCash.hundredNotes) {
            partialAmount = partialAmount - (noteHundred * 100);
          }

          if (partialAmount == 0) {
            atmCash.twoThousandNotes = atmCash.twoThousandNotes - noteTwoK;
            atmCash.fiveHundredNotes = atmCash.fiveHundredNotes - noteFiveH;
            atmCash.hundredNotes = atmCash.hundredNotes - noteHundred;

            res.status(200).send({
              status: true,
              message: "Withdraw " + req.body.amount + " succesfully. Available balance is: "
                + remainingAmount + ". Notes: 2000: " + noteTwoK + " 500: " + noteFiveH + " 100: " + noteHundred
            });
          } else {
            res.status(400).send({
              status: false,
              message: "Notes are not available."
            });
          }
        }
      }
      if (!amountWithdraw) {
        res.status(400).send({
          status: true,
          message: "Withdraw request failed something went wrong."
        });
      }
    });
  }
});
