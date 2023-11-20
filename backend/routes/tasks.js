const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// #region v1

// Create a new task
router.post("/v1/tasks", async (req, res) => {
	const task = new Task(req.body);
	await task
		// save the task to the db
		.save()
		// return StatusCode 201 with the json of the created task
		.then(function () {
			res.status(201).json(task);
		})
		// return error(s), if any
		.catch(function (error) {
			res.status(400).json({ error: error.message });
		});
});

// Get all tasks
router.get("/v1/tasks", async (req, res) => {
	// get all tasks from db
	await Task.find()
		// return StatusCode 200 with json of tasks
		.then(function (tasks) {
			res.status(200).json(tasks);
		})
		// return error(s), if any
		.catch(function (error) {
			res.status(500).json({ error: error.message });
		});
});

router.get("/v1/tasks/:id", async (req, res) => {
	// pass in id parameter to Number constructor
	const id = Number(req.params.id);

	// if not a number return invalid id
	if (isNaN(id)) {
		res.status(400).json({ error: "Invalid id" });
	} else {
		// get the task from the db
		await Task.findOne({ id: req.params.id })
			.then(function (task) {
				if (!task) {
					// if task is null return not found
					res.status(404).json({ error: "Task not found." });
				} else {
					// return the task with StatusCode 200
					res.status(200).json(task);
				}
			})
			// return error(s), if any
			.catch(function (error) {
				res.status(400).json({ error: error.message });
			});
	}
});

// Update a task by ID
router.patch("/v1/tasks/:id", async (req, res) => {
	// pass in parameter id to Number constructor
	const id = Number(req.params.id);
	// grab all intended updates
	const updates = Object.keys(req.body);
	// specify allowed updates
	const allowedUpdates = [
		"id",
		"title",
		"description",
		"dueDate",
		"isComplete",
	];

	// check for invalid updates
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).json({ error: "Invalid updates!" });
	}

	if (isNaN(id)) {
		// if not a number return invalid id
		return res.status(400).json({ error: "Invalid Id!" });
	}

	// find the task and update it in the db
	await Task.findOneAndUpdate({ id: req.params.id }, req.body, {
		new: true,
		runValidators: true,
	})
		.then(function (task) {
			if (!task) {
				// if task is null return not found
				return res.status(404).json();
			} else {
				// return task json
				res.status(200).json(task);
			}
		})
		// return error(s) if any
		.catch(function (error) {
			res.status(400).json({ error: error.message });
		});
});

// Delete a task by ID
router.delete("/v1/tasks/:id", async (req, res) => {
	// pass in id parameter to Number constructor
	const id = Number(req.param.id);

	if (isNaN(id)) {
		// if Id not a number return invalid Id
		return res.status(400).json({ error: "Invalid Id!" });
	} else {
		// find task and delete from db
		await Task.findOneAndDelete({ id: req.params.id })
			.then(function (task) {
				if (!task) {
					// if task is null return not found
					return res.status(404).json();
				} else {
					// return task
					res.status(200).json(task);
				}
			})
			// return error(s), if any
			.catch(function (error) {
				res.status(500).json({ error: error.message });
			});
	}
});
// #endregion

module.exports = router;
