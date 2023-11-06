import Task from "./Task.js";
import TaskModal from "./TaskModal.js";

import React, { useState } from "react";
import $ from "jquery";

const TaskList = () => {
	const newTask = {};
	const [tasks, setTasks] = useState([]);

	$.get("/api/v1/tasks")
		.then(function (tasks) {
			if (tasks) {
				setTasks(tasks);
			} else {
				console.log("No tasks returned from server");
				alert("No Tasks returned from server");
			}
		})
		.catch(function (error) {
			console.error(`An error occured fetching tasks: ${error.message}`);
			alert(`An error occured fetching tasks: ${error.message}`);
		});

	const addTask = (task) => {
		const taskExists = (element, index, array) => {
			return element.id === task.id;
		};

		if (tasks.some(taskExists))
			// task is already in tasks
			editTask(task);
		else {
			// add the new task
			$.post("/api/v1/tasks", task)
				.then(function (createdTask) {
					if (createdTask) {
						tasks.push(createdTask);
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
					$.patch(`/api/v1/tasks/${taskId}`, {
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
								`Error occurred when completing task: ${error.message}`
							);
							alert(
								`Error occurred completing task: ${error.message}`
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

	const sort = (header) => {
		const allArrows = $(".sortHeader i");
		const headerArrow = header.find("i");

		// TODO: Implement sorting function

		// if this header already has an arrow, toggle it to flip it
		if (
			headerArrow.hasClass("bi-arrow-down") ||
			headerArrow.hasClass("bi-arrow-up")
		)
			headerArrow.toggleClass("bi-arrow-down bi-arrow-up");
		else {
			// remove any other arrows and add a descending arrow to the header
			allArrows.removeClass();
			headerArrow.addClass("bi bi-arrow-down");
		}
	};

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
				<table className="table mt-2">
					<thead>
						<tr>
							<th scope="col">{/* Actions... */}</th>
							<th
								className="sortHeader"
								scope="col"
								onClick={() =>
									sort($('th.sortHeader:contains("Title")'))
								}
							>
								Title<i className=""></i>
							</th>
							<th
								className="sortHeader"
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
								className="sortHeader"
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
								onSaveHandler={addTask}
								onCompleteHandler={completeTask}
								onDeleteHandler={deleteTask}
							/>
						))}
					</tbody>
				</table>
				<TaskModal
					modalId={"createTaskModal"}
					action={"Create"}
					task={{ ...newTask, id: tasks.length }}
					onSaveHandler={addTask}
				/>
			</div>
		</div>
	);
};

export default TaskList;
