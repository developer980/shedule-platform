import React from 'react'
import "./chalendar.css"
import X from "../../icons/x.svg"
import { connect, Connect } from 'react-redux'
import setDate from '../../redux/date/date-action'
import Axios from 'axios'
import Schedule from '../schedule/schedule'
import get_spaces from '../../redux/spaces/get_spaces'

class Chalendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            day:0,
            month:0,
            year:0,
            date:"", 
            ocupied_days:[],
            display:false
        }
        // Axios.get("http://localhost:3005/get_dates").then((result) => {
        //     this.setState({ocupied_days:result.data})
        // })
    }
  render() {

    const date = new Date(); 
    console.log(new Date(date.getFullYear(), date.getMonth() + 2).getMonth())
    const first_day_of_the_month  = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay()
    let dayindex = first_day_of_the_month;
    const current_month_days = new Date(date.getFullYear(),
        date.getMonth() + 2, 0).getDate()
    const last_month_days = new Date(date.getFullYear(),
        date.getMonth(), 0).getDate();  
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const current_month = new Date(date.getFullYear(), date.getMonth() + 1).getMonth()
    const current_year = new Date(date.getFullYear(),0).getFullYear()
    
    return (
        <div>
                <div id = "chalendar" className = "chalendar">
                    <div className='header'>
                            {months[current_month]}
                    </div>
                    <div className='header2'>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wen</div>
                        <div>Th</div>
                        <div>Fr</div>
                        <div>Sat</div>
                        <div>Sun</div>
                    </div>
                    <div className='body'>
                        {
                            Array.from(Array(first_day_of_the_month - 1))
                            .map((currentday, index) => {
                                dayindex -= 1
                                return(
                                    <div className = "outside-month">
                                        {last_month_days - dayindex + 1}
                                    </div>
                                )
                            })
                        }
                        {
                            Array.from(Array(current_month_days + 1))
                            .map((month, index) => {
                                if(index){
                                    const item_date = `${index}/${current_month}/${current_year}`
                                    let ocupied = false
                                    this.state.ocupied_days.map(item => {
                                        if(item.day == item_date){
                                            ocupied = true
                                            return
                                        }
                                    })
                                    // console.log(item_date)
                                    return(
                                        !ocupied ?

                                        <div id = {index} className = "inside-month" onClick = {(e) => {                              
                                            Axios.post("http://localhost:3005/get_spaces", {
                                                date:`${index}/${current_month}/${current_year}`
                                            }).then((data) => {
                                               // console.log(data.data)
                                                this.props.send_spaces(data.data)
                                                // this.setState({list:data.data})
                                            })
                                            Array.from(Array(current_month_days + 1)).map((item, pos) => {
                                                
                                                if(pos != index && pos != 0 && pos != item_date)
                                                document.getElementById(pos).style.backgroundColor = "rgb(228, 228, 228)"
                                                else if (pos == index)
                                                document.getElementById(pos).style.backgroundColor = "rgb(148, 148, 148)"
                                                
                                            })
                                            this.setState({date:`${index}/${current_month}/${current_year}`
                                            })
                                            this.props.setDate(`${index}/${current_month}/${current_year}`)
                                            document.getElementById("schedule-window").style.display = "block"
                                            this.setState({display:true})
                                        }} 
                                        >
                                            {index}
                                        </div>

                                        :
                
                                        <div id = {index} className = "outside-month">
                                            {index}
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <Schedule/>
            </div>
    )
  }
}

function mapDispatchToProps(dispatch){
    return{
        setDate : (payload) => dispatch(setDate(payload)),
        send_spaces : (payload) => dispatch(get_spaces(payload))
    }
}

export default connect(null, mapDispatchToProps)(Chalendar)