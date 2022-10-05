import React, { Component } from 'react'
import "./sign-up.css"
import Layout from '../../components/layout/layout'
import Axios from 'axios';
import bcrypt from 'bcryptjs'
import Cookies from 'universal-cookie'
import ls from 'localstorage-slim';
import setPath from '../../redux/path/action';
import { connect } from 'react-redux';

const salt = bcrypt.genSaltSync(10, (err, salt) => {
  console.log("salt = ", salt)
})
const cookies = new Cookies()
ls.config.encrypt = true
console.log(ls.get("eml"));


const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let token = ''
function Create_token(){
  for(let i = 0; i < 25; i++){
    // this.setState({token: this.state.token += characters[Math.floor(Math.random() * characters.length)]})
    token += characters[Math.floor(Math.random() * characters.length)]
  }
}

class Sign_up extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      username:'',
      password:'',
      warning:false,
      token:'',
      sent:false
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

              Create_token()
              this.props.setPath(token)
              console.log("token: " + token)
              console.log(hashedPassword)
              console.log(salt)

              Axios.post("http://localhost:3005/post_user", {
                email:this.state.email,
                username:this.state.username,
                password:hashedPassword,
                token:token
                //salt:salt
              })
              .then(data => {
                console.log("data: " + data.data)
                !data.data ? this.setState({
                  warning:true}) : this.setState({sent:true})
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
              {
                this.state.sent ? 
                <div className = "send-confirmation">
                  An email was sent to your address to confirm your account
                </div> :
                null
              }
              
          </form>
        </Layout>
    )
  }
}

function SetEmail(email, token){
  ls.set('eml', email)
  ls.set('tkn', token)
}

function mapDispatchToProps(dispatch){
  return{
    setPath: payload => dispatch(setPath(payload))
  }
}

export default connect(null, mapDispatchToProps) (Sign_up)