const express = require('express')
const router=express.Router()
const {registerUser,authUser,allUsers}=require('../Controller/userController')
const {protect}=require('../Middleware/authMiddleware')


router.route('/').post(registerUser)
router.post('/login',authUser)
router.get('/',protect,allUsers)



module.exports=router;