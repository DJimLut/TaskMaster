const express = require("express"),
	mongoose = require("mongoose"),
	cors = require("cors"),
	swaggerJsDoc = require("swagger-jsdoc"),
	openAPIDefinition = require("./docs/openapi/openapi.json"),
	swaggerUI = require("swagger-ui-express"),
	taskRoutes = require("./routes/tasks");

const app = express();
const port = 5000; // You can choose any available port

const options = { definition: openAPIDefinition, apis: ["./routes/*.js"] };
const specs = swaggerJsDoc(options);

// Connect to MongoDB
mongoose.connect(
	"mongodb+srv://service:srvAccPass@taskmastercluster.ct5wrv1.mongodb.net/?retryWrites=true&w=majority"
);

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Use task routes
app.use("/api", taskRoutes);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
