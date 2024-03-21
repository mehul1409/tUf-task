const con = require('./connection.js');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

// Establish the database connection
con.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Connected to database successfully!');
    }
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/register.html');
});

app.post('/',(req,res)=>{
    const {username , pcl , stdin , code } = req.body;

    const insertQuery = "INSERT INTO records(username,pcl,stdin,code) VALUES(?,?,?,?)";
    con.query(insertQuery,[username,pcl,stdin,code],function(error,result){
        if(error) {
            console.log(error);
            res.status(500).send('Error occurred while adding record to database');
        } else {
            res.redirect('/records');
        }
    });
});

app.get('/records',function(req,res){
    const fetchQuery = "SELECT * FROM records";
    con.query(fetchQuery,function(error,result){
        if(error) {
            console.log(error);
            res.status(500).send('Error occurred while fetching records from database');
        } else {
            res.render(__dirname+'/student',{records:result});
        }
    });
});

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});
