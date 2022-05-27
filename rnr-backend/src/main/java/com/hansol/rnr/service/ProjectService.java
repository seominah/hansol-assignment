package com.hansol.rnr.service;

import com.hansol.rnr.entity.Project;

import java.util.List;

public interface ProjectService {
    int saveProject(Project project);
    Project findProject(String prjCode);
    List<Project> findAllProject();
    int updateProject(String prjCode, Project project);
    int deleteProject(String prjCode);
}
