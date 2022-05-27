package com.hansol.rnr.service.impl;

import com.hansol.rnr.entity.Company;
import com.hansol.rnr.mapper.CompanyMapper;
import com.hansol.rnr.mapper.EmployeeMapper;
import com.hansol.rnr.mapper.ProjectMapper;
import com.hansol.rnr.mapper.TaskMapper;
import com.hansol.rnr.entity.Task;
import com.hansol.rnr.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {
    private final Logger logger = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskMapper taskMapper;
    private final ProjectMapper projectMapper;
    private final EmployeeMapper employeeMapper;
    private final CompanyMapper companyMapper;

    public int saveTask(Task task) {
        if (projectMapper.selectProjectByCode(task.getPrjCode()) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        if (employeeMapper.selectEmployee(Math.toIntExact(task.getEmpId())) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        int result = taskMapper.insertTask(task);
        List<Company> companyList = new ArrayList<>();
        task.getComName().forEach(s -> {
            companyList.add(new Company(
                    task.getTaskId(),
                    s
            ));
        });
        companyMapper.insertCompanies(companyList);

        if (result < 1) {
            throw new IllegalStateException("R&R 생성에 실패하였습니다. ");
        }
        return result;
    }

    public List<Task> findTaskById(int taskId) {
        List<Task> result = taskMapper.selectTasksByTaskId(taskId);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public List<Task> findTaskByCode(String prjCode) {
        if (projectMapper.selectProjectByCode(prjCode) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        List<Task> result = taskMapper.selectTasksByPrjCode(prjCode);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public List<Task> findAllTask() {
        return taskMapper.selectAllTask();
    }

    public int updateTask(int taskId, Task task) {
        Task taskEntity = taskMapper.selectTaskByTaskId(taskId);
        if (taskEntity == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        taskEntity.setPrjCode(task.getPrjCode() == null ? taskEntity.getPrjCode() : task.getPrjCode());
        taskEntity.setEmpId(task.getEmpId() == null ? taskEntity.getEmpId() : task.getEmpId());
        taskEntity.setType(task.getType() == null ? taskEntity.getType() : task.getType());
        int result = taskMapper.updateTask(taskEntity);

        if (result < 1) {
            throw new IllegalStateException("R&R 수정에 실패하였습니다.");
        }
        return result;
    }

    public int deleteTask(int taskId) {
        List<Task> taskList = taskMapper.selectTasksByTaskId(taskId);
        if (taskList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return taskMapper.deleteTask(taskId);
    }
}
