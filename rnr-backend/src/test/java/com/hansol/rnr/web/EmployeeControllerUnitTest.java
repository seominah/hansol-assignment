package com.hansol.rnr.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansol.rnr.entity.Employee;
import com.hansol.rnr.service.EmployeeService;
import com.hansol.rnr.service.ProjectService;
import com.hansol.rnr.service.TaskService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// 단위 테스트
@WebMvcTest()
public class EmployeeControllerUnitTest {
    private final Logger logger = LoggerFactory.getLogger(EmployeeControllerUnitTest.class);
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;
    @MockBean
    private ProjectService projectService;
    @MockBean
    private TaskService taskService;

    @Test
    public void saveEmployee_테스트() throws Exception {
        // given
        Employee newEmployee = new Employee();
        newEmployee.setEmpName("홍길동");
        newEmployee.setEmpContact("08-1111-0100");
        newEmployee.setPosition("선임");
        String content = new ObjectMapper().writeValueAsString(newEmployee);
        logger.info(content);
        when(employeeService.saveEmployee(newEmployee)).thenReturn(1);
        // when
        ResultActions resultAction = mockMvc.perform(post("/api/v1/employee")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON));
        // then
        resultAction.andExpect(status().isCreated())
                .andExpect(content().string("1"))
                .andDo(print());
    }

    @Test
    public void findAllEmployee_테스트() throws Exception {
        // given
        Employee employee1 = new Employee();
        employee1.setEmpName("홍길동");
        employee1.setEmpContact("08-1111-0100");
        employee1.setPosition("선임");
        Employee employee2 = new Employee();
        employee2.setEmpName("김철수");
        employee2.setEmpContact("08-1111-0200");
        employee2.setPosition("수석");
        List<Employee> employees = new ArrayList<>();
        employees.add(employee1);
        employees.add(employee2);
        when(employeeService.findAllEmployee()).thenReturn(employees);
        // when
        ResultActions resultAction = mockMvc.perform(
                get("/api/v1/employee")
                        .accept(MediaType.APPLICATION_JSON));
        // then
        resultAction.andExpect(status().isOk())
        .andExpect(jsonPath("$", Matchers.hasSize(2)))
        .andExpect(jsonPath("$.[0].empName").value("홍길동"))
        .andDo(print());
    }


    @Test
    public void findByIdEmployee_테스트() throws Exception {
        // given
        int id = 1;
        Employee newEmployee = new Employee();
        newEmployee.setEmpName("홍길동");
        newEmployee.setEmpContact("08-1111-0100");
        newEmployee.setPosition("선임");
        when(employeeService.findEmployee(id)).thenReturn(newEmployee);

        // when
        ResultActions resultAction = mockMvc.perform(get("/api/v1/employee/{id}", id)
                .accept(MediaType.APPLICATION_JSON));

        // then
        resultAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.empName").value("홍길동"))
                .andDo(print());
    }

    @Test
    public void updateEmployee_테스트() throws Exception {
        // given
        int id = 1;
        Employee employee = new Employee();
        employee.setEmpName("홍길동");
        employee.setEmpContact("08-1111-0100");
        employee.setPosition("선임");
        String content = new ObjectMapper().writeValueAsString(employee);
        when(employeeService.updateEmployee(id, employee)).thenReturn(1);
        // when
        ResultActions resultAction = mockMvc.perform(post("/api/v1/employee/update/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON));
        // then
        resultAction.andExpect(status().isNoContent())
                .andExpect(content().string("1"))
                .andDo(print());

        MvcResult requestResult = resultAction.andReturn();
        String result = requestResult.getResponse().getContentAsString();

        assertEquals("1", result);
    }

    @Test
    public void deleteEmployee_테스트() throws Exception {
        // given
        int id = 1;
        when(employeeService.deleteEmployee(id)).thenReturn(1);
        // when
        ResultActions resultAction = mockMvc.perform(post("/api/v1/employee/delete/{id}", id)
                .accept(MediaType.APPLICATION_JSON));
        // then
        resultAction.andExpect(status().isNoContent())
                .andExpect(content().string("1"))
                .andDo(print());

        MvcResult requestResult = resultAction.andReturn();
        String result = requestResult.getResponse().getContentAsString();

        assertEquals("1", result);
    }
}
