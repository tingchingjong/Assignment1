package com.ncs.iconnect.sample.lab.generated.service;

public class WardNameAlreadyUsedExceptions extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public WardNameAlreadyUsedExceptions() {
        super("Ward reference id is already in use!");
    }

}