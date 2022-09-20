import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav>
        <Link to = "/">
            Scheduler        
        </Link>
        
        {/* {
                localStorage.getItem("eml") ? 
                <div>
                    <Link to = "/" onClick={() => {localStorage.removeItem("eml")}}>
                        Log out
                    </Link>
                </div> 
                : null

            } */}
            <div>
            <Link to = "/activity">
                        Schedule an activity
                    </Link>
                    <Link to = "/table">
                        Activity list
                    </Link>
            </div>
    </nav>
  )
}
