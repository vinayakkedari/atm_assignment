# atm_assignment

#Author: Vinayak Kedari.

**To Install dependencies**
$ npm install

**To start the server**
$ node server.js

##APIs

**1. Register a user's card (8-digits) and ATM Pin (4-digits)**
Request:
URL: http://localhost:7000/registerUser
Body: {
    "cardNum" : "12345678",
    "cardPin" : "1234"
}
Response:
{
    "status": true,
    "message": "User created succesfully."
}

**2. Authentication API to validate the user**
Request:
URL: http://localhost:7000/authenticateUser
Body: {
    "cardNum" : "12345678",
    "cardPin" : "1234"
}
Response:
{
    "status": true,
    "message": "User Authenticated."
}

**3. Deposit the money**
Request:
URL: http://localhost:7000/depositeAmount
Body: {
    "cardNum" : "12345678",
    "amount" : 1000
}
Response:
{
    "status": true,
    "message": "Deposited 1000 succesfully. Available balance is: 3000"
}

**4. Withdraw the money**
Request:
URL: http://localhost:7000/withdrawAmount
Body: {
    "cardNum" : "12345678",
    "amount" : 2500
}
Response:
{
    "status": true,
    "message": "Withdraw 2500 succesfully. Available balance is: 500. Notes: 2000: 1 500: 1 100: 0"
}