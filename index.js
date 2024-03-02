const express = require("express")

let conn = require('./db.js')

const bcrypt = require('bcrypt')

const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const secretKey = "secretKey"

// REGISTER API

app.post('/register', async (req, res) => {
    let usersFromDB = [];
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)


    let userDetails = {
        user_name: req.body.userName,
        mail: req.body.mail,
        password: secPass
    }

    // Getting users from DB


    conn.query("select user_name from users", (err, result) => {

        if (err) {
            res.json(err)
        }
        else {
            usersFromDB = result.map(val => val.user_name)
            const users = usersFromDB.find(value => value == userDetails.user_name)

            if (users) {
                res.json(`user ${users} already exist`)
            }
            else {
                // INSERTING DATA INTO DB

                conn.query("insert into users set ?", userDetails, (err, data) => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.send("data updated in db")
                    }
                })
            }
        }
    })
})

// Login API

app.post('/login', async (req, res) => {

    let usersFromDB = []

    let userDetails = {
        user_name: req.body.user_name,
        password: req.body.password
    }



    // Getting users from DB
    conn.query("select user_name,password from users where user_name = ? ", userDetails.user_name, async (err, result) => {




        if (err) {

            res.status(500).json("Internal Server Error")
        }
        else {

            if (result.length > 0) {
                const users = await bcrypt.compare(userDetails.password, result[0].password)
                if (users) {

                    jwt.sign({ userDetails }, secretKey, (err, data) => {
                        if (err) {
                            res.json(err)
                        }
                        else {

                            res.json({

                                message: "Loing successfull",
                                "token": data,
                            })
                        }
                    })

                }
                else {
                    res.status(400).json("Ivalid Password")
                }

            }
            else {
                res.status(404).json("user not exists")
            }
        }
    })
})

// Token Middle Ware

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization']
    console.log(typeof bearerHeader !== "undefined")
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    }
    else {
        res.send({ result: "Token is not valid" })
    }

}



// ADDING EMPLOYEES TO THE DATA BASE

app.post("/addEmployees", verifyToken, (req, res) => {

    jwt.verify(req.token, secretKey, (err, data) => {
        if (err) {

            res.json("Ivalid token")
        }
        else {




            const empDetails = req.body


            conn.query("insert into emp set ?", empDetails, (err, result) => {

                if (err) {

                    res.status(500).json("Internal Server Error")
                }
                else {
                    res.status(200).json("Employee added to record")
                }

            })


        }
    })
})


// GET EMPLOYEE RECORDS
app.get('/EmpRecords', verifyToken, (req, res) => {

    jwt.verify(req.token, secretKey, (err, data) => {

        if (err) {
            res.json("invalid Token")
        }
        else {
            conn.query("select * from emp", (err, result) => {

                if (err) {

                    res.json(err)
                }
                else {
                    res.json(result)
                }
            })
        }

    })
})


// DELETING EMPLOYEE FROM DB

app.delete('/deletEmployee', verifyToken, async (req, res) => {

    await jwt.verify(req.token, secretKey, (err, data) => {

        if (err) {
            res.json("invalid token")
        }
        else {
            conn.query("DELETE FROM emp WHERE id=? or name=?", [req.body.id, req.body.name], (err, result) => {

                if (err) {

                    res.json(err)
                }
                else {
                    res.json("Row Deleted")
                }
            })
        }
    })

})


// FILTERING BASED ON DESIGNATION

app.get('/getempbydesg', verifyToken, async (req, res) => {

    await jwt.verify(req.token, secretKey, (err, data) => {

        if (err) {
            res.json("invalid token")
        }
        else {

            conn.query("select * from emp where designation=?", req.body.designation, (err, data) => {

                if (err) {
                    res.json(err)
                }
                else {
                    res.json(data)
                }
            })
        }
    })

})

// UPDATE EMPLOYEES DETAILS

app.put("/updateEmpDetails", verifyToken, (req, res) => {
    const { name, email, mobile, department, designation, id } = req.body;

    jwt.verify(req.token, secretKey, (err, data) => {
        if (err) {
            res.status(403).json("Invalid token");
        } else {
            if (!name || !email || !mobile || !department || !designation || !id) {
                res.status(400).json("Missing required parameters");
            } else {
                conn.query("UPDATE emp SET name = ?, email = ?, mobile = ?, department = ?, designation = ? WHERE id = ?",
                    [name, email, mobile, department, designation, id],
                    (err, result) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.status(200).json("Data Updated");
                        }
                    }
                );
            }
        }
    });
});




app.listen(3000, () => {

    console.log("server is running")
})