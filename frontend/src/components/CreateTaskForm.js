const formatDate = (date) => {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
		.toISOString()
		.slice(0, -5);
};

const CreateTaskForm = ({ task }) => {
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
					value={task.title}
					className="form-control"
					onChange={(e) => {
						task.title = e.target.value;
					}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="createTaskDescription" className="form-label">
					Description
				</label>
				<textarea
					id="createTaskDescripton"
					name="description"
					value={task.description}
					className="form-control"
					onChange={(e) => {
						task.description = e.target.value;
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
					value={formatDate(task.dueDate)}
					className="form-control"
					onChange={(e) => {
						task.dueDate = new Date(e.target.value);
					}}
				/>
			</div>
			<div className="form-check">
				<input
					id="createTaskIsComplete"
					name="isComplete"
					type="checkbox"
					checked={task.isComplete}
					className="form-check-input"
					onChange={(e) => {
						task.isComplete = e.target.checked;
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

export default CreateTaskForm;
