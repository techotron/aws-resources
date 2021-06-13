# Blueprint - Frontend/Backend
This is a blueprint for starting an app with a React frontend and a Golang backend (with a Postgres DB). 

The initial status of this app is:

- Frontend: the default for `npx create-react-app`
- Backend: Gin API which uses `migrate` to run the DB schema and serves a simple JSON response to `http://localhost:5000/info`
- DB: Simple Postgres server.