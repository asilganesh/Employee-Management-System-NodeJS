const express = require("express")

const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const secretKey = "secretKey"

//Route Imports
const userRouter = require("../Employee-Management-System-NodeJS/routes/UserRoutes.js")
const empRouter = require("../Employee-Management-System-NodeJS/routes/EmpRoutes.js")


// Routes
app.use(userRouter)
app.use(empRouter)



app.listen(3000, () => {

    console.log("server is running")
})