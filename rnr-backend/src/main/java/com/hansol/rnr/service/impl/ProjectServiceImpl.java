package com.hansol.rnr.service.impl;

import com.hansol.rnr.mapper.ProjectMapper;
import com.hansol.rnr.entity.Project;
import com.hansol.rnr.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectMapper projectMapper;

    public int saveProject(Project project) {
        return projectMapper.insertProject(project);
    }

    public Project findProject(String prjCode) {
        Project result = projectMapper.selectProjectByCode(prjCode);
        if (result == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public List<Project> findAllProject() {
        return projectMapper.selectAllProject();
    }

    public int updateProject(String prjCode, Project projectVo) {
         Project project = projectMapper.selectProjectByCode(prjCode);
         if (project == null) {
             throw new ResponseStatusException(HttpStatus.NOT_FOUND);
         }
         project.setPrjName(
                 projectVo.getPrjName() == null ? project.getPrjName() : projectVo.getPrjName()
         );
         return projectMapper.updateProject(project);
    }

    public int deleteProject(String prjCode) {
        Project project = projectMapper.selectProjectByCode(prjCode);
        if (project == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return projectMapper.deleteProject(project);
    }
}
