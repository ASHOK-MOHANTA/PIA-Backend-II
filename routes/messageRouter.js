const express = require("express");
const router = express.Router();

const {getMessage} = require("../controllers/messageController");
const {protect} = require("../middlewares/authMiddleware");

router.get("/",protect,getMessage);

module.exports = router;