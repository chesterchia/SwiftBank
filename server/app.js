const express = require('express');
const app = express();
const redis = require('redis');
const { promisify } = require('util');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const pool =require('./database.js');
const { error } = require('console');
const port = 5000;
app.listen(port, ()=>{
    console.log(`Listening at port ${port}...`);
});

// Redis client
const redisClient = redis.createClient('6379', '127.0.0.1');
redisClient.on('error', error => console.error(error));
const redisSet = promisify(redisClient.set).bind(redisClient);
const redisGet = promisify(redisClient.get).bind(redisClient);

// Set a key value pair for Redis
app.post('/setValue', async(req, res) => {
    if (req.body.key && req.body.value) {
        try {
            await redisSet(req.body.key, req.body.value);
            res.send();
        } catch (e) {
            res.json(e);
        }
    }
    else {
        res.status(400).json({error: 'Wrong input.'});
    }
})

// Get a key value pair for Redis
app.get('/getValue/:key', async(req, res) => {
    if (!req.params.key) {
        return res.status(400).json({error: 'Wrong input.'});
    }
    try {
        const value = await redisGet(req.params.key);
        res.json(value);
    } catch (e) {
        res.json(e);
    }
})

//POST
app.post('/customer', async(req,res)=>{
    try {
        console.log(req.body);
        const {name,phone,email,house_no,city,zipcode,username,password} = req.body;
        console.log(`${name}`)
        const query= await pool.query('call insert_into_customer($1,$2,$3,$4,$5,$6,$7,$8)',[name,phone,email,house_no,city,zipcode,username,password]);
        res.send(query);
    } catch (err) {
        console.error(err.message);
    }
});
app.delete('/customer/:customer_id',async(req,res)=>{
    try {
        const {customer_id} = req.params;
        const query = await pool.query('delete from customer where customer_id=cast($1 as integer)',[customer_id]);
        res.send(query.rows);
    } catch (error) {
        console.log(error);
    }
});

app.post('/employee', async(req,res)=>{
    try {
        const {username,user_password} =req.body;
        const query = await pool.query('call insert_into_emp_login($1,$2)',[username,user_password]);
        res.send('Inserted record into EMP_LOGIN table...');
    } catch (err) {
        console.error(err.message);
    }
});
app.delete('/employee/:username', async(req,res) =>{
    try {
        const {username} = req.params;
        console.log(username);
        const query = await pool.query('delete from emp_login where username = $1 returning *',[username]);
        res.send(query);
    } catch (error) {
        console.log(error);
    }
});

app.post('/accounts',async(req,res)=>{
    try {
        
        const {customer_id,current_balance}=req.body;
        console.log(req.body);
        const query = await pool.query('call insert_into_accounts($1,$2)',[customer_id,current_balance]);
        res.send('Record Inserted');

    } catch (err) {
        console.error(err.message);
    }
});
app.delete('/accounts/:account_id',async(req,res)=>{
    try {
        const {account_id} = req.params;
        const query = await pool.query('delete from accounts where account_id=cast($1 as integer)',[account_id]);
        res.send(query.rows);
    } catch (error) {
        console.log(error);
    }
});
app.get('/accounts',async(req,res)=>{
    try {
        const query = await pool.query('select * from accounts');
        res.json(query.rows);
    } catch (error) {
        console.log(error);
    }
});
app.get('/accounts/:customer_id', async(req,res)=>{
    try {
        const {customer_id}= req.params;
        const query = await pool.query('select account_id,date_opened,current_balance from accounts where customer_id=$1',[customer_id]);
        console.log(query.rows);
        res.json(query.rows);
    } catch (error) {
        console.log(error);
    }
});
app.post('/branch',async(req,res)=>{
    try {
        console.log(req.body);
        const {name,house_no,city,zip_code} = req.body;
        const query = await pool.query('call insert_into_branch($1,$2,$3,$4)',[name,house_no,city,zip_code]);
        res.send('Inserted record into Branch table...');
    } catch (err) {
        console.error(err.message);
    }
});
app.delete('/branch/:branch_id',async(req,res)=>{
    try {
        const {branch_id} = req.params;
        const query = await pool.query('delete from branch where branch_id=cast($1 as integer)',[branch_id]);
        res.send(query.rows);
        console.log('Deleted from branch..');
    } catch (error) {
        console.log(error);
    }
});
app.post('/transaction',async(req,res)=>{
    try {
        // console.log(req.body);
        const {customer_id,account_id,branch_id,amount,action} = req.body;
        try {
            // console.log(customer_id)
            const query = await pool.query('call insert_into_transaction($1,$2,$3,$4)',[account_id,branch_id,amount,action]);
            await redisSet(customer_id, JSON.stringify(query.rows));
            res.send('Inserted record into Transaction table...');
        } catch (e) {
            res.json(e);
        }       
    } catch (error) {
        console.log(req.query);   
    }
});

app.get('/transaction/:customer_id',async(req,res)=>{
    try {
        const {customer_id} =req.params;
        const value = await redisGet(customer_id);
        if (value == null || value == "[]") {
            try {
                const query = await pool.query('select transaction.*,accounts.customer_id from transaction left join accounts on accounts.account_id=transaction.account_id where accounts.customer_id=cast($1 as integer)',[customer_id]);
                // console.log(query.rows);
                console.log(value)
                await redisSet(customer_id, JSON.stringify(query.rows));
                res.send(query.rows);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            res.send(value);
        }
    } catch (e) {
        res.json(e);
    }
});
//get

app.get('/customer',async(req,res)=>{
    try {
        const query = await pool.query('select customer_id,name,phone,email,house_no,city,zipcode,username from customer');
        res.json(query.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/employee',async(req,res)=>{
    try {
        const query = await pool.query('select * from EMP_LOGIN');
        res.json(query.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/branch',async(req,res)=>{
    try {
        const query = await pool.query('select * from branch');
        res.json(query.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//put
app.put('/customer/:username',async(req,res)=>{
    try {
        const {username} = req.params;
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/customer/:username',async(req,res)=>{
    try {
        const username = req.params.username;
        console.log(username);
        const query = await pool.query('select * from customer where username=$1',[username]);
        console.log(query.rows);
        res.json(query.rows[0]);

    } catch (error) {
        console.log(error);
    }
});




