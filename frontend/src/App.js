import Header from "./Header.js";
import logo from "./logo.svg";
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
