import React, { useState } from 'react';
import Header from "./Header.js";
import $ from "jquery";
import "./App.css";
import TaskList from "./TaskList.js";

function App() {
    const exampleTask = {
        "id": 0, 
        "title": 'Example', 
        "dueDate": new Date(),
        "description": 'This is an example task', 
        "isComplete": false, 
    }

    const [tasks, setTasks] = useState([ exampleTask ]);

    const addTask = (task) => {
        const newTasks = tasks.push(task);

        setTasks(newTasks);
    };

    const editTask = (editedTask) => {
        const newTasks = tasks.map(task => {
            if (task.id === editedTask.id)
                return editedTask
            else {
                addTask(editedTask);
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
		<div className="text-bg-light">
			<Header />
			<TaskList 
                tasks={tasks} 
                onHeaderToggle={sort} 
                onCreateHandler={addTask}
                onEditHandler={editTask}
                onCompleteHandler={completeTask} 
                onDeleteHandler={deleteTask} 
            />
		</div>
	);
}

export default App;