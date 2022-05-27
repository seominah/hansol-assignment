import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../../components/ProjectList';

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/project')
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setProjects(res);
      });
  }, []);

  const saveProject = () => {
    navigate('/project/save');
  };

  return (
    <div>
      <Container className="mt-2">
        <Row>
          <Col md={4}>
            <h1>업무</h1>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={saveProject}>
                추가하기
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      {projects.map((project) => (
        <ProjectList key={project.prjId} project={project} />
      ))}
    </div>
  );
};

export default Project;
