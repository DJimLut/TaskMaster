const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// #region v1

// Create a new task
router.post("/v1/tasks", async (req, res) => {
	const task = new Task(req.body);
	debugger;
	await task
		.save()
		.then(function () {
			res.status(201).json(task);
		})
		.catch(function (error) {
			res.status(400).json({ error: error.message });
		});
});

// Get all tasks
router.get("/v1/tasks", async (req, res) => {
	debugger;
	await Task.find()
		.then(function (tasks) {
			res.status(200).json(tasks);
		})
		.catch(function (error) {
			res.status(500).json({ error: error.message });
		});
});

router.get("/v1/tasks/:id", async (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) {
		res.status(400).json({ error: "Invalid id" });
	} else {
		await Task.findOne({ id: req.params.id })
			.then(function (task) {
				if (!task) {
					res.status(404).json({ error: "Task not found." });
				} else {
					res.status(200).json(task);
				}
			})
			.catch(function (error) {
				res.status(400).json({ error: error.message });
			});
	}
});

// Update a task by ID
router.patch("/v1/tasks/:id", async (req, res) => {
	const id = Number(req.params.id);
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"id",
		"title",
		"description",
		"dueDate",
		"isComplete",
	];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).json({ error: "Invalid updates!" });
	}

	if (isNaN(id)) {
		return res.status(400).json({ error: "Invalid Id!" });
	}

	await Task.findOneAndUpdate({ id: req.params.id }, req.body, {
		new: true,
		runValidators: true,
	})
		.then(function (task) {
			if (!task) {
				return res.status(404).json();
			}
			res.status(200).json(task);
		})
		.catch(function (error) {
			res.status(400).json({ error: error.message });
		});
});

// Delete a task by ID
router.delete("/v1/tasks/:id", async (req, res) => {
	await Task.findOneAndDelete({ id: req.params.id })
		.then(function (task) {
			if (!task) {
				return res.status(404).json();
			}
			res.status(200).json(task);
		})
		.catch(function (error) {
			res.status(500).json({ error: error.message });
		});
});
// #endregion

module.exports = router;
