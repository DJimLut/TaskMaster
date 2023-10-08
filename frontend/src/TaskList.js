import Task from './Task.js';
import $ from 'jquery';

const TaskList = ({ tasks, onHeaderToggle }) => {
    return (
        <div className="card m-1">
            <h1 className="card-title p-3">Tasks</h1>
            <div className="card-body">
                <button type="button" className="btn btn-outline-primary col-md-2">Create New <i className="bi bi-plus"></i></button>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th className="sortHeader" scope="col" onClick={() => onHeaderToggle($('th.sortHeader:contains("Title")'))}>Title<i className=""></i></th>
                            <th className="sortHeader" scope="col" onClick={() => onHeaderToggle($('th.sortHeader:contains("Description")'))}>Description<i className=""></i></th>
                            <th className="sortHeader" scope="col" onClick={() => onHeaderToggle($('th.sortHeader:contains("Status")'))}>Status<i className=""></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        { tasks.map(task => (
                            <Task title={task.title} description={task.description} status={task.status} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;