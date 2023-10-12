import React, { useState } from 'react';
import TaskModal from './TaskModal';

const Task = ({ taskProp, status, onSaveHandler, onCompleteHandler, onDeleteHandler }) => {
    const [task] = useState({ ...taskProp, status });

    return(
        <tr>
            <td>
            <button type="button" className="btn btn-primary btn-sm mr-1" data-bs-toggle="modal" data-bs-target="#editTaskModal">Edit</button>
            <button type="button" className="btn btn-success btn-sm mr-1" onClick={() => onCompleteHandler(task.id)}>Mark as { task.status === 'Complete' ? 'Incomplete' : 'Complete' }</button>
            <button type="button" className="btn btn-danger btn-sm mr-1" onClick={() => onDeleteHandler(task.id)}>Delete</button>
            </td>
            <td>
                {task.title}
                <br />
                <small className="text-body-secondary">Due: {task.dueDate.toLocaleString()}</small>
            </td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>
                <TaskModal modalId={'editTaskModal'} action={'Edit'} task={task} onSaveHandler={onSaveHandler} />
            </td>
        </tr>
    );
}

export default Task;