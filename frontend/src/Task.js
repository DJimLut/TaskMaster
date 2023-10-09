const Task = ({ id, title, dueDate, description, status, onEditHandler, onCompleteHandler, onDeleteHandler }) => {
    const createTask = (id, title, dueDate, description, status) => {
        return {
            "id": id,
            "title": title,
            "dueDate": dueDate,
            "description": description,
            "isComplete": status === "Complete"
        }
    };

    return(
        <tr>
            <td>
            <button type="button" className="btn btn-primary btn-sm mr-1" onClick={() => onEditHandler(createTask(id, title, dueDate, description, status))}>Edit</button>
            <button type="button" className="btn btn-success btn-sm mr-1" onClick={() => onCompleteHandler(id)}>Mark as { status === 'Complete' ? 'Incomplete' : 'Complete' }</button>
            <button type="button" className="btn btn-danger btn-sm mr-1" onClick={() => onDeleteHandler(id)}>Delete</button>
            </td>
            <td>
                {title}
                <br />
                <small className="text-body-secondary">Due: {dueDate.toLocaleString()}</small>
            </td>
            <td>{description}</td>
            <td>{status}</td>
        </tr>
    );
}

export default Task;