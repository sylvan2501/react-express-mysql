const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
const database = mysql.createConnection({
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'db_example'
})
database.connect((error)=>{
    if(error) throw error
    else (console.log('Successfully connected !!'))
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/add_info',(request, response)=>{
    const name = request.body.name
    const owner = request.body.owner
    const email = request.body.email
    const species = request.body.species
    const sex = request.body.sex
    const birth = request.body.birth

    database.query('INSERT INTO Pets (name, owner, email, species, sex, birth) VALUES(?,?,?,?,?,?)',[name, owner, email, species, sex, birth],(error, data)=>{
        if (error) throw error
        else{
            response.send('Value inserted successfully !')
        }
    })
})

app.listen(process.env.PORT_NUM, () =>{
    console.log('Server is running...')
})

