import React from 'react'
import Layout from '../../components/layout/layout'
import "./activity.css"
import Axios from "axios"
import Chalendar from '../../components/chalendar/chalendar'
import X from "../../icons/x.svg"
import { connect, Connect } from 'react-redux'

class activity extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activityname:"",
      day:"",
      nr_gr:"",
      det_nr:"",
      regime:"",
      coord:"",
      time_interval:"",
      afiliates:"",
      notes:"",
      floor:"",
      space:"",
      show_chalendar:false
    }
    window.activity_comp = this;
  }

  render() {
    const {final_date} = this.props
    console.log(Date())
    console.log(this.state)
    this.state.day != this.props.final_date && this.setState({day:this.props.final_date})
    this.state.space != this.props.space && this.setState({space:this.props.space})
    this.state.time_interval != this.props.hour && this.setState({time_interval:this.props.hour})

    console.log(parseFloat(this.props.hour + 1))

    return (
      <Layout>
        <form action="" className = "activity-form">
          <div>
            <label htmlFor="activity">Numele activitatii</label>
            <input onChange={(e) => {
              this.setState({activityname:e.target.value})
            }} type="text" placeholder='Introdu numele activitatii' name="" id="" />
          </div>
  
          <div>
            <label htmlFor="activity">Data</label>
            <input onClick={(e) => {
              if(!this.state.show_chalendar)
                this.setState({show_chalendar:true})
              else
                this.setState({show_chalendar:false})
          
            }} type="text" readOnly = {true} value = {
                this.props.final_date ? this.props.final_date 
                :
                ""
              } onChange = {(e) => {
                this.setState({day:e.target.value})
              }} placeholder = "Introdu data" name="" id="" />
          </div>
  
          <div>
            <label htmlFor="activity">Nr.gr</label>
            <input onChange={(e) => {
              this.setState({nr_gr:e.target.value})
            }} type="number" placeholder='Introdu numarul de grup' name="" id="" />
          </div>
  
          <div> 
            <label htmlFor="activity">Numar detinut</label>
            <input onChange={(e) => {
              this.setState({det_nr:e.target.value})
            }} type="number" placeholder='Introdu numarul detinutului' name="" id="" />
          </div>
  
          <div>
            <label htmlFor="activity">Regim</label>
            <input onChange={(e) => {
              this.setState({regime:e.target.value})
            }} type="text" placeholder='Introdu regimul' name="" id="" />
          </div>
  
          <div>
            <label htmlFor="activity">Coordonator</label>
            <input onChange={(e) => {
              this.setState({coord:e.target.value})
            }} type="text" placeholder='Introdu numele coordonatorului' name="" id="" />
          </div>
          <div>
            <label htmlFor="activity">Interval orar</label>
            <input value = {this.props.hour ? this.props.hour : ""}  onChange={(e) => {
              // this.setState({time_interval:e.target.value})
              console.log("changed")
            }} type="text" placeholder='Introdu intervalul orar' name="" id="" />
          </div>
          {/* <div>
            <label htmlFor="activity">Duration</label>
            <input onChange={(e) => {
              this.setState({duration:e.target.value})
            }} type="text" placeholder='Insert activity name' name="" id="" />
          </div> */}
          <div>
            <label htmlFor="activity">Parteneri</label>
            <input onChange={(e) => {
              this.setState({afiliates:e.target.value})
            }} type="text" placeholder='Introdu partenerii' name="" id="" />
          </div>
          <div>
            <label htmlFor="activity">Observatii</label>
            <input onChange={(e) => {
              this.setState({notes:e.target.value})
            }} type="text" placeholder='Introdu o observatie' name="" id="" />
          </div>
          <div>
            <label htmlFor="activity">Etaj</label>
            <input onChange={(e) => {
              this.setState({floor:e.target.value})
            }} type="text" placeholder='Introdu etajul' name="" id="" />
          </div>
          <div>
            <label htmlFor="activity">Spatiu de desfasurare</label>
            <input type = "text" placeholder = "Introdu spatiul" value = {
              this.state.space ? this.state.space : ""} onChange={(e) => {
              this.setState({space:e.target.value})
            }} name="" id="space" />
          </div>

          
          <div className = "submit-section">
            <button onClick = {(e) => {
                e.preventDefault()
              if(this.state.activityname && this.state.day && 
                this.state.nr_gr && this.state.det_nr && this.state.regime && 
                this.state.coord && this.state.time_interval &&
                this.state.afiliates && this.state.notes && this.state.floor
                && this.state.space){

                Axios.post("http://localhost:3005/schedule", {
                  activityname:this.state.activityname,
                  day:this.state.day,
                  nr_gr:this.state.nr_gr,
                  nr_det:this.state.det_nr,
                  reg:this.state.regime,
                  coord:this.state.coord,
                  time_interval:this.state.time_interval,
                  duration:this.state.duration,
                  afiliates:this.state.afiliates,
                  notes:this.state.notes,
                  floor:this.state.floor,
                  space:this.state.space,
                })
                window.location.reload()
              }
              else {document.getElementById("warning").style.display = "block"}
            }}>
              Programeaza
            </button>
            <div id = "warning" style = {{display:"none"}}>Te rugam sa completezi toate campurile</div>
          </div>
        </form>

        {
          this.state.show_chalendar ? 
          <div className = "date-select">
            <img src={X} className = "close-button" onClick = {() => {
              this.setState({show_chalendar:false})
            }}/>
            <Chalendar/>
          </div>
          :
           null  
          }
      </Layout>
    )
  }
}

function mapStateToProps(state){
  return{
    final_date:state.date_reducer.date,
    space:state.schedule_reducer.space,
    hour:state.schedule_reducer.hour
  }
}

// export function Clear(){
//   document.getElementById("space").
// }

export default connect(mapStateToProps, null) (activity)