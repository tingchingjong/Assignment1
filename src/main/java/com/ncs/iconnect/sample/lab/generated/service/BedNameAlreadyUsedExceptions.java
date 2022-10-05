package com.ncs.iconnect.sample.lab.generated.service;

public class BedNameAlreadyUsedExceptions extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public BedNameAlreadyUsedExceptions() {
        super("Bed reference id is already in use!");
    }

}
