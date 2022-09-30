import React from 'react'
import Axios from 'axios'
import "./main-table.css"
import Layout from '../../components/layout/layout'


export default class main_table extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data_list:[],
      list:[],
      nume_activitate:'',
      data:'',
      nr_gr:'',
      nr_det:'',
      coord:'',
      reg:'',
      interval:'',
      parteneri:'',
      observatii:'',
      etaj:'',
      spatiu:'',
    }
    Axios.get("http://localhost:3005/get_activities").then((data) => {
      console.log(data.data)
      this.setState({data_list:data.data})
      //this.setState({list:data.data})
    })
  }

  render() {
    console.log(this.state.data_list)
    console.log(this.state.list)
    return (
      <Layout>
        <table className = "list">
          <thead>
            <tr className='head'>
              <td><input placeholder='Activity' onChange = {(e) => {
                this.setState({nume_activitate:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Date' onChange = {(e) => {
                this.setState({data:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Time' onChange = {(e) => {
                this.setState({interval:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Floor' onChange = {(e) => {
                this.setState({etaj:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Space' onChange = {(e) => {
                this.setState({spatiu:e.target.value})
              }} className = "criteria-input" type="text" /></td>
            </tr>
            <tr>
              <td><b>Activity name</b></td>
              <td><b>Date</b></td>
              <td><b>Time</b></td>
              <td><b>Floor</b></td>
              <td><b>Space</b></td>
            </tr>
          </thead>
          {
            this.state.data_list ? 
              this.state.data_list.filter(item => item.activity_name.toLowerCase().includes(this.state.nume_activitate.toLowerCase()) && item.day.toLowerCase().includes(this.state.data.toLowerCase())
               && item.space.toLowerCase().includes(this.state.spatiu.toLowerCase()) && item.floor.toLowerCase().includes(this.state.etaj.toLowerCase())
               && item.time_interval.includes(this.state.interval)).map(item => 
                {return(
                  <tbody>
                    <tr>
                      <td>{item.activity_name}</td>
                      <td>{item.day}</td>
                      <td>{item.time_interval}</td>
                      <td>{item.floor}</td>
                      <td>{item.space}</td>
                    </tr>
                  </tbody>
                )
            })
             : null
          }
        </table>
      </Layout>
    )
  }
}
