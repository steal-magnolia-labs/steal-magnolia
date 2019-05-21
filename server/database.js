const pg = require('pg-promise')({});

const uri = 'postgres://ltdnkwnbccooem:64ad308e565b39cc070194f7fa621ae0e925339be5a1c69480ff2a4462eab4c4@ec2-54-163-226-238.compute-1.amazonaws.com:5432/ddsu160rb5t7vq?ssl=true';
const db = pg(uri);

module.exports = db;
