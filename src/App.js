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
      isdisplayedForm: false,
      taskEditting: '',
      filter: {
        name: '',
        status: -1
      }
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

  toggleForm = () => {
    if(this.state.isdisplayedForm && this.state.taskEditting !== '') {
      this.setState({
        isdisplayedForm: true,
        taskEditting:''
      })
    } else {
      this.setState({
        isdisplayedForm: !this.state.isdisplayedForm,
        taskEditting: ''
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isdisplayedForm: false
    })
  }

  onShowForm = () => {
    this.setState({
      isdisplayedForm: true
    })
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if (data.id !== '') {
      if(data.status === "true"){
        data.status = true
      }
      else {
        data.status = false
      }
      var index = this.findIndex(data.id)
      tasks[index] = data
    }
    else {
      data.id = uuid();
      tasks.push(data)
    }
    this.setState({
      tasks: tasks,
      taskEditting: ''
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  onUpdateStatus = (id)=>{
    var {tasks} = this.state
    var index = this.findIndex(id)
    if (index !== -1) {
      tasks[index].status = !tasks[index].status
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    
  }
  findIndex= (id)=> {
    var {tasks} = this.state
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id) {
        result = index;
      }
    })
    return result
  }
  onDelete = (id)=> {
    var {tasks} = this.state
    var index = this.findIndex(id)
    if (index !== -1) {
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.onCloseForm()
  }
  onEdit = (id)=> {
    var {tasks} = this.state
    var index = this.findIndex(id)
    var taskEditting = tasks[index];
    this.setState({
      taskEditting: taskEditting
    })
    this.onShowForm();
  }
  onFilter = (filterName, filterStatus) => {
    console.log(filterName, filterStatus)
    filterStatus = parseInt(filterStatus, 10)
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus
      }
    })
  }
  render() {
    var {tasks, isdisplayedForm, taskEditting, filter} = this.state
    
    var elmTaskForm = isdisplayedForm ? <Addform taskEditting = {taskEditting} onSubmit = {this.onSubmit} onCloseForm = {this.onCloseForm}/>: '';
    return (    
      <div className="container">
        <div className = "text-center text-capitalize"> <h1>to do list</h1></div>
        <div className ="row">
          <div className = {isdisplayedForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4": ''}>
            {elmTaskForm}
          </div>
          <div className = {isdisplayedForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8": "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type ="button" className = "btn btn-primary text-capitalize mr-2" onClick = {this.toggleForm}><span className = "fa fa-plus mr-2"> </span>add work</button>
            <Tasklist tasks = {tasks} onUpdateStatus = {this.onUpdateStatus} onDelete = {this.onDelete} onEdit = {this.onEdit} onFilter = {this.onFilter}/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
