const sql = require('mysql')

let conn = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ganesh@464",
    database: "employee_management_sys"
});

conn.connect(() => {
    console.log("sql connected")
})

module.exports = conn