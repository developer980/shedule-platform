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
    const nr_gr = req.body.nr_gr
    const nr_det = req.body.nr_det
    const reg = req.body.reg
    const coord = req.body.coord
    const time_interval = req.body.time_interval
    const duration = req.body.duration
    const afiliates = req.body.afiliates
    const notes = req.body.notes
    const floor = req.body.floor
    const space = req.body.space

    db.query("INSERT INTO activities VALUES(?,?,?,?,?,?,?,?,?,?,?,?)", 
    [activityname, day, nr_gr, nr_det, reg, coord, time_interval, duration, afiliates, notes, floor, space], 
    (err, result) => {
        if(err) console.log(err)
        else {res.send("Succesfully sent")}
    })
})

app.post("/post_user", (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    let token = '';

    for(let i = 0; i < 25; i++){
        token += characters[Math.floor(Math.random() * characters.length)]
    }

    const transport = nodemailer.createTransport({
        service:'hotmail',
        auth: {
            user: 'confirm.anp2002@outlook.com',
            pass: 'confirmAnp2002',
        }
    })

    const mailOptions = {
        from:"confirm.anp2002@outlook.com",
        to:"tudordin2002@gmail.com",
        subject:'Email confirmation',
        html: `<div>
            <b>Te rugam sa iti confirmi adresa de email</b>
            <button>Confirma</button>
        </div>`
    }

    transport.sendMail(mailOptions, (err, result) => {
        err ? console.log(err):
        console.log("Email succesfully sent")
    })

    const salt = req.body.salt
    
    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, result) => {
        err && console.log(err)
        result.length ? res.send("This email is already taken")
        :
        db.query("INSERT INTO users values(?, ?, ?, ?)", [email, username, password, token],
        (err, result) => {
            err && console.log(err)
            result && res.send(null)
        })
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