import React, {useState} from 'react'
import "./password-reset.css"
import Axios from 'axios';
import { connect } from 'react-redux';
import setPath from '../../redux/path/action';

function mapDispatchToProps(dispatch){
    return{
      setPath: payload => dispatch(setPath(payload))
    }
  }

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let token = '';
for (let i = 0; i < 25; i++){
    token += characters[Math.floor(Math.random() * characters.length)]
}
export default function Password_reset() {

    const [email, getEmail] = useState('')
    const [sent, emailSent] = useState(0)

    console.log(email)
    return (
        <div className='reset-form'>Please enter your email 
        <input type="text" onChange={(e) => {
            getEmail(e.target.value)
        }} placeholder='email@example.com' />
        <button onClick={() => {
            emailSent(1)
            Axios.post("http://localhost:3005/password_reset", {
                email: email,
                token:token
            })
        }} className = "submit">Send email</button>
        
        { sent ? <div className = "send-confirmation">
                        An email with the password reset link has been send to your adress, please check your email
                    </div> : null}
        </div>
    )
}