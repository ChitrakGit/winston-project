const developmentLogger = require("./Developments/developments.index");
const productionLogger = require("./Production/production.index");
const dotenv = require('dotenv');

dotenv.config({path: './.env'})
let logger = null;
console.log(process.env.NODE_ENV)
if (String(process.env.NODE_ENV).toLowerCase() == 'production') {
    logger = productionLogger();
  }else{
    logger = developmentLogger()
  }

module.exports = logger;