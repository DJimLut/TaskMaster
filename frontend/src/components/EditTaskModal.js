import React, { useState } from "react";
import TaskForm from "./TaskForm.js";

const EditTaskModal = ({ task, editTask }) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [dueDate, setDueDate] = useState(new Date(task.dueDate));
	const [isComplete, setIsComplete] = useState(task.isComplete);

	const onSaveHandler = () => {
		const editedTask = {
			id: task.id,
			title,
			description,
			dueDate,
			isComplete,
		};

		setTitle(task.title);
		setDescription(task.description);
		setDueDate(new Date(task.dueDate));
		setIsComplete(task.isComplete);

		editTask(editedTask);
	};

	const onCancelHandler = () => {
		setTitle(task.title);
		setDescription(task.description);
		setDueDate(new Date(task.dueDate));
		setIsComplete(task.isComplete);
	};

	return (
		<div
			className="modal fade"
			id={"editTask" + task.id + "Modal"}
			tabIndex="-1"
			aria-labelledby="taskModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="taskModalLabel">
							Edit Task
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
							title={{ get: title, set: setTitle }}
							description={{
								get: description,
								set: setDescription,
							}}
							dueDate={{ get: dueDate, set: setDueDate }}
							isComplete={{ get: isComplete, set: setIsComplete }}
						/>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
							onClick={onCancelHandler}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-primary"
							data-bs-dismiss="modal"
							onClick={onSaveHandler}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditTaskModal;
