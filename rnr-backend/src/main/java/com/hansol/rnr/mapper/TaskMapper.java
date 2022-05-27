package com.hansol.rnr.mapper;

import com.hansol.rnr.entity.Task;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import java.util.List;

@Mapper
public interface TaskMapper {
    int insertTask(Task task);
    Task selectTaskByTaskId(int taskId);
    List<Task> selectTasksByTaskId(int taskId);
    List<Task> selectTasksByPrjCode(@Param("prjCode") String prjCode);
    @ResultMap("Task")
    List<Task> selectAllTask();
    int updateTask(Task task);
    int deleteTask(int taskId);
}
