import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {v1 as uuid} from "uuid";
import Addform from './components/Addform';
import Tasklist from './components/Tasklist'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isdisplayedForm: false
    }
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')){
      var tasks =  JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      })
    }
  }
  generateData = () =>{
    var tasks = [
      {
        id: uuid(),
        name: "Work",
        status: true
      },
      {
        id: uuid(),
        name: "Swim",
        status: false
      },
      {
        id: uuid(),
        name: "Play",
        status: true
      }
    ]
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  
  render() {
    var {tasks, isdisplayedForm} = this.state
    return (    
      <div className="container">
        <div className = "text-center text-capitalize"> <h1>to do list</h1></div>
        <div className ="row">
          <div className = "col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <Addform/>
          </div>
          <div className = "col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <button type ="button" className = "btn btn-primary text-capitalize" onClick = {this.generateData}><span className = "fa fa-plus mr-2"> </span>generate data</button>
            <Tasklist tasks = {tasks}/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
