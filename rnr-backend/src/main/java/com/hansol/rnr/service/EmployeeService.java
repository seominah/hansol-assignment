package com.hansol.rnr.service;

import com.hansol.rnr.entity.Employee;

import java.util.List;

public interface EmployeeService {
    int saveEmployee(Employee employee);
    Employee findEmployee(int empId);
    List<Employee> findAllEmployee();
    int updateEmployee(int empId, Employee employee);
    int deleteEmployee(int empId);
}
