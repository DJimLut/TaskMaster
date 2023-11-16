const Task = ({ task, editTask, completeTask, deleteTask }) => {
	return (
		<tr>
			<td>
				<button
					type="button"
					className="btn btn-primary btn-sm mr-1"
					data-bs-toggle="modal"
					data-bs-target="#editTaskModal"
				>
					Edit
				</button>
				<button
					type="button"
					className="btn btn-success btn-sm mr-1"
					onClick={() => completeTask(task.id)}
				>
					Mark as{" "}
					{task.status === "Complete" ? "Incomplete" : "Complete"}
				</button>
				<button
					type="button"
					className="btn btn-danger btn-sm mr-1"
					onClick={() => deleteTask(task.id)}
				>
					Delete
				</button>
			</td>
			<td>
				{task.title}
				<br />
				<small className="text-body-secondary">
					Due: {task.dueDate.toLocaleString()}
				</small>
			</td>
			<td>{task.description}</td>
			<td>{task.isComplete ? "Complete" : "Incomplete"}</td>
		</tr>
	);
};

export default Task;
