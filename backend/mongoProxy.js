// connect this to mongoDB
exports.createTask = async (task) => {
    if (task) {
        // add task
        return true;
    } else {
        console.error('Task is undefined');
        throw new Error('Task is undefined');
    }
};

exports.getTasks = async () => {
    const firstTask = {
        id: 0,
        title: 'First Task',
        description: 'This is the first task',
        dueDate: new Date(),
        isComplete: false
    };
    const secondTask = {
        id: 1,
        title: 'Second Task',
        descripton: 'This is the second task',
        dueDate: new Date(),
        isComplete: false
    };
    const tasks = [ firstTask, secondTask ];

    return tasks;
};

exports.getTask = async (id) => {
    if (typeof(id) === 'number' && !isNaN(id)) {
        const task = {
            id: id,
            title: 'Requested Task',
            description: 'Description of requested task',
            dueDate: new Date(),
            isComplete: false
        };

        return task;
    } else {
        console.error(`Id is ${id} and typeof ${typeof(id)}`);
        throw new Error('NaN');
    }
};

exports.updateTask = async (task) => {
    if (task) {
        if (typeof(task.id) === 'number' && !isNaN(task.id)) {
            if (this.getTask(task.id)) {
                // update Task
                return true;
            } else {
                // add task
                return this.createTask(task);
            }
        } else {
            console.error(`Id is ${task.id} and typeof ${typeof(task.id)}`);
            throw new Error('Id: NaN');
        }
    } else {
        console.error('Task is undefined.');
        throw new Error('Task is undefined.');
    }
};

exports.deleteTask = async (id) => {
    if (typeof(id) === 'number' && !isNaN(id)) {
        // delete task
        return true
    } else {
        console.error(`Id is ${task.id} and typeof ${typeof(task.id)}`);
        throw new Error('Id: NaN');
    }
};