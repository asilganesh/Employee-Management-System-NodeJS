let conn = require('../db')
const util = require('util');


const queryAsync = util.promisify(conn.query).bind(conn);

module.exports = {

    insertEmpData: (empDetails) => {

        return queryAsync("insert into emp set ?", empDetails);

    },

    getEmpData: () => {

        return queryAsync("select * from emp")
    },

    deleteEMPData: (empDetails) => {

        return queryAsync("DELETE FROM emp WHERE id=? or name=?", [empDetails.id, empDetails.name])

    },

    getempbydesg: (empDetails) => {

        return queryAsync("select * from emp where designation=?", empDetails.designation)

    },

    updateEmpDetails: ({ name, email, mobile, department, designation, id }) => {

        return queryAsync("UPDATE emp SET name = ?, email = ?, mobile = ?, department = ?, designation = ? WHERE id = ?", [name, email, mobile, department, designation, id])

    }
}