package com.hansol.rnr.mapper;

import com.hansol.rnr.entity.Project;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProjectMapper {
    int insertProject(Project project);
    Project selectProjectByCode(@Param("prjCode") String prjCode);
    List<Project> selectAllProject();
    int updateProject(Project project);
    int deleteProject(Project project);
}
