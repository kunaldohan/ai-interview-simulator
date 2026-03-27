const express = require("express");
const router = express.Router();
const { generateQuestion, evaluateAnswer } = require("../controllers/interviewController");

router.post("/generate-question", generateQuestion);
router.post("/evaluate-answer", evaluateAnswer);

module.exports = router;
