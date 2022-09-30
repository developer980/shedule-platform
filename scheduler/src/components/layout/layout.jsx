import React from 'react'
import Header from '../header/header'

export default function Layout(props) {
  return (
    <div style = {{height:"120%", paddingBottom:"100px"}}>
        <Header/>
        {props.children }
    </div>
  )
}
