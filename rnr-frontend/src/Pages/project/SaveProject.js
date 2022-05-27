import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SaveProject = (props) => {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    prjId: '',
    prjCode: '',
    prjName: '',
  });

  const changeValue = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const submitProject = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(project),
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
          navigate('/project');
        } else {
          alert('업무 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitProject} className="mt-2">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>업무코드</Form.Label>
        <Form.Control
          type="text"
          placeholder="업무코드를 입력하세요."
          onChange={changeValue}
          name="prjCode"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>업무명</Form.Label>
        <Form.Control
          type="text"
          placeholder="업무명을 입력하세요."
          onChange={changeValue}
          name="prjName"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        추가하기
      </Button>
    </Form>
  );
};

export default SaveProject;
