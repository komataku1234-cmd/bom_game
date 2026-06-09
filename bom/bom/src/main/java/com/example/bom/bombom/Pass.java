package com.example.bom.bombom;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class Pass {
    @Pattern(regexp = "password",message = "パスワードが違います")
    private String pass;
    public Pass() {}
    public String getPass() {
        return pass;
    }
    public void setPass(String pass) {
    this.pass = pass;
    }
}
