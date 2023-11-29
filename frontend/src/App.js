import React from "react";
import Header from "./components/Header.js";
import "./App.css";
import TaskList from "./components/TaskList.js";

function App() {
	return (
		<div className="container-fluid text-bg-light">
			<Header />
			<TaskList />
		</div>
	);
}

export default App;
