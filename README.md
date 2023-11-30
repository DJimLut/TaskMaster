# TaskMaster
Final Term Project for CSC-425: Web-Based Services and Applications

## HowTo
1. Clone repository into anywhere you like
2. Open command prompt or a new terminal in the backend folder.
   
### Backend
1. `node app.js` will start the server on your localhost with port 5000
   - The OpenApi definition is available at `TaskMaster/backend/docs/openapi/openapi.yaml`, `TaskMaster/backend/docs/openapi/openapi.json`, or on localhost:5000/api-docs
2. This is also available in the `README.md` defined in the `TaskMaster/backend` folder
3. Next we'll need to start the frontend react app so either change directory to `TaskMaster/frontend` or open a new terminal there
   
### Frontend
1. Start the app
   - `npm start` will start the development environment
   - `npm run build` creates a build folder with the production build inside
     - `serve build` will run the production build
2. You can find out more about react apps and my react app specifically by reading the `README.md` defined in the `TaskMaster/frontend` folder

### Functionality
- Create a task
  - Click the `Create + ` button in top left
  - Add title (optional)
  - Add description (optional)
  - Add date when due (optional)
  - Mark Complete (optional)
- Edit a task
  - Click the `Edit` button next to the task you want to edit
  - Edit title (optional)
  - Edit description (optional)
  - Edit date when due (optional)
  - Edit status (optional)
- Mark a task as complete
  - Click `Mark as Complete` next to the task you want to mark as complete
- Delete a task
  - Click `Delete` next to the task you want to delete
  - Click `Delete` on the `Confirm Delete` popup

Congratulations!

## Sprints
### Epic 1
- Plan wireframes for frontend

### Epic 2
- Create a new React application using `create-react-app`.
   - Design the user interface for TaskMaster. It should include:
     - A dashboard displaying the list of tasks.
     - The ability to add new tasks with a title, description, and due date.
     - The ability to edit existing tasks.
     - The ability to mark tasks as completed and delete tasks.
   - Implement user interactions such as form submission, editing, and deletion. (Implement JavaScript Event Handlers for this)
   - Use React components to structure your application logically.

### Epic 3
- Create backend server using express.js
  - Implement CRUD operations
  - Connect to MongoDB Atlas Database

### Epic 4
- Integrate frontend with backend
  - install axios into frontend
  - make API calls to backend server

### Epic 5
- Bug fixes, finishing touches
