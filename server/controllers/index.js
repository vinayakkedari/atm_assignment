module.exports = function (app) {

  app.api = {};
  
  require('./atmController')(app);

}
