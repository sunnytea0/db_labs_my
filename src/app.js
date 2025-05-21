const express = require("express");
// create app
const app = express();
const answerRouter = require("./routes/answerRouter.js");
const resultRouter = require("./routes/resultRouter.js");

app.use(express.static("web"));
app.use(express.static("scripts"));

app.use(express.json()); 

app.use("/api/answer", answerRouter);
app.use("/api/result", resultRouter);

app.use("/index", function(_, response){
     
    response.sendFile(__dirname + "/web/index.html");
});
// start listening connection on 3000 port
console.log("start listening connection on 3000 port");
app.listen(3000);