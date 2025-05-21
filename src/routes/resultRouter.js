const express = require("express");
const resultController = require("../controllers/resultController.js");

const resultRouter = express.Router();
resultRouter.post("/", resultController.postResult);
resultRouter.put("/", resultController.putResult);
resultRouter.get("/", resultController.getResults);
resultRouter.get("/:id", resultController.getResultById);
resultRouter.delete("/:id", resultController.deleteResult);
 
module.exports = resultRouter;