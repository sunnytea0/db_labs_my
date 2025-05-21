const { Pool } = require('pg');
const settings = require("../settings.js");

const connectionOption = settings.connectionOption;

const pool = new Pool({
    user: connectionOption.user,
    host: connectionOption.host,
    database: connectionOption.database,
    password: connectionOption.password,
    port: connectionOption.port,
  });

exports.getAnswers = async function(request, response)
{
    //debugger;
    try {
        const result = await pool.query('SELECT  id, content, user_id, question_id, answer_id FROM Answer');
        response.status(200).json(result.rows);
        return;
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };    
};

exports.getAnswerById = async function(request, response)
{
//    debugger;
    const id = request.params.id; 
    try {
        const result = await pool.query('SELECT  id, content, user_id, question_id, answer_id FROM Answer WHERE id = $1', [id]);
        response.status(200).json(result.rows);
        return;
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };    
};

exports.postAnswer = async function(request, response)
{
 //   debugger;
    const answer = request.body;
  
    try 
    {
        const result = await pool.query('INSERT INTO Answer (content, user_id, question_id) VALUES ($1, $2, $3) RETURNING *', [answer.content, answer.userId,answer.questionId]);
        response.json(result.rows[0]);
        console.log("Answer aded");
    
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };
    
}

exports.putAnswer = async function(request, response)
{
 //   debugger;
    const answer = request.body;
  
    try 
    {
        const result = await pool.query('UPDATE answer SET content = $1, user_id = $2, question_id = $3 WHERE id = $4 RETURNING *', [answer.content, answer.userId,answer.questionId, answer.id]);
        response.json(result.rows[0]);
        console.log("Answer updated");
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };
    
}

exports.deleteAnswer = async function(request, response){
     
    const id = request.params.id; 
    //debugger;
    try {
        result = await pool.query('DELETE FROM Answer WHERE id = $1', [id]);
        response.status(200);
        if (result && result.rowCount > 0)
        {
            response.send(result);
            console.log("Answer deleted");
        }
        else
        {
            response.send("Answer not found");
            console.log("Answer not found");
        }
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };    
    
 }
