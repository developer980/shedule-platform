import React from 'react'
import "./schedule.css"
import { connect } from 'react-redux'
import { scheduleFor } from '../../redux/schedule-reducer/scheduleFor'
import Axios from 'axios'
import spaces from "../../spaces.json"
//import { timingSafeEqual } from 'crypto'
//import { threadId } from 'worker_threads'

class Schedule extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hour:'',
            space:'',
            hour_selected:false,
            desired_space:''
        }
    }
  render() {
    console.log(this.props.spaces)
    console.log(this.state)

    //console.log("spatii" + spatii.length)
     
    const start_hour = parseFloat(this.state.hour)
    const finish_hour = start_hour + 1

    console.log(start_hour + ":00" + " - " + finish_hour + ":00")

    const myInterval = start_hour + ":00" + " - " + finish_hour + ":00"



    if(this.state.hour)
        if(!this.state.hour_selected)
            this.setState({hour_selected:true})

    if(!this.state.hour)
        if(this.state.hour_selected)
            this.setState({hour_selected:false})

    return (
      <div id = "schedule-window" className = "schedule-window" >
        <div className = "hours">
           <div className='title'>
                Programeaza pentru {this.props.date}:
            </div> 
            <div>
                Ora (introdu un numar intre 8 si 16)<input className='interval' onChange = {(e) => {
                    this.setState({hour:e.target.value})
                }} id = "hour-interval" type="number" />
            </div>
            <button className='clear' onClick = {() => {
                
                this.props.scheduleFor({
                    space:"",
                    hour:""
                })
                this.setState({hour:''})
                document.getElementById("hour-interval").value = ""
            }}>
                Clear
            </button>
            <input className='space-search' type="text" onChange={(e) => this.setState({desired_space:e.target.value})} placeholder='Search for your desired space' />
        </div>
        <div className = "spaces">
            {
                this.state.hour_selected ? 
                spaces.map((item, index) =>{
                    if(spaces[index].name.toLowerCase().match(this.state.desired_space.toLowerCase())){
                        let ocupied = false
                        this.props.spaces.map((item) => {       
                            console.log(item.time_interval)
                            if(item.space == spaces[index].name && item.time_interval == myInterval){
                                console.log(item.space)
                                ocupied = true
                                return
                            }
                        })
                        return(
                            ocupied ? 
                            <div id={"Space" + index} className = "ocupied">
                                {spaces[index].name}
                            </div>
                            :
                            <div id={"Space" + index} className = "unocupied" onClick = {() => {
                                for(let i = 0; i<spaces.filter(item => item.name.includes(this.state.desired_space)).length; i++){
                                    if(i == index)
                                        document.getElementById("Space" + i).style.backgroundColor = "rgb(148, 148, 148)"

                                    else
                                        document.getElementById("Space" + i).style.background = "none"
                                }
                                this.props.scheduleFor({
                                    space:spaces[index].spaces,
                                    hour:this.state.hour
                                })
                            }}>
                                {spaces[index].name}
                            </div>
                        )
                    }
                }
                )
                :
                spaces.map((item, index) =>{
                    return(
                        <div className = "ocupied">
                            {spaces[index].name}
                        </div>
                    )
                })
            }
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
    return{
        scheduleFor: (payload) => dispatch(scheduleFor(payload))
    }
}

function mapStateToProps(state){
    return{
        date:state.date_reducer.date,
        spaces:state.space_reducer.spaces
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Schedule)