package org.sovliv.backend.dto;

public class UpdateTooltipsRequest {
    private Boolean tooltipsEnabled;

    public UpdateTooltipsRequest() {
    }

    public UpdateTooltipsRequest(Boolean tooltipsEnabled) {
        this.tooltipsEnabled = tooltipsEnabled;
    }

    public Boolean getTooltipsEnabled() {
        return tooltipsEnabled;
    }

    public void setTooltipsEnabled(Boolean tooltipsEnabled) {
        this.tooltipsEnabled = tooltipsEnabled;
    }
}










