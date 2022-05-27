import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = (props) => {
  const navigate = useNavigate();
  const { empId } = useParams();

  const [employee, setEmployee] = useState({
    empId: '',
    empName: '',
    empContact: '',
    position: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/employee/' + empId)
      .then((res) => res.json())
      .then((res) => {
        setEmployee(res);
      });
  }, []);

  const changeValue = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const submitEmployee = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/employee/update/' + empId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(employee),
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
          navigate('/employee');
        } else {
          alert('담당자 수정에 실패하였습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitEmployee}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="담당자 이름을 입력하세요."
          onChange={changeValue}
          name="empName"
          value={employee.empName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>전화번호</Form.Label>
        <Form.Control
          type="text"
          placeholder="전화번호를 입력하세요."
          onChange={changeValue}
          name="empContact"
          value={employee.empContact}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>직책</Form.Label>
        <Form.Control
          type="text"
          placeholder="직책을 입력하세요."
          onChange={changeValue}
          name="position"
          value={employee.position}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        수정하기
      </Button>
    </Form>
  );
};

export default UpdateEmployee;
