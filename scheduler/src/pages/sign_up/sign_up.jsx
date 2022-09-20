import React, { Component } from 'react'
import "./sign-up.css"
import Layout from '../../components/layout/layout'
import Axios from 'axios';
import bcrypt from 'bcryptjs'
import Cookies from 'universal-cookie'
import ls from 'localstorage-slim';

const salt = bcrypt.genSaltSync(10, (err, salt) => {
  console.log("salt = ", salt)
})
const cookies = new Cookies()
ls.config.encrypt = true
console.log(ls.get("eml"));

export default class Sign_up extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      username:'',
      password:'',
      warning:false
    }
  }
  render() {
    console.log(this.state)
    localStorage.getItem("email") && console.log("login")
    !localStorage.getItem("email") && console.log("signin")
    return (
      <Layout>
        <form className = "sign-up" onSubmit = {() => {
        }}>
            <label htmlFor="username">
              Username: 
            </label>
            <input type="text" name="" id="" onChange = {(e)=> {
              this.setState({username:e.target.value})
            }}/>

            <label htmlFor="email">
              Email:
            </label>
            <input type="email" name="" id="" onChange = {(e)=> {
              this.setState({email:e.target.value})
            }} />

            <label htmlFor="password">
              Password:
            </label>
            <input type="password" name="" id="" onChange = {(e)=> {
              this.setState({password:e.target.value})
            }}/>
            <button className = "submit" type = "submit" onClick = {(e) => {
              e.preventDefault()
              const password = this.state.password
              const hashedPassword = bcrypt.hashSync(password, salt, (err, hash) => {
                console.log(hash +  " = hash")
              })
              //localStorage.setItem('pasd', JSON.stringify(hashedPassword))
              console.log(hashedPassword)
              console.log(salt)
              // !localStorage.getItem('pasd') && localStorage.setItem('pasd', JSON.stringify(hashedPassword))
              // cookies.set("password", hashedPassword, {path: "/"})
              // console.log("Cookie data = " + cookies.get("password"))

              Axios.post("http://localhost:3005/post_user", {
                email:this.state.email,
                username:this.state.username,
                password:hashedPassword,
                //salt:salt
              }).then(data => {
                data.data ? 
                this.setState({warning:true}):
                SetEmail(this.state.email)
              })
            }}>Sign up</button>
            {
                  this.state.warning ?
                  <div>
                      Email already taken
                  </div>
                  :
                  null
              }
          </form>
        </Layout>
    )
  }
}

function SetEmail(email){
  // localStorage.setItem('email', JSON.stringify(email))
  ls.set('eml', email)
  window.history.go(-2)
}