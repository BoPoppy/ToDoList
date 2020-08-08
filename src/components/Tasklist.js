import React, { Component } from 'react'
import TaskItem from './TaskItem'

export default class Tasklist extends Component {
    render() {
        var {tasks} = this.props
        var elmtask = tasks.map((task, index)=> {
            return <TaskItem key ={task.id} index = {index} task = {task}/>
        })
        return (
            <div>
                <table className = "table table-bodered table-hover mt-15">
                    <thead>
                        <tr>
                            <th className = "text-center"> STT</th>
                            <th className = "text-center"> Name</th>
                            <th className = "text-center"> Status</th>
                            <th className = "text-center"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" className = "form-control" name = "filterName"/>
                            </td>
                            <td>
                                <select className = "form-control" name ="filterStatus"> 
                                <option value = {-1}>All</option>
                                <option value = {0}>Hidden</option>
                                <option value = {1}>Activated</option></select>
                            </td>
                            <td></td>
                        </tr>
                        {elmtask}
                    </tbody>
                </table>
            </div>
        )
    }
}
