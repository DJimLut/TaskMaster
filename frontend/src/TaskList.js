import Task from './Task.js';
import $ from 'jquery';

const TaskList = ({ tasks, onHeaderToggle, onCreateHandler, onEditHandler, onCompleteHandler, onDeleteHandler }) => {
    return (
        <div className="card m-1">
            <h1 className="card-title p-3">Tasks</h1>
            <div className="card-body">
                <button type="button" className="btn btn-outline-primary col-md-2" onClick={() => onCreateHandler()}>Create New <i className="bi bi-plus"></i></button>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">{/* Actions... */}</th>
                            <th className="sortHeader" scope="col" onClick={() => onHeaderToggle($('th.sortHeader:contains("Title")'))}>Title<i className=""></i></th>
                            <th className="sortHeader" scope="col" onClick={() => onHeaderToggle($('th.sortHeader:contains("Description")'))}>Description<i className=""></i></th>
                            <th className="sortHeader" scope="col" onClick={() => onHeaderToggle($('th.sortHeader:contains("Status")'))}>Status<i className=""></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        { tasks.map(task => (
                            <Task 
                                key={'task' + task.id} 
                                id={task.id} title={task.title} 
                                dueDate={task.dueDate} 
                                description={task.description} 
                                status={ task.isComplete ? 'Complete' : 'Incomplete' } 
                                onEditHandler={onEditHandler}
                                onCompleteHandler={onCompleteHandler} 
                                onDeleteHandler={onDeleteHandler} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;