import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Task = () => {
    const [task, setTasks] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        loadTask();
    }, []);

    const loadTask = async () => {
        const result = await axios.get(`http://localhost:8000/api/tasks/tasks/${id}`);
        setTasks(result.data);
    };


    return (
        <div className="container py-4">
        <Link className="btn btn-primary" to="/">
            Home
        </Link>
        <h1 className="display-4">{task.name}</h1>
        <hr />
        <ul className="list-group w-100">
                <li className="list-group-item"><b>Description:</b><br /> {task.description}</li>
                <li className="list-group-item"><b>Start Date:</b><br/> {task.start_date}</li>
                <li className="list-group-item"><b>End Date:</b><br /> {task.end_date}</li>
        </ul>
        </div>
    );
};

export default Task;
