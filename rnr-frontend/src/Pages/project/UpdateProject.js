import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProject = (props) => {
  const navigate = useNavigate();
  const { prjCode } = useParams();

  const [project, setProject] = useState({
    prjId: '',
    prjCode: '',
    prjName: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/project/' + prjCode)
      .then((res) => res.json())
      .then((res) => {
        setProject(res);
      });
  }, []);

  const changeValue = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const submitProject = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/project/update/' + prjCode, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(project),
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
          navigate('/project');
        } else {
          alert('업무 수정에 실패하였습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitProject}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>업무코드</Form.Label>
        <Form.Control
          type="text"
          placeholder="업무코드를 입력하세요."
          onChange={changeValue}
          name="prjCode"
          value={project.prjCode}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>업무명</Form.Label>
        <Form.Control
          type="text"
          placeholder="업무명을 입력하세요."
          onChange={changeValue}
          name="prjName"
          value={project.prjName}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        수정하기
      </Button>
    </Form>
  );
};

export default UpdateProject;
