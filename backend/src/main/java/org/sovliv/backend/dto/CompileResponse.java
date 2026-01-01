package org.sovliv.backend.dto;

/**
 * @author Vladimir Solovyov
 * @project java-educational-material-site
 * @date on 25/12/2025
 */
public class CompileResponse {
    private String output;
    private String error;

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}


