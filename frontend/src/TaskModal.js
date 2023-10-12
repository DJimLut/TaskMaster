import TaskForm from './TaskForm.js';

const TaskModal = ({ modalId, action, task, onSaveHandler }) => {
    return(
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="taskModalLabel">{action} Task</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <TaskForm task={task} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={() => onSaveHandler(task)}>Save</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;