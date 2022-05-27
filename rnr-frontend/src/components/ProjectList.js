import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectList = (props) => {
  const { prjId, prjCode, prjName } = props.project;

  const navigate = useNavigate();
  // const empId = props.match.params.empId;
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

  const deleteProject = () => {
    fetch('http://localhost:8080/api/v1/project/delete/' + prjCode, {
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
          alert('업무 삭제에 실패하였습니다.');
        }
      });
  };

  const updateProject = () => {
    navigate('/project/update/' + prjCode);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={13} md={8}>
            <h5>업무코드 : {project.prjCode}</h5>
            <h5>업무명 : {project.prjName}</h5>
          </Col>
          <Col xs={6} md={4}>
            <Button onClick={updateProject}>수정</Button>{' '}
            <Button variant="danger" onClick={deleteProject}>
              삭제
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProjectList;
