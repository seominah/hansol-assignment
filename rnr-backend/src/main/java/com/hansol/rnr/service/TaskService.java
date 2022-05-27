package com.hansol.rnr.service;

import com.hansol.rnr.entity.Task;

import java.util.List;

public interface TaskService {
    int saveTask(Task task);
    List<Task> findTaskById(int taskId);
    List<Task> findTaskByCode(String prjCode);
    List<Task> findAllTask();
    int updateTask(int taskId, Task task);
    int deleteTask(int taskId);
}
