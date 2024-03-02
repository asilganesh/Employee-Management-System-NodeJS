const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const empController = require('../controller/empController')



// ADDING EMPLOYEES TO THE DATA BASE


router.post('/addEmployees', auth.verifyToken, empController.addEmployee)
router.get('/EmpRecords', auth.verifyToken, empController.getEmpDetails)
router.delete('/deletEmployee', auth.verifyToken, empController.deleteEmployee)
router.get('/getempbydesg', auth.verifyToken, empController.getempbydesg)
router.put('/updateEmpDetails', auth.verifyToken, empController.updateEmpDetails)






module.exports = router