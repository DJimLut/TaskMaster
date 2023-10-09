import React from 'react';
import Header from "./Header.js";
import "./App.css";
import TaskList from "./TaskList.js";

function App() {
	return (
		<div className="text-bg-light">
			<Header />
			<TaskList />
		</div>
	);
}

export default App;