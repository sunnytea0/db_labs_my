const express = require("express");
const answerController = require("../controllers/answerController.js");

const answerRouter = express.Router();
answerRouter.post("/", answerController.postAnswer);
answerRouter.put("/", answerController.putAnswer);
answerRouter.get("/", answerController.getAnswers);
answerRouter.get("/:id", answerController.getAnswerById);
answerRouter.delete("/:id", answerController.deleteAnswer);
 
module.exports = answerRouter;