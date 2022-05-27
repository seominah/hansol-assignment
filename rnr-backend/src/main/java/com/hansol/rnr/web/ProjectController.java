package com.hansol.rnr.web;

import com.hansol.rnr.entity.Project;
import com.hansol.rnr.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        return new ResponseEntity<>(projectService.saveProject(project), HttpStatus.CREATED);
    }

    @GetMapping("/{prjCode}")
    public Project findProject(@PathVariable("prjCode") String prjCode) {
        return projectService.findProject(prjCode);
    }

    @GetMapping
    public List<Project> findAllProject() {
        return projectService.findAllProject();
    }

    @PostMapping("/update/{prjCode}")
    public ResponseEntity<?> updateProject(@PathVariable("prjCode") String prjCode,
                                           @RequestBody Project project) {

        return new ResponseEntity<>(projectService.updateProject(prjCode, project), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/delete/{prjCode}")
    public ResponseEntity<?> deleteProject(@PathVariable("prjCode") String prjCode) {
        return new ResponseEntity<>(projectService.deleteProject(prjCode), HttpStatus.NO_CONTENT);
    }
}
