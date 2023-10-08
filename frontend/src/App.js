import React, { useState } from 'react';
import Header from "./Header.js";
import $ from "jquery";
import "./App.css";
import TaskList from "./TaskList.js";

function App() {
    const [tasks, setTasks] = useState([]);

    const modifyArrows = (header) => {
        const allArrows = $('.sortHeader i');
        const headerArrow = header.find('i');
        
        // if this header already has an arrow, toggle it to flip it
        if (headerArrow.hasClass('bi-arrow-down') || headerArrow.hasClass('bi-arrow-up'))
            headerArrow.toggleClass('bi-arrow-down bi-arrow-up');
        else { // remove any other arrows and add a descending arrow to the header
            allArrows.removeClass();
            headerArrow.addClass('bi bi-arrow-down');
        }
    }

	return (
		<div className="text-bg-light">
			<Header />
			<TaskList tasks={tasks} onHeaderToggle={modifyArrows} />
		</div>
	);
}

export default App;