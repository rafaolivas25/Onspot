/*
const mysql = require('mysql');
const conn = mysql.createPool({
    host: "192.168.30.11",
    user: "tour4us",
    password: "tour4us",
    database: 'onspot',
    port: '3308'
});
module.exports = conn;
*/


const mysql = require('mysql');
const conn = mysql.createPool({
    host: "192.168.30.11",
    user: "server",
    password: "123456789",
    database: 'onspot',
    port: '3306'
});

module.exports = conn;







