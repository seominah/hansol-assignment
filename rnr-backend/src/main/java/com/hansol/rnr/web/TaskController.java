package com.hansol.rnr.web;

import com.hansol.rnr.entity.Task;
import com.hansol.rnr.service.TaskService;
import com.hansol.rnr.service.impl.TaskServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/task")
public class TaskController {
    private final Logger logger = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskService taskService;


    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) throws Exception {
        logger.info("뭐가 넘어왔는지 궁금하지 ?" + task.toString());
        return new ResponseEntity<>(taskService.saveTask(task), HttpStatus.CREATED);
    }

    @GetMapping("/find/{taskId}")
    public ResponseEntity<List<Task>> readTaskById(@PathVariable("taskId") int taskId) {
        return new ResponseEntity<>(taskService.findTaskById(taskId), HttpStatus.OK);
    }

    @GetMapping("/{prjCode}")
    public ResponseEntity<List<Task>> readTaskByCode(@PathVariable("prjCode") String prjCode) {
        return ResponseEntity.ok(taskService.findTaskByCode(prjCode));
    }

    @GetMapping
    public ResponseEntity<List<Task>> readAllTask() {
        return ResponseEntity.ok(taskService.findAllTask());
    }

    @PostMapping("/update/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable("taskId") int taskId,
                                        @RequestBody Task task) {
        return new ResponseEntity<>(taskService.updateTask(taskId, task), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable("taskId") int taskId) {
        return new ResponseEntity<>(taskService.deleteTask(taskId), HttpStatus.NO_CONTENT);
    }
}
