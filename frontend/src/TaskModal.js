import TaskForm from './TaskForm.js';

const TaskModal = (task, onSaveHandler) => {
    return(
        <div className="modal fade" id="taskModal" tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="taskModalLabel">TaskModal</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <TaskForm {...task} onSaveHandler={onSaveHandler} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary">Save</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;