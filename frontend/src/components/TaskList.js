import Task from "./Task.js";
import CreateTaskModal from "./CreateTaskModal.js";

import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";

const TaskList = () => {
	// #region constants
	const SERVER_URL = "http://localhost:5000";
	const VERSION = "v1";
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		$.get(`${SERVER_URL}/api/${VERSION}/tasks`)
			.then(function (tasks) {
				if (tasks && typeof tasks === typeof [] && tasks.length > 0) {
					setTasks(
						tasks.map((task) => {
							return { ...task, dueDate: new Date(task.dueDate) };
						})
					);
				} else {
					console.info("No tasks returned from server");
				}
			})
			.catch(function (error) {
				console.error(
					`An error occured fetching tasks: ${error.message}`
				);
				alert(`An error occured fetching tasks: ${error.message}`);
			});
	}, []);
	// #endregion

	// #region functions
	const addTask = (newTask) => {
		// add the new task
		axios
			.post(`${SERVER_URL}/api/${VERSION}/tasks`, {
				...newTask,
				id: tasks.length,
			})
			.then(function (createdTask) {
				if (createdTask.data) {
					createdTask = createdTask.data;
					setTasks([
						...tasks,
						{
							...createdTask,
							dueDate: new Date(createdTask.dueDate),
						},
					]);
				} else {
					console.info("Server returned null when creating task");
					alert("Server returned null when creating task.");
				}
			})
			.catch(function (error) {
				console.error(`Failed creating task: ${error.message}`);
				alert(`Failed creating task: ${error.message}`);
			});
	};

	const editTask = (editedTask) => {
		axios
			.patch(
				`${SERVER_URL}/api/${VERSION}/tasks/${editedTask.id}`,
				editedTask
			)
			.then(function (editedTask) {
				if (editedTask.data) {
					editedTask = editedTask.data;
					const newTasks = tasks.map((task) => {
						if (task.id === editedTask.id)
							return {
								...editedTask,
								dueDate: new Date(editedTask.dueDate),
							};
						else {
							return task;
						}
					});

					setTasks(newTasks);
				} else {
					console.info("Server returned null when editing task.");
					alert("Failed editing task.");
				}
			})
			.catch(function (error) {
				console.error(
					`Error occurred when editing task: ${error.message}`
				);
				alert(`Error occurred editing task: ${error.message}`);
			});
	};

	const completeTask = (taskId) => {
		axios
			.get(`${SERVER_URL}/api/${VERSION}/tasks/${taskId}`)
			.then(function (task) {
				if (task.data) {
					task = task.data;
					axios
						.patch(`${SERVER_URL}/api/${VERSION}/tasks/${taskId}`, {
							isComplete: !task.isComplete,
						})
						.then(function (task) {
							if (task) {
								const newTasks = tasks.map((task) => {
									if (task.id === taskId) {
										return {
											...task,
											isComplete: !task.isComplete,
										};
									} else {
										return task;
									}
								});

								setTasks(newTasks);
							} else {
								console.info(
									"Server returned null when completing task."
								);
								alert("Failed completing task.");
							}
						})
						.catch(function (error) {
							console.error(
								`Error occurred when completing task: ${error.statusText}`
							);
							alert(
								`Error occurred completing task: ${error.statusText}`
							);
						});
				} else {
					console.info(
						"Server returned null when fetching task for completion."
					);
					alert("Failed completing task.");
				}
			})
			.catch(function (error) {
				console.error(
					`Error occurred when fetching task for completion: ${error.message}`
				);
				alert(
					`Error occurred fetching task for completion: ${error.message}`
				);
			});
	};

	const deleteTask = (taskId) => {
		axios
			.delete(`${SERVER_URL}/api/${VERSION}/tasks/${taskId}`)
			.then(function (task) {
				if (task.data) {
					const newTasks = tasks.filter((task) => task.id !== taskId);

					setTasks(newTasks);
				} else {
					console.info("Server returned null when deleting task");
					alert("Failed deleting task");
				}
			})
			.catch(function (error) {
				console.error(`Error occured deleting task: ${error.message}`);
				alert(`Error occured deleting task: ${error.message}`);
			});
	};
	// #endregion

	return (
		<div className="card m-1">
			<h1 className="card-title p-3">Tasks</h1>
			<div className="card-body">
				<button
					type="button"
					className="btn btn-primary col-md-2"
					data-bs-toggle="modal"
					data-bs-target="#createTaskModal"
				>
					Create New <i className="bi bi-plus"></i>
				</button>
				<table className="table table-responsive-sm table-hover mt-2">
					<thead>
						<tr>
							<th scope="col">{/* Actions... */}</th>
							<th id="titleHeader" scope="col">
								Title<i className=""></i>
							</th>
							<th scope="col">
								Description<i className=""></i>
							</th>
							<th scope="col">
								Status<i className=""></i>
							</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task) => (
							<Task
								key={"task" + task.id}
								task={task}
								editTask={editTask}
								completeTask={completeTask}
								deleteTask={deleteTask}
							/>
						))}
					</tbody>
				</table>
				<CreateTaskModal addTask={addTask} />
			</div>
		</div>
	);
};

export default TaskList;
