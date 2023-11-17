import Task from "./Task.js";
import CreateTaskModal from "./CreateTaskModal.js";

import React, { useEffect, useState } from "react";
import $ from "jquery";

const TaskList = () => {
	const [tasks, setTasks] = useState([
		{
			id: 0,
			title: "",
			description: "",
			dueDate: new Date(Date.now()),
			isComplete: false,
		},
		{
			id: 1,
			title: "Example",
			description: "Exmaple Task",
			dueDate: new Date(Date.now() + 1),
			isComplete: true,
		},
	]);
	const [newTask, setNewTask] = useState({
		id: tasks.length,
		title: "",
		description: "",
		dueDate: new Date(Date.now()),
		isComplete: false,
	});
	useEffect(() => {
		$.get("/api/v1/tasks")
			.then(function (tasks) {
				if (tasks && typeof(tasks) === typeof([])) {
					setTasks(tasks);
				} else {
					console.log("No tasks returned from server");
					alert("No Tasks returned from server");
				}
			})
			.catch(function (error) {
				console.error(
					`An error occured fetching tasks: ${error.message}`
				);
				alert(`An error occured fetching tasks: ${error.message}`);
			});
	}, []);

	// #region functions
	const addTask = () => {
		const taskExists = (element, index, array) => {
			return element.id === newTask.id;
		};

		if (tasks.some(taskExists))
			// task is already in tasks
			editTask(newTask);
		else {
			// add the new task
			$.post("/api/v1/tasks", newTask)
				.then(function (createdTask) {
					if (createdTask) {
						tasks.push(createdTask);
						setNewTask({});
					} else {
						console.info("Server returned null when creating task");
						alert("Server returned null when creating task.");
					}
				})
				.catch(function (error) {
					console.error(`Failed creating task: ${error.message}`);
					alert(`Failed creating task: ${error.message}`);
				});
		}
	};

	const editTask = (taskToEdit) => {
		$.patch(`/api/v1/tasks/${taskToEdit.id}`, taskToEdit)
			.then(function (editedTask) {
				if (editedTask) {
					const newTasks = tasks.map((task) => {
						if (task.id === editedTask.id) return editedTask;
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
		$.get(`/api/v1/tasks/${taskId}`)
			.then(function (task) {
				if (task) {
					$.ajax({
						method: "PATCH",
						url: `/api/v1/tasks/${taskId}`,
						data: {
							isComplete: !task.isComplete,
						},
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
		$.ajax({
			method: "DELETE",
			url: `/api/v1/tasks/${taskId}`,
		})
			.then(function (task) {
				if (task) {
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

	const sort = (headerArr) => {
		return;
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
				<table className="table table-responsive table-hover mt-2 col-12">
					<thead>
						<tr>
							<th scope="col">{/* Actions... */}</th>
							<th
								scope="col"
								onClick={() =>
									sort($('th.sortHeader:contains("Title")'))
								}
							>
								Title<i className=""></i>
							</th>
							<th
								scope="col"
								onClick={() =>
									sort(
										$(
											'th.sortHeader:contains("Description")'
										)
									)
								}
							>
								Description<i className=""></i>
							</th>
							<th
								scope="col"
								onClick={() =>
									sort($('th.sortHeader:contains("Status")'))
								}
							>
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
				<CreateTaskModal
					newTask={{ ...newTask, id: tasks.length }}
					addTask={addTask}
				/>
			</div>
		</div>
	);
};

export default TaskList;
