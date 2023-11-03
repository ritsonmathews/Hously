import React, { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import "./Services.css";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";


const GET_SERVICES = gql`
  query GetServices {
    getAllServices {
      _id
      code
      task
      description
    }
  }
`;

const CREATE_SERVICE = gql`
  mutation CreateService($code: String!, $task: String!, $description: String!) {
    createService(input: { code: $code, task: $task, description: $description }) {
      _id
      code
      task
      description
    }
  }
`;

const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $code: String!, $task: String!, $description: String!) {
    updateService(id: $id, input: { code: $code, task: $task, description: $description }) {
      _id
      code
      task
      description
    }
  }
`;

const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;

const Services = () => {
  const [code, setCode] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const { loading, error, data } = useQuery(GET_SERVICES);
  const [createService] = useMutation(CREATE_SERVICE);
  const [updateService] = useMutation(UPDATE_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addTask = () => {
    if (code.trim() !== "" && task.trim() !== "" && description.trim() !== "") {
      if (editIndex === -1) {
        createService({
          variables: { code, task, description },
          update: (cache, { data: { createService } }) => {
            const newService = createService;
            cache.writeQuery({
              query: GET_SERVICES,
              data: { getAllServices: [...data.getAllServices, newService] },
            });
          },
        });
      } else {
        updateService({
          variables: { id: tasks[editIndex]._id, code, task, description },
        });
        setEditIndex(-1);
      }
      setCode("");
      setTask("");
      setDescription("");
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setCode(tasks[index].code);
    setTask(tasks[index].task);
    setDescription(tasks[index].description);
  };

  const deleteTask = (index, id) => {
    deleteService({
      variables: { id },
      update: (cache) => {
        cache.writeQuery({
          query: GET_SERVICES,
          data: { getAllServices: data.getAllServices.filter((task) => task._id !== id) },
        });
      },
    });
  };

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

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
        {data.getAllServices.map((item, index) => (
          <ListItem key={item._id} className="task-item">
            <ListItemText primary={item.code} />
            <ListItemText primary={item.task} />
            <ListItemText primary={item.description} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => editTask(index, item._id)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteTask(index, item._id)}>
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
