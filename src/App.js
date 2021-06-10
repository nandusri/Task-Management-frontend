import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddProject from "./components/projects/AddProject";
import EditProject from "./components/projects/EditProject";
import Project from "./components/projects/Project";
import Task from "./components/projects/Task";
import EditTask from "./components/projects/EditTask";
import AddTask from "./components/projects/AddTask";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/project/add" component={AddProject} />
          <Route exact path="/project/edit/:id" component={EditProject} />
          <Route exact path="/project/:id" component={Project} />
          <Route exact path="/project/:id/task/:id" component={Task} />
          <Route exact path="/project/:id/task/edit/:id" component={EditTask} />
          <Route exact path="/project/:id/taskadd/" component={AddTask} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
