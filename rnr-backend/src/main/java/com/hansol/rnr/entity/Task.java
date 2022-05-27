package com.hansol.rnr.entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Task {
    private Long taskId;
    private String prjCode = "";
    private Long empId;
    private List<String> comName = new ArrayList<>();
    private String type = "";
    private Project project;
    private Employee employee;
    private Company company;
}
