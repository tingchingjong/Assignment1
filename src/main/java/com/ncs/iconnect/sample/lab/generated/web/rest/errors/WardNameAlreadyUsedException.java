package com.ncs.iconnect.sample.lab.generated.web.rest.errors;

public class WardNameAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public WardNameAlreadyUsedException() {
        super(ErrorConstants.WARD_NAME_ALREADY_USED_TYPE, "wardManagement", "wardnameexists");
    }
}