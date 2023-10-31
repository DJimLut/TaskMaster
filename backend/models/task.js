const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	id: Number,
	title: String,
	description: String,
	dueDate: { type: Date, default: Date.now },
	isComplete: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
