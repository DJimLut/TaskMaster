const ConfirmDeleteModal = ({ taskId, deleteTask }) => {
	const onDeleteHandler = () => deleteTask(taskId);

	return (
		<div
			className="modal fade"
			id={"confirmDelete" + taskId + "Modal"}
			tabIndex="-1"
			aria-labelledby="taskModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="taskModalLabel">
							Confirm Delete
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<p>Are you sure you want to delete this task?</p>
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
							className="btn btn-danger"
							data-bs-dismiss="modal"
							onClick={onDeleteHandler}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDeleteModal;
