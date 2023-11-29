const formatDate = (date) => {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
		.toISOString()
		.slice(0, -5);
};

const TaskForm = ({ title, description, dueDate, isComplete }) => {
	return (
		<form className="taskForm">
			<div className="form-group">
				<label htmlFor="createTaskTitle" className="form-label">
					Title
				</label>
				<input
					id="createTaskTitle"
					name="title"
					type="text"
					value={title.get}
					className="form-control"
					onChange={(e) => {
						title.set(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="createTaskDescription" className="form-label">
					Description
				</label>
				<textarea
					id="createTaskDescription"
					name="description"
					value={description.get}
					className="form-control"
					onChange={(e) => {
						description.set(e.target.value);
					}}
				></textarea>
			</div>
			<div className="form-group">
				<label htmlFor="createTaskDueDate" className="form-label">
					Due
				</label>
				<input
					id="createTaskDueDate"
					name="dueDate"
					type="datetime-local"
					value={formatDate(dueDate.get)}
					className="form-control"
					onChange={(e) => {
						dueDate.set(new Date(e.target.value));
					}}
				/>
			</div>
			<div className="form-check">
				<input
					id="createTaskIsComplete"
					name="isComplete"
					type="checkbox"
					checked={isComplete.get}
					className="form-check-input"
					onChange={(e) => {
						isComplete.set(e.target.checked);
					}}
				/>
				<label
					htmlFor="createTaskIsComplete"
					className="form-check-label"
				>
					Complete
				</label>
			</div>
		</form>
	);
};

export default TaskForm;
