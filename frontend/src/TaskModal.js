import React, { useState } from "react";
import TaskForm from "./TaskForm.js";

const TaskModal = ({ modalId, action, task, onSaveHandler }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState(new Date());
	const [isComplete, setIsComplete] = useState(false);

	if (action.toLowerCase().trim() === "edit" && !title) {
		setTitle(task.title);
		setDescription(task.description);
		setDueDate(task.dueDate);
		setIsComplete(task.isComplete);
	}

	const Task = () => {
		return {
			id: task.id,
			title: title,
			description: description,
			dueDate: dueDate,
			isComplete: isComplete,
		};
	};

	return (
		<div
			className="modal fade"
			id={modalId}
			tabIndex="-1"
			aria-labelledby="taskModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="taskModalLabel">
							{action} Task
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<TaskForm
							title={{ getter: title, setter: setTitle }}
							description={{
								getter: description,
								setter: setDescription,
							}}
							dueDate={{ getter: dueDate, setter: setDueDate }}
							isComplete={{
								getter: isComplete,
								setter: setIsComplete,
							}}
						/>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => onSaveHandler(Task())}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskModal;
