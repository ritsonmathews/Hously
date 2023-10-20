import React, { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import "./Services.css";

const Services = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addTask = () => {
    if (task.trim() !== "") {
      if (editIndex === -1) {
        setTasks([...tasks, { task, description, code }]);
      } else {
        tasks[editIndex] = { task, description, code };
        setTasks([...tasks]);
        setEditIndex(-1);
      }
      setTask("");
      setDescription("");
      setCode("");
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setTask(tasks[index].task);
    setDescription(tasks[index].description);
    setCode(tasks[index].code);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="Services">
      <Grid container spacing={2} className="mb-3">
        <Grid item md={2}>
          <TextField
            label="Service Code"
            variant="outlined"
            value={code}
            onChange={handleCodeChange}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Service"
            variant="outlined"
            value={task}
            onChange={handleTaskChange}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item md={2}>
          <Button variant="contained" color="primary" onClick={addTask}>
            {editIndex === -1 ? "Add" : "Update"}
          </Button>
        </Grid>
      </Grid>

      <List>
        {tasks.map((item, index) => (
          <ListItem key={index} className="task-item">
            <ListItemText primary={item.code} />
            <ListItemText primary={item.task} />
            <ListItemText primary={item.description} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => editTask(index)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteTask(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Services;
