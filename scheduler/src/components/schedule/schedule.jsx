import React from 'react'
import "./schedule.css"
import { connect } from 'react-redux'
import { scheduleFor } from '../../redux/schedule-reducer/scheduleFor'
import Axios from 'axios'
//import { timingSafeEqual } from 'crypto'
//import { threadId } from 'worker_threads'

class Schedule extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hour:'',
            space:'',
            hour_selected:false
        }
    }
  render() {
    console.log(this.props.spaces)
    console.log(this.state)
     
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
                (introdu un numar intre 8 si 16)<input onChange = {(e) => {
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
        </div>
        <div className = "spaces">
            {
                this.state.hour_selected ? 
                Array.from(Array(20)).map((item, index) =>{
                    let ocupied = false
                    this.props.spaces.map((item) => {       
                        console.log(item.time_interval)
                        if(item.space == `Space ${index}` && item.time_interval == myInterval){
                            console.log(item.space)
                            ocupied = true
                            return
                        }
                    })
                    return(
                        ocupied ? 
                        <div id={"Space" + index} className = "ocupied">
                            Space{index}
                        </div>
                        :
                        <div id={"Space" + index} className = "unocupied" onClick = {() => {
                            for(let i = 0; i<20; i++){
                                if(i == index)
                                    document.getElementById("Space" + i).style.backgroundColor = "rgb(148, 148, 148)"

                                else
                                    document.getElementById("Space" + i).style.background = "none"
                            }
                            this.props.scheduleFor({
                                space:"Space " + index,
                                hour:this.state.hour
                            })
                        }}>
                            Space{index}
                        </div>
                    )
                })
                :
                Array.from(Array(20)).map((item, index) =>{
                    return(
                        <div className = "ocupied">
                            Space{index}
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