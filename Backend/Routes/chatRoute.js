const express = require('express')
const router=express.Router()
const {accessChat,fetchChat,creategroupChat,renameGroup,removeFromGroup,addToGroup}=require('../Controller/chatController')
const {protect}=require('../Middleware/authMiddleware')

router.route("/").post(protect,accessChat)
router.route("/").get(protect,fetchChat)
router.route("/group").post(protect,creategroupChat)
router.route("/rename").put(protect,renameGroup)
router.route("/groupremove").put(protect,removeFromGroup)
router.route("/groupadd").put(protect,addToGroup)

module.exports=router;