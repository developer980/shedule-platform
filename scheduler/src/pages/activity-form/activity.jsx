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
      coord:"",
      time_interval:"",
      floor:"",
      space:"",
      show_chalendar:false
    }
  }

  render() {
    const {final_date} = this.props
    console.log(Date())
    console.log(this.state)
    this.state.day != this.props.final_date && this.setState({day:this.props.final_date})
    this.state.space != this.props.space && this.setState({space:this.props.space})
    this.state.time_interval != this.props.hour && this.setState({time_interval:this.props.hour})
    this.state.floor != this.props.floor && this.setState({floor:this.props.floor})

    console.log(parseFloat(this.props.hour + 1))

    return (
      <Layout>
        <form action="" className = "activity-form">
          <div>
            <label htmlFor="activity">Activity name</label>
            <input onChange={(e) => {
              this.setState({activityname:e.target.value})
            }} type="text" placeholder='Insert the activity name' name="" id="" />
          </div>
  
          <div>
            <label htmlFor="activity">Date</label>
            <input onClick={(e) => {
              if(!this.state.show_chalendar){
                this.setState({show_chalendar:true})
              }
              else
                this.setState({show_chalendar:false})
          
            }} type="text" readOnly = {true} value = {
                this.props.final_date ? this.props.final_date 
                :
                ""
              } onChange = {(e) => {
                this.setState({day:e.target.value})
              }} placeholder = "Insert the date" name="" id="" />
          </div>
  
          
          <div>
            <label htmlFor="activity">Time</label>
            <input value = {this.props.hour ? this.props.hour : ""}  onChange={(e) => {
              // this.setState({time_interval:e.target.value})
              console.log("Time interval set to " + this.props.time_interval)
            }} type="text" placeholder='Insert the time' name="" id="" />
          </div>
          {/* <div>
            <label htmlFor="activity">Duration</label>
            <input onChange={(e) => {
              this.setState({duration:e.target.value})
            }} type="text" placeholder='Insert activity name' name="" id="" />
          </div> */}
          <div>
            <label htmlFor="activity">Floor</label>
            <input value = {this.props.floor ? this.props.floor : ""} onChange={(e) => {
                console.log("Floor set to " + this.props.floor)
            }} type="text" placeholder='Insert the floor' name="" id="" />
          </div>
          <div>
            <label htmlFor="activity">Space</label>
            <input  type = "text" placeholder = "Insert the space" value = {
              this.props.space ? this.props.space : ""} onChange={(e) => {
                console.log("Space set to " + this.props.space)
            }} name="" id="space" />
          </div>

          
          <div className = "submit-section">
            <button onClick = {(e) => {
                e.preventDefault()
              if(this.state.activityname && this.state.day && 
                this.state.time_interval &&this.state.floor
                && this.state.space){

                Axios.post("http://localhost:3005/schedule", {
                  activityname:this.state.activityname,
                  day:this.state.day,
                  coord:this.state.coord,
                  time_interval:this.state.time_interval,
                  notes:this.state.notes,
                  floor:this.state.floor,
                  space:this.state.space,
                })
                window.location.reload()
              }
              else {document.getElementById("warning").style.display = "block"}
            }}>
              Schedule
            </button>
            <div id = "warning" style = {{display:"none"}}>Please complete all the fields</div>
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
    hour:state.schedule_reducer.hour,
    floor:state.schedule_reducer.floor
  }
}

// export function Clear(){
//   document.getElementById("space").
// }

export default connect(mapStateToProps, null) (activity)