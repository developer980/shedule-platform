import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main_table from './pages/main_table/main_table';
import Home_page from './pages/home_page/home_page';
import Sign_up from './pages/sign_up/sign_up';
import Activity from './pages/activity-form/activity';
import Log_in from './pages/log_in/log_in';

function App() {
  return (
    <Switch>
      <Route exact path = '/' component={Home_page}/>
      <Route path = '/table' component={Main_table}/>
      <Route path = '/sign_up' component={Sign_up}/>
      <Route path = '/log_in' component={Log_in}/>
      <Route path = '/activity' component={Activity}/>
    </Switch>
  );
}

export default App;
