import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TaskList from '../components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/task')
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setTasks(res);
      });
  }, []);

  return (
    <Container className="mt-2">
      <TaskList />
      {/* {tasks.map((task) => (
        <TaskList key={task.taskId} task={task} />
      ))} */}
    </Container>
  );
};

export default Home;
