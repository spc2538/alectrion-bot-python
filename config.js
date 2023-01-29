const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const config = {};
config.envName = process.env.ENVIRONMENT;

config.serviceEndpoint = process.env.SERVICE_ENDPOINT;
config.serviceAlectrion = process.env.SERVICE_ALECTRION;
config.serviceAlias = process.env.SERVICE_ALIAS;

config.pm2Name = config.envName + "-"+config.serviceAlias+"-bot";
config.pm2Logs =  "logs/" + config.pm2Name + ".log";

console.log(config);
module.exports = config;