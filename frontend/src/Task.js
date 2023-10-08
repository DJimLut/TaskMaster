const Task = ({ id, title, dueDate, description, status, onEditHandler, onCompleteHandler, onDeleteHandler }) => {
    return(
        <>
            <tr>
                <td>
                <button type="button" className="btn btn-outline-primary btn-sm mr-1" onClick={() => onEditHandler()}>Edit</button>
                <button type="button" className="btn btn-outline-primary btn-sm mr-1" onClick={() => onCompleteHandler(id)}>Mark as { status === 'Complete' ? 'Incomplete' : 'Complete' }</button>
                <button type="button" className="btn btn-outline-primary btn-sm mr-1" onClick={() => onDeleteHandler(id)}>Delete</button>
                </td>
                <td>
                    {title}
                    <br />
                    <small className="text-body-secondary">Due: {dueDate.toLocaleString()}</small>
                </td>
                <td>{description}</td>
                <td>{status}</td>
            </tr>
        </>
    );
}

export default Task;