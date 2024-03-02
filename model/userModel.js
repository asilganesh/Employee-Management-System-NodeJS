let conn = require('../db')
const util = require('util');


const queryAsync = util.promisify(conn.query).bind(conn);


module.exports = {

    queryAllUserNames: () => {

        return queryAsync("SELECT user_name FROM users");
    },

    insertUserData: (userDetails) => {

        return queryAsync("insert into users set ?", userDetails);


    },
    
    queryUserNameAndPassword: (userDetails) => {

        return queryAsync("select user_name,password from users where user_name = ? ", userDetails.user_name);


    }


}

