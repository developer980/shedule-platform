import React from 'react'
import "./home-page.css"
import Icon from "../../icons/schedule.svg"
import Table_icon from "../../icons/table-icon.svg"
import { Link } from 'react-router-dom'

export default function Home_page() {
  return (
    <div style = {{height:"100%"}}>
        <div className = "top-bar">
            Scheduler
            
            {
                localStorage.getItem("eml") ?               
                    <button onClick = {() => {
                        localStorage.removeItem("eml")
                        window.location.reload()
                    }}>
                        Log out
                    </button>
                    :       
                    <Link to = "/log_in">
                        Log in
                    </Link>

            }
        </div>

    {
        localStorage.getItem("eml") ? 
        <div className = "content">
                <Link to = "/activity" className = "option left">
                    <img className = "option-icon" src = {Icon}/>
                    Schedule an activity
                </Link>
                
                <div className='middle-line'>
                </div>
    
                <Link to = "/table" className = "option right">
                    <img className = "option-icon" src = {Table_icon}/>
                    View activities
                </Link>
            </div> 
        : 
        <div className = "placeholder">
            <Link to = "/log_in">Log in  </Link> 
            to view and schedule activities
         </div>
    }
    </div>
  )
}