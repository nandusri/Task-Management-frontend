import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditProject = () => {
  let history = useHistory();
  const { id } = useParams();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState();
  const [imageStatus, setImageStatus] = useState();

  
  const onInputChange = e => {
    if (e.target.name == 'name') {
      setName(e.target.value);
    } else if (e.target.name == 'description') {
      setDescription(e.target.value);
    } else if (e.target.name == 'duration') {
      setDuration(e.target.value);
    } else if (e.target.name == 'avatar') {
      setAvatar(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageStatus('updated');
    }
  };


  useEffect(() => {
    loadProject();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
    let data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("duration", duration);
    if (imageStatus == 'updated') {
      data.append("avatar", avatar);
    }


    await axios.patch(`http://localhost:8000/api/tasks/projects/${id}/`, data,config);
    history.push("/");
  };

  const loadProject = async () => {
    const result = await axios.get(`http://localhost:8000/api/tasks/projects/${id}`);
    setName(result.data.name);
    setDescription(result.data.description);
    setDuration(result.data.duration);
    setAvatar(result.data.avatar);
    setImage(result.data.avatar);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Project</h2>
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
              onChange={e => onInputChange(e)}></textarea>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Duration"
              name="duration"
              value={duration}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <img src={image} height="150px" width="300px"/>
            <input
              type="file"
              name="avatar"
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Update Project</button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
