package com.hansol.rnr.entity;

import lombok.Data;

@Data
public class Company {
    private Long taskId;
    private String comName;

    public Company(Long taskId, String comName) {
        this.taskId = taskId;
        this.comName = comName;
    }
}
