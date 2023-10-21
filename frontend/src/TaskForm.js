import React, { useState } from "react";

const formatDate = (date) => {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
		.toISOString()
		.slice(0, -5);
};

const TaskForm = ({ title, description, dueDate, isComplete }) => {
	return (
		<form className="taskForm">
			<div className="form-group">
				<label htmlFor="taskTitle" className="form-label">
					Title
				</label>
				<input
					id="taskTitle"
					name="title"
					type="text"
					value={title.getter}
					className="form-control"
					onChange={(e) => {
						title.setter(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="taskDescription" className="form-label">
					Description
				</label>
				<textarea
					id="taskDescripton"
					name="description"
					value={description.getter}
					className="form-control"
					onChange={(e) => {
						description.setter(e.target.value);
					}}
				></textarea>
			</div>
			<div className="form-group">
				<label htmlFor="taskDueDate" className="form-label">
					Due
				</label>
				<input
					id="taskDueDate"
					name="dueDate"
					type="datetime-local"
					value={formatDate(dueDate.getter)}
					className="form-control"
					onChange={(e) => {
						dueDate.setter(new Date(e.target.value));
					}}
				/>
			</div>
			<div className="form-check">
				<input
					id="taskIsComplete"
					name="isComplete"
					type="checkbox"
					checked={isComplete.getter}
					className="form-check-input"
					onChange={(e) => {
						isComplete.setter(e.target.checked);
					}}
				/>
				<label htmlFor="taskIsComplete" className="form-check-label">
					Complete
				</label>
			</div>
		</form>
	);
};

export default TaskForm;
