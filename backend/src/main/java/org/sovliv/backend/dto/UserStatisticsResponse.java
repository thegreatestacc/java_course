package org.sovliv.backend.dto;

public class UserStatisticsResponse {
    private Integer totalTests;
    private Integer completedTests;
    private Double testsPercentage;
    private Integer totalMaterials;
    private Integer completedMaterials;
    private Double materialsPercentage;

    public UserStatisticsResponse() {
    }

    public UserStatisticsResponse(Integer totalTests, Integer completedTests, Double testsPercentage,
                                  Integer totalMaterials, Integer completedMaterials, Double materialsPercentage) {
        this.totalTests = totalTests;
        this.completedTests = completedTests;
        this.testsPercentage = testsPercentage;
        this.totalMaterials = totalMaterials;
        this.completedMaterials = completedMaterials;
        this.materialsPercentage = materialsPercentage;
    }

    public Integer getTotalTests() {
        return totalTests;
    }

    public void setTotalTests(Integer totalTests) {
        this.totalTests = totalTests;
    }

    public Integer getCompletedTests() {
        return completedTests;
    }

    public void setCompletedTests(Integer completedTests) {
        this.completedTests = completedTests;
    }

    public Double getTestsPercentage() {
        return testsPercentage;
    }

    public void setTestsPercentage(Double testsPercentage) {
        this.testsPercentage = testsPercentage;
    }

    public Integer getTotalMaterials() {
        return totalMaterials;
    }

    public void setTotalMaterials(Integer totalMaterials) {
        this.totalMaterials = totalMaterials;
    }

    public Integer getCompletedMaterials() {
        return completedMaterials;
    }

    public void setCompletedMaterials(Integer completedMaterials) {
        this.completedMaterials = completedMaterials;
    }

    public Double getMaterialsPercentage() {
        return materialsPercentage;
    }

    public void setMaterialsPercentage(Double materialsPercentage) {
        this.materialsPercentage = materialsPercentage;
    }
}


