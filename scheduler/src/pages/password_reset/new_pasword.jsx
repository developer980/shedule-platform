import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'


const salt = bcrypt.genSaltSync(10, (err, res) => console.log(res))
export default function New_pasword() {

  const token = useParams().token

  axios.post("http://localhost:3005/verify_path", {
    token:token
  }).then(data => {
    console.log(data.data)
    data.data && setUser(1)
  })

  console.log(token)
  
  const [password, setPassword] = useState('')  
  const [user, setUser] = useState(0)
  
  console.log(password)
  return (
    user ? 
    <div className='reset-form'>Enter your new password
      <input type="text" onChange = {(e) => {
        setPassword(e.target.value)
      }} placeholder='Enter your password' />
      <button className='submit' onClick = {() => {
        const hashedPassword = bcrypt.hashSync(password, salt)
        console.log("salt = " + salt)
        console.log("hash " + hashedPassword)
        axios.post("http://localhost:3005/change_password", {
          token:token,
          password:hashedPassword
        })
      }}>
        Submit
      </button>
    </div>:
    <div>No</div>
  )
}

function mapDispatchToProps(dispatch){
  return{
    
  }
}