import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const AddTask = () => {
  let history = useHistory();
  const { id } = useParams();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();
  const [items, setItems] = useState([]);
  const [value, setValue] = useState();

  
  const onInputChange = e => {
    if (e.target.name == 'name') {
        setName(e.target.value);
    } else if (e.target.name == 'description') {
        setDescription(e.target.value);
    } else if (e.target.name == 'start_date') {
        setstartDate(e.target.value);
    } else if (e.target.name == 'end_date') {
        setendDate(e.target.value);
    } else if (e.target.name == 'select') {
      setValue(e.target.value);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
    let data = new FormData();
    data.append("project_id", id);
    data.append("name", name);
    data.append("description", description);
    data.append("start_date", startDate);
    data.append("end_date", endDate);

    console.log(data);
    await axios.post(`http://localhost:8000/api/tasks/tasks/`, data,config);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Task</h2>
        <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Project name"
                name="name"
                value={name}
                onChange={e => onInputChange(e)}
            />
        </div>
        <div className="form-group">
            <textarea
                name="description"
                className="form-control form-control-lg"
                placeholder="Description"
                value={description}
                id="noter-text-area"
                rows={7}
                onChange={e => onInputChange(e)}>
            </textarea>
        </div>
        <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Duration"
              name="start_date"
              value={startDate}
              onChange={e => onInputChange(e)}
            />
        </div>
        <div className="form-group">
            <input
                type="date"
                className="form-control form-control-lg"
                placeholder="Duration"
                name="end_date"
                value={endDate}
                onChange={e => onInputChange(e)}
            />
        </div>
          
          <button className="btn btn-primary btn-block">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;