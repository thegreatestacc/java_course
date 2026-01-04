package org.sovliv.backend.dto;

import java.io.Serializable;

/**
 * @author Vladimir Solovyov
 * @project java-educational-material-site
 * @date on 25/12/2025
 */
public class CompileResponse implements Serializable {
    private static final long serialVersionUID = 1L;
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


