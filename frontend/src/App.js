import React from "react";
import Header from "./components/Header.js";
import "./App.css";
import TaskList from "./components/TaskList.js";
import Footer from "./components/Footer.js";

function App() {
	return (
		<div className="container-fluid text-bg-light">
			<Header />
			<TaskList />
			<Footer />
		</div>
	);
}

export default App;
