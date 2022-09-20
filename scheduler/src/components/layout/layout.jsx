import React from 'react'
import Header from '../header/header'

export default function Layout(props) {
  return (
    <div style = {{height:"100%"}}>
        <Header/>
        {props.children }
    </div>
  )
}
