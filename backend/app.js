const express = require('express');
const proxy = require('./mongoProxy.js');
const app = express();
const port = 3000; // You can choose any available port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.post('/api/task', async (req, res, next) => {
    await proxy.updateTask(req.body
    ).then(function () {
        res.status(200).send('200: Ok\n');
    }).catch(function (error) {
        next(error.message);
    });
});

app.get('/api/tasks', async (req, res, next) => {
    await proxy.getTasks(
    ).then(function (tasks) {
        res.json(tasks);
    }).catch(function (error) {
        next(error.message);
    });
});

app.get('/api/task/:taskId', async (req, res, next) => {
    await proxy.getTask(Number(req.params.taskId)
    ).then(function (task) {
        res.json(task);
    }).catch(function (error) {
        next(error.message);
    });
});

app.delete('/api/task/:taskId', async (req, res, next) => {
    await proxy.deleteTask(Number(req.params.taskId)
    ).then(function () {
        res.status(200).send('200: Ok\n');
    }).catch(function (error) {
        next(error.message);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});