package com.hansol.rnr.web;

import com.hansol.rnr.entity.Employee;
import com.hansol.rnr.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        return new ResponseEntity<>(employeeService.saveEmployee(employee), HttpStatus.CREATED);
    }

    @GetMapping("/{empId}")
    public Employee readEmployee(@PathVariable("empId") int empId) {
        return employeeService.findEmployee(empId);
    }

    @GetMapping()
    public List<Employee> readEmployeeAll() {
        return employeeService.findAllEmployee();
    }

    @PostMapping("/update/{empId}")
    public ResponseEntity<?> updateEmployee(@PathVariable("empId") int empId,
                                            @RequestBody Employee employee) {
        return new ResponseEntity<>(employeeService.updateEmployee(empId, employee), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/delete/{empId}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("empId") int empId){
        return new ResponseEntity<>(employeeService.deleteEmployee(empId), HttpStatus.NO_CONTENT);
    }
}
