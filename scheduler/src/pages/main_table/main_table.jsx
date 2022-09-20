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
            <tr>
              <td><input placeholder='Activitate' onChange = {(e) => {
                this.setState({nume_activitate:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Data' onChange = {(e) => {
                this.setState({data:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Nr.gr' onChange = {(e) => {
                this.setState({nr_gr:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Nr.det' onChange = {(e) => {
                this.setState({nr_det:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Coordonator'onChange = {(e) => {
                this.setState({coord:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Regim' onChange = {(e) => {
                this.setState({reg:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Interval' onChange = {(e) => {
                this.setState({interval:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Parteneri' onChange = {(e) => {
                this.setState({parteneri:e.target.value})
              }} className = "criteria-input"type="text" /></td>
              <td><input placeholder='Observatii' onChange = {(e) => {
                this.setState({observatii:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Etaj' onChange = {(e) => {
                this.setState({etaj:e.target.value})
              }} className = "criteria-input" type="text" /></td>
              <td><input placeholder='Spatiu' onChange = {(e) => {
                this.setState({spatiu:e.target.value})
              }} className = "criteria-input" type="text" /></td>
            </tr>
            <tr>
              <td><b>Nume activitate</b></td>
              <td><b>Data</b></td>
              <td><b>Nr. gr</b></td>
              <td><b>Nr. det</b></td>
              <td><b>Coordonator</b></td>
              <td><b>Regim</b></td>
              <td><b>Interval orar</b></td>
              <td><b>Parteneri</b></td>
              <td><b>Observatii</b></td>
              <td><b>Etaj</b></td>
              <td><b>Spatiu</b></td>
            </tr>
          </thead>
          {
            this.state.data_list ? 
              this.state.data_list.filter(item => item.activity_name.toLowerCase().includes(this.state.nume_activitate.toLowerCase()) && item.day.toLowerCase().includes(this.state.data.toLowerCase())
               && item.day.toLowerCase().includes(this.state.data.toLowerCase()) && item.Nr_gr.toLowerCase().includes(this.state.nr_gr.toLowerCase()) && item.detained_nr.toLowerCase().includes(this.state.nr_det.toLowerCase())
               && item.coordinator.toLowerCase().includes(this.state.coord.toLowerCase()) && item.regime.toLowerCase().includes(this.state.reg.toLowerCase())
               && item.afiliates.toLowerCase().includes(this.state.parteneri.toLowerCase()) && item.notes.toLowerCase().includes(this.state.observatii.toLowerCase())
               && item.space.toLowerCase().includes(this.state.spatiu.toLowerCase()) && item.floor.toLowerCase().includes(this.state.etaj.toLowerCase())
               && item.time_interval.includes(this.state.interval)).map(item => 
                {return(
                  <tbody>
                    <tr>
                      <td>{item.activity_name}</td>
                      <td>{item.day}</td>
                      <td>{item.Nr_gr}</td>
                      <td>{item.detained_nr}</td>
                      <td>{item.coordinator}</td>
                      <td>{item.regime}</td>
                      <td>{item.time_interval}</td>
                      <td>{item.afiliates}</td>
                      <td>{item.notes}</td>
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
