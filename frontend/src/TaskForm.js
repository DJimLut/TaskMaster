const formatDate = (date) => {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000)).toISOString().slice(0,-5);
};

const TaskForm = (task, onSaveHandler) => {
    return(
        <form className="taskForm">
            <input type="number" defaultValue={task.id} hidden />
            <div className="form-group">
                <label htmlFor="taskTitle" className="form-label">Title</label>
                <input id="taskTitle" type="text" defaultValue={task.title} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="taskDescription" className="form-label">Description</label>
                <textarea id="taskDescripton" defaultValue={task.description} className="form-control"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="taskDueDate" className="form-label">Due</label>
                <input id="taskDueDate" type="datetime-local" defaultValue={formatDate(task.dueDate)} className="form-control" />
            </div>
            <div className="form-check">
                <input id="taskIsComplete" type="checkbox" defaultChecked={task.isComplete} className="form-check-input" />
                <label htmlFor="taskIsComplete" className="form-check-label">Complete</label>
            </div>
        </form>
    );
};

export default TaskForm;