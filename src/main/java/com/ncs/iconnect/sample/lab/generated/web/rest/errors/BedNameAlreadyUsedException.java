package com.ncs.iconnect.sample.lab.generated.web.rest.errors;

public class BedNameAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public BedNameAlreadyUsedException() {
        super(ErrorConstants.BED_NAME_ALREADY_USED_TYPE, "bedManagement", "bednameexists");
    }
}