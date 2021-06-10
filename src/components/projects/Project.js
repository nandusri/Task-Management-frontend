import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Project = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    duration: "",
    avatar: ""
  });
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    const res = await axios.get(`http://localhost:8000/api/tasks/projects/${id}`);
    setProject(res.data);
    const result = await axios.get(`http://localhost:8000/api/tasks/tasks/`, {params:{'project':id}});
    setTasks(result.data);
  };

  const deleteproject = async id => {
    await axios.delete(`http://localhost:8000/api/tasks/tasks/${id}`);
    loadProject();
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back
      </Link>
      <h1 className="display-4">{project.name}</h1>
      
      <hr />
      <ul className="list-group w-100">
        <li className="list-group-item"><b>Description:</b><br/> {project.description}</li>
        <li className="list-group-item"><b>Duration:</b><br /> {project.duration}</li>
        <li className="list-group-item"><b>Avatar: </b><br/> <img src={project.avatar}/></li>
      </ul>

      <div className="py-4">
        <Link className="btn btn-primary" to={`/project/${project.id}/taskadd/`}>
          Add Task
        </Link>
        <hr></hr>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th></th>
              <th scope="col">Task Name</th>
              <th scope="col">Start date</th>
              <th scope="col">End date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr>
                <td></td>
                <td>{task.name}</td>
                <td>{task.start_date}</td>
                <td>{task.end_date}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/project/${project.id}/task/${task.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/project/${project.id}/task/edit/${task.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteproject(task.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Project;
