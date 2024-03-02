const bcrypt = require('bcrypt')
const empModel = require('../model/empModel')
const jwt = require('jsonwebtoken')

const secretKey = "secretKey"

module.exports = {

    // TO Get EMP DETAILS FROM DB
    getEmpDetails: async (req, res) => {


        jwt.verify(req.token, secretKey, async (err, data) => {
            if (err) {

                res.status(403).json("Invalid token");
            }
            else {

                await empModel.getEmpData()
                    .then(result => res.status(200).json(result))
                    .catch(err => res.status(500).json(err))

            }
        })



    },



    // TO ADDING EMP INTO DB

    addEmployee: async (req, res) => {

        jwt.verify(req.token, secretKey, async (err, data) => {
            if (err) {

                res.status(403).json("Invalid token");
            }
            else {

                const empDetails = req.body
                let empAdded = await empModel.insertEmpData(empDetails)
                    .then(result => res.status(200).json("Employee added to record"))
                    .catch(err => res.status(500).json("Internal Server Error"))

            }
        })


    },

    // TO DELETE EMP FROM DB

    deleteEmployee: async (req, res) => {

        jwt.verify(req.token, secretKey, async (err, data) => {
            if (err) {

                res.status(403).json("Invalid token");
            }
            else {

                const empDetails = req.body
                let empAdded = await empModel.deleteEMPData(empDetails)
                    .then(result => res.status(200).json("Emp Data Deleted"))
                    .catch(err => res.status(500).json("Internal Server Error"))

            }
        })

    },

    // GET EMP DETAILS BY DESGNATION

    getempbydesg: async (req, res) => {

        jwt.verify(req.token, secretKey, async (err, data) => {
            if (err) {

                res.status(403).json("Invalid token");
            }
            else {

                const empDetails = req.body
                let empAdded = await empModel.getempbydesg(empDetails)
                    .then(result => res.status(200).json(result))
                    .catch(err => res.status(500).json("Internal Server Error"))

            }
        })

    },

    // UPDATE EMP DETAILS IN DB

    updateEmpDetails: async (req, res) => {

        jwt.verify(req.token, secretKey, async (err, data) => {
            if (err) {

                res.status(403).json("Invalid token");
            }
            else {

                const empDetails = req.body

                let empAdded = await empModel.updateEmpDetails(empDetails)
                    .then(result => res.status(200).json("Employee Details Updated"))
                    .catch(err => res.status(500).json(err))

            }
        })

    },

}