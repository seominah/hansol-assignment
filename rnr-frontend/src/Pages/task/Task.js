import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TaskList from '../../components/TaskList';

const Task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/task')
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setTasks(res);
      });
  }, []);

  const saveTask = () => {
    navigate('/task/save');
  };

  return (
    <div>
      <Container className="mt-2">
        <Row>
          <Col md={4}>
            <h1>R&R</h1>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={saveTask}>
                추가하기
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <TaskList />
      {/* {tasks.map((task) => (
        <TaskList key={task.taskId} task={task} />
      ))} */}
    </div>
  );
};

export default Task;
