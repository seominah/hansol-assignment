import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SaveEmployee = (props) => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    empId: '',
    empName: '',
    empContact: '',
    position: '',
  });

  const changeValue = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const submitEmployee = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(employee),
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
          navigate('/employee');
        } else {
          alert('담당자 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitEmployee} className="mt-2">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="담당자 이름을 입력하세요."
          onChange={changeValue}
          name="empName"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>전화번호</Form.Label>
        <Form.Control
          type="text"
          placeholder="전화번호를 입력하세요."
          onChange={changeValue}
          name="empContact"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>직책</Form.Label>
        <Form.Control
          type="text"
          placeholder="직책을 입력하세요."
          onChange={changeValue}
          name="position"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        추가하기
      </Button>
    </Form>
  );
};

export default SaveEmployee;
