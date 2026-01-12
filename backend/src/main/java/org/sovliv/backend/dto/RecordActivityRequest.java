package org.sovliv.backend.dto;

public class RecordActivityRequest {
    private Integer tasksCompleted;
    private String date; // ISO format: YYYY-MM-DD

    public RecordActivityRequest() {
    }

    public RecordActivityRequest(Integer tasksCompleted, String date) {
        this.tasksCompleted = tasksCompleted;
        this.date = date;
    }

    public Integer getTasksCompleted() {
        return tasksCompleted;
    }

    public void setTasksCompleted(Integer tasksCompleted) {
        this.tasksCompleted = tasksCompleted;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}







