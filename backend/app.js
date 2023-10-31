const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const port = 3000; // You can choose any available port

// Connect to MongoDB
mongoose.connect(
	"mongodb+srv://service:serviceAccountPass@taskmastercluster.ct5wrv1.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Use task routes
app.use("/api", taskRoutes);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
