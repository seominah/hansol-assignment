import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SaveTask = (props) => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    taskId: '',
    prjCode: '',
    empId: '',
    comName: [],
    type: '',
  });

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const companies = [
    { id: 1, comName: 'PNS' },
    { id: 2, comName: '인티큐브' },
  ];
  const [isChecked, setIsChecked] = useState(false);
  const [checkedCompanies, setCheckedCompanies] = useState(new Set());

  useEffect(() => {
    console.log('실행됨');
    fetch('http://localhost:8080/api/v1/project')
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setProjects(res);
      });
    fetch('http://localhost:8080/api/v1/employee')
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setEmployees(res);
      });
  }, []);

  const changeValue = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(task);
  };

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedCompaniesHandler(target.value, target.checked);
    console.log(checkedCompanies);
    setTask({
      ...task,
      comName: Array.from(checkedCompanies),
    });
    console.log(task);
  };

  const checkedCompaniesHandler = (id, isChecked) => {
    if (isChecked) {
      checkedCompanies.add(id);
      setCheckedCompanies(checkedCompanies);
    } else if (!isChecked && checkedCompanies.has(id)) {
      checkedCompanies.delete(id);
      setCheckedCompanies(checkedCompanies);
    }
    return checkedCompanies;
  };

  const submitTask = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          navigate('/task');
        } else {
          alert('업무 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitTask} className="mt-2">
      <Form.Label>회사</Form.Label>
      <div>
        {companies.map((company) => (
          <label key={company.id} className="CheckBox">
            <input
              type="checkbox"
              value={company.comName}
              onChange={(e) => checkHandler(e)}
            />
            {company.comName}
          </label>
        ))}
      </div>

      {/* <Form.Select
        aria-label="Default select example"
        onChange={changeValue}
        name="comName"
      >
        <option>회사를 입력하세요</option>
        <option value="PNS">PNS</option>
        <option value="인티큐브">인티큐브</option>
      </Form.Select> */}

      <Form.Label>업무 코드</Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={changeValue}
        name="prjCode"
      >
        <option>업무 코드를 입력하세요</option>
        {projects.map((project) => (
          <option value={project.prjCode}>{project.prjCode}</option>
        ))}
      </Form.Select>

      <Form.Label>담당자</Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={changeValue}
        name="empId"
      >
        <option>담당자를를 입력하세요</option>
        {employees.map((employee) => (
          <option value={employee.empId}>{employee.empName}</option>
        ))}
      </Form.Select>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>종류</Form.Label>
        <Form.Control
          type="text"
          placeholder="종류를 입력하세요."
          onChange={changeValue}
          name="type"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        추가하기
      </Button>
    </Form>
  );
};

export default SaveTask;
