// #region requires
const express = require("express"),
	mongoose = require("mongoose"),
	cors = require("cors"),
	swaggerJsDoc = require("swagger-jsdoc"),
	openAPIDefinition = require("./docs/openapi/openapi.json"),
	swaggerUI = require("swagger-ui-express"),
	taskRoutes = require("./routes/tasks");
// #endregion

const app = express();
const port = 5000; // You can choose any available port

const options = { definition: openAPIDefinition, apis: ["./routes/*.js"] }; // object to hold openAPI definition and routes
const specs = swaggerJsDoc(options); // creates a SwaggerUI specification to read

// Connect to MongoDB
mongoose.connect(
	"your-key-here"
);

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)); // serves SwaggerUI Specification

// Use task routes
app.use("/api", taskRoutes);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
