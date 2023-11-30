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
