import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import EmployeeList from '../../components/EmployeeList';
import { useNavigate } from 'react-router-dom';

const Employ = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/employee')
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setEmployees(res);
      });
  }, []);

  const saveEmployee = () => {
    navigate('/employee/save');
  };

  return (
    <div>
      <Container className="mt-2">
        <Row>
          <Col md={4}>
            <h1>담당자</h1>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={saveEmployee}>
                추가하기
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      {employees.map((employee) => (
        <EmployeeList key={employee.empId} employee={employee} />
      ))}
    </div>
  );
};

export default Employ;
