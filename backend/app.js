const express = require('express');
const proxy = require('./mongoProxy.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 3000; // You can choose any available port

// Connect to MongoDB
mongoose.connect('mongodb+srv://service:serviceAccountPass@taskmastercluster.ct5wrv1.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Use task routes
app.use('/api', taskRoutes);

// Define routes
// app.post('/api/task', async (req, res, next) => {
//     await proxy.updateTask(req.body
//     ).then(function () {
//         res.status(200).send('200: Ok\n');
//     }).catch(function (error) {
//         next(error.message);
//     });
// });

// app.get('/api/tasks', async (req, res, next) => {
//     await proxy.getTasks(
//     ).then(function (tasks) {
//         res.json(tasks);
//     }).catch(function (error) {
//         next(error.message);
//     });
// });

// app.get('/api/task/:taskId', async (req, res, next) => {
//     await proxy.getTask(Number(req.params.taskId)
//     ).then(function (task) {
//         res.json(task);
//     }).catch(function (error) {
//         next(error.message);
//     });
// });

// app.delete('/api/task/:taskId', async (req, res, next) => {
//     await proxy.deleteTask(Number(req.params.taskId)
//     ).then(function () {
//         res.status(200).send('200: Ok\n');
//     }).catch(function (error) {
//         next(error.message);
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});