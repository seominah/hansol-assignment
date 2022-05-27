package com.hansol.rnr.entity;

import lombok.Data;

@Data
public class Employee {
    private Long empId;
    private String empName;
    private String empContact;
    private String position;
    private Long projectId;
}
