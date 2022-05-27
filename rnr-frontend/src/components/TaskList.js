import { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TaskList = (props) => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/task')
      .then((res) => res.json())
      .then((res) => {
        setTasks(res);
      });
  }, []);

  const deleteTask = () => {
    fetch('http://localhost:8080/api/v1/task/delete/' + tasks[0].taskId, {
      method: 'POST',
    })
      .then((res) => {
        if (res.status === 204) {
          return res.text();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          navigate('/');
        } else {
          alert('R&R업무 삭제에 실패하였습니다.');
        }
      });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>업무코드</th>
          <th>업무명</th>
          <th>회사</th>
          <th>담당자</th>
          <th>직급</th>
          <th>종류</th>
          <th>전화번호</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.taskId}>
            <td>{task.taskId}</td>
            <td>{task.prjCode}</td>
            <td>{task.prjName}</td>
            <td>{task.comName}</td>
            <td>{task.empName}</td>
            <td>{task.position}</td>
            <td>{task.type}</td>
            <td>{task.empContact}</td>
            <td>
              <Button variant="danger" onClick={deleteTask}>
                삭제
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;
