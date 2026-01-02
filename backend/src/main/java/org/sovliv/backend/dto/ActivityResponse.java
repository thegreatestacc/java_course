package org.sovliv.backend.dto;

import java.util.List;

public class ActivityResponse {
    private List<ActivityDay> activities;

    public ActivityResponse() {
    }

    public ActivityResponse(List<ActivityDay> activities) {
        this.activities = activities;
    }

    public List<ActivityDay> getActivities() {
        return activities;
    }

    public void setActivities(List<ActivityDay> activities) {
        this.activities = activities;
    }

    public static class ActivityDay {
        private String date;
        private Integer count;

        public ActivityDay() {
        }

        public ActivityDay(String date, Integer count) {
            this.date = date;
            this.count = count;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }
    }
}


