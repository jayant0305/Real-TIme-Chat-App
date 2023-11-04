const express = require('express')
const router=express.Router()
const {registerUser,authUser}=require('../Controller/userController')



router.route('/').post(registerUser)
router.post('/login',authUser)



module.exports=router;