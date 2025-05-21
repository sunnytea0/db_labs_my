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

exports.getResults = async function(request, response)
{
    //debugger;
    try {
        const result = await pool.query('SELECT  id, content, name, answer_id FROM Result');
        response.status(200).json(result.rows);
        return;
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };    
};

exports.getResultById = async function(request, response)
{
    //debugger;
    const id = request.params.id; 
    try {
        const result = await pool.query('SELECT id, content, name, answer_id FROM Result  WHERE id = $1', [id]);
        response.status(200).json(result.rows);
        return;
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };    
};

exports.postResult = async function(request, response)
{
    //debugger;
    const result = request.body;
  
    try 
    {
        const res = await pool.query('INSERT INTO Result (content, name, answer_id) VALUES ($1, $2, $3) RETURNING *', [result.content, result.name, result.answerId]);
        response.json(res.rows[0]);
        console.log("Result aded");
    
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };
    
}

exports.putResult = async function(request, response)
{
    //debugger;
    const result = request.body;
  
    try 
    {
        const res = await pool.query('UPDATE result SET content = $1, name = $2, answer_id = $3 WHERE id = $4 RETURNING *', [result.content, result.name, result.answerId, result.id]);
        response.json(res.rows[0]);
        console.log("Result updated");
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };
    
}

exports.deleteResult = async function(request, response){
     
    const id = request.params.id; 
    //debugger;
    try {
        result = await pool.query('DELETE FROM Result WHERE id = $1', [id]);
        response.status(200);
        if (result && result.rowCount > 0)
            {
                response.send(result);
                console.log("Result deleted");
            }
            else
            {
                response.send("Result not found");
                console.log("Result not found");
            }
    
    }
    catch (err) {
        console.log(err);
        response.status(400).send(err.message);
    };    
    
 }
