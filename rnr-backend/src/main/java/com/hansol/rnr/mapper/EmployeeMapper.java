package com.hansol.rnr.mapper;

import com.hansol.rnr.entity.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EmployeeMapper {
    int insertEmployee(Employee employee);
    Employee selectEmployee(int empId);
    Employee selectByEmployeeName(@Param("empName") String empName);
    List<Employee> selectAllEmployee();
    int updateEmployee(Employee employee);
    int deleteEmployee(Employee employee);
}
