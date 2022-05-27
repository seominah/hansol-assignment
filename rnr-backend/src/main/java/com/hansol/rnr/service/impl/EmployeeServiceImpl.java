package com.hansol.rnr.service.impl;

import com.hansol.rnr.mapper.EmployeeMapper;
import com.hansol.rnr.entity.Employee;
import com.hansol.rnr.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeMapper employeeMapper;

    public int saveEmployee(Employee employee) {
        if (employeeMapper.selectByEmployeeName(employee.getEmpName()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return employeeMapper.insertEmployee(employee);
    }

    public Employee findEmployee(int empId) {
        Employee result = employeeMapper.selectEmployee(empId);
        if (result == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public List<Employee> findAllEmployee() {
        return employeeMapper.selectAllEmployee();
    }

    public int updateEmployee(int empId, Employee employeeVo) {
        Employee employee = employeeMapper.selectEmployee(empId);
        if (employee == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        employee.setEmpContact(
                employeeVo.getEmpContact() == null ? employee.getEmpContact() : employeeVo.getEmpContact()
        );
        employee.setPosition(
                employee.getPosition() == null ? employee.getPosition() : employeeVo.getPosition()
        );

       return employeeMapper.updateEmployee(employee);
    }

    public int deleteEmployee(int empId) {
        Employee employee = employeeMapper.selectEmployee(empId);
        if (employee == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return employeeMapper.deleteEmployee(employee);
    }
}
