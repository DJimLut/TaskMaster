const formatDate = (date) => {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000)).toISOString().slice(0,-5);
};

const TaskForm = ({ task }) => {
    return(
        <form className="taskForm">
            <input type="number" value={task.id} hidden readOnly />
            <div className="form-group">
                <label htmlFor="taskTitle" className="form-label">Title</label>
                <input id="taskTitle" name="title" type="text" value={task.title} className="form-control" onChange={(e) => { task[e.target.name] = e.target.value; }} />
            </div>
            <div className="form-group">
                <label htmlFor="taskDescription" className="form-label">Description</label>
                <textarea id="taskDescripton" name="description" value={task.description} className="form-control" onChange={(e) => { task[e.target.name] = e.target.value; }}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="taskDueDate" className="form-label">Due</label>
                <input id="taskDueDate" name="dueDate" type="datetime-local" value={formatDate(task.dueDate)} className="form-control" onChange={(e) => { task[e.target.name] = e.target.value; }} />
            </div>
            <div className="form-check">
                <input id="taskIsComplete" name="isComplete" type="checkbox" checked={task.isComplete} className="form-check-input" onChange={(e) => { task[e.target.name] = e.target.value; }} />
                <label htmlFor="taskIsComplete" className="form-check-label">Complete</label>
            </div>
        </form>
    );
};

export default TaskForm;