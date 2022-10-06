import React from 'react'
import Header from '../header/header'
import "./layout.css"

export default function Layout(props) {
  return (
    <div className = "layout" style = {{height:"100%"}}>
        <Header/>
        {props.children }
    </div>
  )
}
