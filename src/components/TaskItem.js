import React, { Component } from 'react'
import { Badge } from 'reactstrap';
export default class TaskItem extends Component {
    render() {
        var {task, index} = this.props
        return (
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className ="text-center">
                    <Badge color ={task.status ? "danger":  "primary"}>{task.status ? "Activated": "Hidden"}</Badge>
                </td>
                <td className = "text-center">
                    <button type = "button" className = "btn btn-warning "> <span className = "fa fa-pencil mr-2"></span>Edit</button>
                    &nbsp;
                    <button type = "button" className = "btn btn-danger "> <span className = "fa fa-trash mr-2"></span>Delete</button>
                </td>
            </tr>
        )
    }
}
