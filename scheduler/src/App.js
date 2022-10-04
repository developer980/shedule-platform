import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main_table from './pages/main_table/main_table';
import Home_page from './pages/home_page/home_page';
import Sign_up from './pages/sign_up/sign_up';
import Activity from './pages/activity-form/activity';
import Log_in from './pages/log_in/log_in';
import { connect } from 'react-redux';
import Password_reset from './pages/password_reset/password_reset';
import Confirmation from './pages/confirmation';
import React from 'react';
import New_pasword from './pages/password_reset/new_pasword';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nextPath:''
    }
  }
  render(){
    if(this.props.nextPath && this.state.nextPath != this.props.nextPath){
      this.setState({nextPath:this.props.nextPath})
    }
    console.log('nextPath = ' + this.state.nextPath)
    //console.log("generated path = " + nextPath)
    return (
        <Switch>
          <Route exact path = '/' component={Home_page}/>
          <Route path = '/table' component={Main_table}/>
          <Route path = '/sign_up' component={Sign_up}/>
          <Route path = '/log_in' component={Log_in}/>
          <Route path = '/activity' component={Activity}/>
          <Route path = {'/=>:token'}component={Confirmation}/>
          <Route path = {'/password_reset'}component={Password_reset}/>
          <Route path = {'/reset=>:token'} component = {New_pasword}/>
        </Switch>
    );
  }
}

function mapStateToProps(state){
  return{
    nextPath:state.path_reducer.path
  }
}

export default connect(mapStateToProps, null)(App);
