module.exports = function (app) {

  // Routes for ATM operations
  app.post("/registerUser", app.api.atm.registerUser);
  app.post("/authenticateUser", app.api.atm.authenticateUser);
  app.post("/depositeAmount", app.api.atm.depositeAmount);
  app.post("/withdrawAmount", app.api.atm.withdrawAmount);

}