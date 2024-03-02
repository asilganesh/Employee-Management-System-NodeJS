
const bcrypt = require('bcrypt')
const usermodel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const authToken = require('../middlewares/authMiddleware')


const secretKey = "secretKey"




module.exports = {

    // FOR REGISTER

    userRegister: async (req, res) => {


        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)


        let userDetails = {
            user_name: req.body.user_name,
            mail: req.body.mail,
            password: secPass
        }





        let userNamesfromDB = await usermodel.queryAllUserNames().then(result => result).catch(err => console.log(err))

        userNamesfromDB = userNamesfromDB.map(val => val.user_name)
        const users = userNamesfromDB.find(value => value == userDetails.user_name)


        if (users) {
            res.json(`user ${users} already exist`)
        }
        else {
            let userRegistered = await usermodel.insertUserData(userDetails).then(result => res.json("data Updated")).catch(err => res.json(err))

        }
    },

    // FOR LOGIN

    userLogin: async (req, res) => {

        let userDetails = {
            user_name: req.body.user_name,
            password: req.body.password
        }

        let userDetailfromDB = await usermodel.queryUserNameAndPassword(userDetails).then(result => result).catch(err => res.status(500).json("Internal Server Error"))

        if (userDetailfromDB.length > 0) {
            const users = await bcrypt.compare(userDetails.password, userDetailfromDB[0].password)

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

    // 
}

