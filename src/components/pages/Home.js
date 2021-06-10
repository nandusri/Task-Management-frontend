import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8000/api/tasks/projects/");
    setProject(result.data.reverse());
  };

  const deleteproject = async id => {
    await axios.delete(`http://localhost:8000/api/tasks/projects/${id}`);
    loadProjects();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th></th>
              <th scope="col">Name</th>
              <th scope="col">Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr>
                <td></td>
                <td>{project.name}</td>
                <td>{project.duration}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/project/${project.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/project/edit/${project.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteproject(project.id)}
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

export default Home;
