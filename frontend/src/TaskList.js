import Task from './Task.js';
import TaskModal from './TaskModal.js';

import React, { useState } from 'react';
import $ from 'jquery';

const TaskList = () => {
    const exampleTask = {
        "id": 0, 
        "title": 'Example', 
        "dueDate": new Date(),
        "description": 'This is an example task', 
        "isComplete": false, 
    };

    const [tasks, setTasks] = useState([ exampleTask ]);
    const lastTask = tasks.toSorted((a, b) => { return a.id - b.id }).pop()
    const [modalTask, setModalTask] = useState({
        // set id to next id in list incrementally
        "id": lastTask !== undefined && lastTask !== null ? lastTask.id + 1 : 0,
        "title": '',
        "dueDate": new Date(),
        "description": '',
        "isComplete": false
    });

    const addTask = (task) => {
        const taskExists = (element, index, array) => {
            return element.id === task.id;
        };

        if (tasks.some(taskExists)) // task is already in tasks
            editTask(task);
        else { // add the new task
            const newTasks = tasks.push(task);

            setTasks(newTasks);
        }
    };

    const editTask = (editedTask) => {
        const newTasks = tasks.map(task => {
            if (task.id === editedTask.id)
                return editedTask
            else {
                return task;
            }
        });

        setTasks(newTasks);
    };

    const completeTask = (taskId) => {
        const newTasks = tasks.map(task => {
            if (task.id === taskId)
                return { ...task, isComplete: !task.isComplete };
            
            return task;
        });

        setTasks(newTasks);
    };

    const deleteTask = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId);

        setTasks(newTasks);
    };
    
    const sort = (header) => {
        const allArrows = $('.sortHeader i');
        const headerArrow = header.find('i');

        // TODO: Implement sorting function
        
        // if this header already has an arrow, toggle it to flip it
        if (headerArrow.hasClass('bi-arrow-down') || headerArrow.hasClass('bi-arrow-up'))
            headerArrow.toggleClass('bi-arrow-down bi-arrow-up');
        else { // remove any other arrows and add a descending arrow to the header
            allArrows.removeClass();
            headerArrow.addClass('bi bi-arrow-down');
        }
    };

    return (
        <div className="card m-1">
            <h1 className="card-title p-3">Tasks</h1>
            <div className="card-body">
                <button type="button" className="btn btn-primary col-md-2" data-bs-toggle="modal" data-bs-target="#taskModal" data-bs-action="Create">Create New <i className="bi bi-plus"></i></button>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">{/* Actions... */}</th>
                            <th className="sortHeader" scope="col" onClick={() => sort($('th.sortHeader:contains("Title")'))}>Title<i className=""></i></th>
                            <th className="sortHeader" scope="col" onClick={() => sort($('th.sortHeader:contains("Description")'))}>Description<i className=""></i></th>
                            <th className="sortHeader" scope="col" onClick={() => sort($('th.sortHeader:contains("Status")'))}>Status<i className=""></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        { tasks.map(task => (
                            <Task 
                                key={'task' + task.id} 
                                id={task.id}
                                title={task.title} 
                                dueDate={task.dueDate} 
                                description={task.description} 
                                status={ task.isComplete ? 'Complete' : 'Incomplete' } 
                                onEditHandler={setModalTask}
                                onCompleteHandler={completeTask} 
                                onDeleteHandler={deleteTask} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <TaskModal {...modalTask} onSaveHandler={addTask} />
        </div>
    );
}

export default TaskList;