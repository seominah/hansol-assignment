import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EmployeeList = (props) => {
  const { empId, empName } = props.employee;

  const navigate = useNavigate();
  // const empId = props.match.params.empId;
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

  const deleteEmployee = () => {
    fetch('http://localhost:8080/api/v1/employee/delete/' + empId, {
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
          alert('담당자 삭제에 실패하였습니다.');
        }
      });
  };

  const updateEmployee = () => {
    navigate('/employee/update/' + empId);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={13} md={8}>
            <h5>이름 : {employee.empName}</h5>
            <h5>전화번호 : {employee.empContact}</h5>
            <h5>직급 : {employee.position}</h5>
          </Col>
          <Col xs={6} md={4}>
            <Button onClick={updateEmployee}>수정</Button>{' '}
            <Button variant="danger" onClick={deleteEmployee}>
              삭제
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
  // return (
  //   <Card>
  //     <Card.Body>
  //       <Card.Title>{empName}</Card.Title>
  //       <Link to={'/employee/' + empId} className="btn btn-primary">
  //         상세보기
  //       </Link>
  //     </Card.Body>
  //   </Card>
  // );
};

export default EmployeeList;
