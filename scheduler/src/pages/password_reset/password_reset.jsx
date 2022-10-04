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
export default connect(null, mapDispatchToProps) (function Password_reset() {

    const [email, getEmail] = useState('')

    console.log(email)
    return (
        <div className='reset-form'>Please enter your email 
        <input type="text" onChange={(e) => {
            getEmail(e.target.value)
        }} placeholder='email@example.com' />
        <button onClick={() => {
            Axios.post("http://localhost:3005/password_reset", {
                email: email,
                token:token
            })
        }} className = "submit">Send email</button>
        </div>
    )
})