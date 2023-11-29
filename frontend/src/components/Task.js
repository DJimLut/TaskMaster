import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditTaskModal from "./EditTaskModal";

const Task = ({ task, editTask, completeTask, deleteTask }) => {
	return (
		<tr>
			<td>
				<button
					type="button"
					className="btn btn-primary btn-sm mr-1"
					data-bs-toggle="modal"
					data-bs-target={"#editTask" + task.id + "Modal"}
				>
					Edit
				</button>
				<button
					type="button"
					className="btn btn-success btn-sm mr-1"
					onClick={() => completeTask(task.id)}
				>
					Mark as {task.isComplete ? "Incomplete" : "Complete"}
				</button>
				<button
					type="button"
					className="btn btn-danger btn-sm mr-1"
					data-bs-toggle="modal"
					data-bs-target={"#confirmDelete" + task.id + "Modal"}
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
			<td>
				<EditTaskModal task={task} editTask={editTask} />
			</td>
			<td>
				<ConfirmDeleteModal taskId={task.id} deleteTask={deleteTask} />
			</td>
		</tr>
	);
};

export default Task;
