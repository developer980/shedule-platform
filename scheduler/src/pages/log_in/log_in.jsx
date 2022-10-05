import React from 'react'
import "../sign_up/sign-up.css"
import Layout from '../../components/layout/layout'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import ls from 'localstorage-slim';
// import {Cipher} from 'crypto';

export default class Log_in extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        email:'',
        password:'',
        warning:false,
        email_sent:false
      }
    }
    render() {
      console.log(this.state)
      localStorage.getItem("email") && console.log("login")
      !localStorage.getItem("email") && console.log("signin")
      return (
        <Layout>
          <form className = "sign-up" onSubmit = {() => {
            //localStorage.setItem('email', JSON.stringify(this.state.email))
           
          }}>
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
              <button className = "submit" onClick={(e) => {
                e.preventDefault()
                  console.log(bcrypt.hashSync(this.state.password))
                  Axios.post("http://localhost:3005/get_user", {
                      email:this.state.email,
                      password:this.state.password
                    }).then(data => {
                    console.log("ba")
                    console.log(data.data)

                      data.data ?
                        bcrypt.compare(this.state.password, data.data[0].password, (err, result) => {
                          err && console.log(err)
                          result ? SetEmail(this.state.email)
                          :
                          this.setState({warning:true})
                        })
                        :
                        this.setState({warning:true})
                  })
              }}>Log in</button>
              {
                  this.state.warning ?
                  <div>
                      Wrong email or password
                  </div>
                  :
                  null
              }
              <Link to = "/password_reset">
                Forgot your password?
              </Link>
            <div>
              Don't have an account? <Link to = "/sign_up">Sign up</Link>
            </div>
            </form>

          </Layout>
      )
    }
  }

  function SetEmail(email){
    // localStorage.setItem('email', JSON.stringify(email))
    ls.set('eml', email)
    window.history.back()
  }