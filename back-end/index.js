const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

app.use(cors())
app.use(express.json())
require('dotenv').config()
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const db = mysql.createConnection({
    user:'root',
    host:"127.0.0.1",
    password:"password",
    database:'schedule-schema-test'
})


app.post("/schedule", (req, res) => {
    const activityname = req.body.activityname
    const day = req.body.day
    const time_interval = req.body.time_interval
    const floor = req.body.floor
    const space = req.body.space

    db.query("INSERT INTO activities VALUES(?,?,?,?,?)", 
    [activityname, day, time_interval, space, floor], 
    (err, result) => {
        if(err) console.log(err)
        else {res.send("Succesfully sent")}
    })
})

app.post("/post_user", (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const token = req.body.token
    // let token = '';

    // for(let i = 0; i < 25; i++){
    //     token += characters[Math.floor(Math.random() * characters.length)]
    // }

    const transport = nodemailer.createTransport({
        service:'hotmail',
        auth: {
            user: 'confirm.test@outlook.com',
            pass: 'confirm_1440',
        }
    })
    console.log(token)

    
    // function Sign_up(email, username, password, token){
    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, result) => {
        err && console.log(err)
        console.log("users " + result)
        result.length ? res.send(null)
        :
        db.query("INSERT INTO pending_users values(?, ?, ?, ?)", [email, username, password, token],
        (err, result) => {
            err && console.log(err)
            result && res.send({token:token})

            const mailOptions = {
                from:"confirm.test@outlook.com",
                to:email,
                subject:'Email confirmation',
                html: `<div>
                    <b>Te rugam sa iti confirmi adresa de email</b>
                    <a href = "${`http://localhost:3000/=>${token}`}">Confirma</a>
                </div>`
            }
        
        
            transport.sendMail(mailOptions, (err, result) => {
                err ? console.log(err):
                res.send("email sent")
            })
        })
    })
    // }

    const salt = req.body.salt
})

app.post("/verify_user", (req, res) => {
    const token = req.body.token
    console.log(token)
    db.query(`SELECT * FROM pending_users WHERE token = "${token}"`, (err, result) => {
        err && console.log(err)
        
        result[0] && 
        db.query("INSERT INTO users values(?, ?, ?)", [result[0].email, result[0].username, result[0].pass],
                                (err, succes) => {
                                    err && console.log(err)
                                    // succes && res.send(result)
                                    if(succes){
                                        db.query(`DELETE FROM pending_users WHERE token = "${token}"`, err => {
                                            err ? console.log(err) :
                                            res.send(result)
                                        })
                                    }
                                })
    })
})

app.post("/confirm_user", (req,res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    db.query("INSERT INTO pending_users values(?, ?, ?, ?)", [email, username, password, token],
        (err, result) => {
            err && console.log(err)
            result && res.send({token:token})
        })
})

app.post('/get_user', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, result) => {
        err && console.log(err)
        result.length && res.send(result)
        !result.length && res.send(null)
    })
})

app.get("/get_activities", (req, res) =>{
    db.query("SELECT * FROM activities", (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get("/get_dates", (req, res) => {
    db.query("SELECT day FROM activities", (err, result) => {
        !err ? 
        res.send(result) 
        : 
        console.log(err)
    })
})

app.post('/get_spaces', (req, res) => {
    const date = req.body.date
    db.query(`SELECT space, time_interval FROM activities WHERE day = "${date}"`, (err, result) => {
        err && console.log(err)
        res.send(result)
    })
})

app.listen(3005, () => {
    console.log("Server started :)")
})