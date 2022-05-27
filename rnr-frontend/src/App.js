import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Employee from './Pages/employee/Employee';
import SaveEmployee from './Pages/employee/SaveEmployee';
import UpdateEmployee from './Pages/employee/UpdateEmployee';
import Home from './Pages/Home';
import Project from './Pages/project/Project';
import SaveProject from './Pages/project/SaveProject';
import UpdateProject from './Pages/project/UpdateProject';
import SaveTask from './Pages/task/SaveTask';
import Task from './Pages/task/Task';

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/employee" exact={true} element={<Employee />} />
          <Route
            path="/employee/save"
            exact={true}
            element={<SaveEmployee />}
          />
          <Route
            path="/employee/update/:empId"
            exact={true}
            element={<UpdateEmployee />}
          />
          <Route path="/project" exact={true} element={<Project />} />
          <Route path="/project/save" exact={true} element={<SaveProject />} />
          <Route
            path="/project/update/:prjCode"
            exact={true}
            element={<UpdateProject />}
          />
          <Route path="/task" exact={true} element={<Task />} />
          <Route path="/task/save" exact={true} element={<SaveTask />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
