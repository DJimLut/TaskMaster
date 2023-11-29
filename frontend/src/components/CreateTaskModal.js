import React, { useState } from "react";
import TaskForm from "./TaskForm.js";

const CreateTaskModal = ({ addTask }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState(new Date(Date.now()));
	const [isComplete, setIsComplete] = useState(false);

	const onSubmitHandler = () => {
		const task = { title, description, dueDate, isComplete };

		setTitle("");
		setDescription("");
		setDueDate(new Date(Date.now()));
		setIsComplete(false);

		addTask(task);
	};

	const onCancelHandler = () => {
		setTitle("");
		setDescription("");
		setDueDate(new Date(Date.now()));
		setIsComplete(false);
	};

	return (
		<div
			className="modal fade"
			id="createTaskModal"
			tabIndex="-1"
			aria-labelledby="taskModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="taskModalLabel">
							Create Task
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
							onClick={onSubmitHandler}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTaskModal;
