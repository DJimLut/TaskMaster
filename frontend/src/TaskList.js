function TaskList() {
    return (
        <div className="card m-1">
            <h1 className="card-title p-3">Tasks</h1>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th className="sortHeader" scope="col">Title<i className=""></i></th>
                            <th className="sortHeader" scope="col">Description<i className=""></i></th>
                            <th className="sortHeader" scope="col">Status<i className=""></i></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;