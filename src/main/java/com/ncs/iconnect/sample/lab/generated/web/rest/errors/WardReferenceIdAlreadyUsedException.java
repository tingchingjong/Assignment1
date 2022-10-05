package com.ncs.iconnect.sample.lab.generated.web.rest.errors;

public class WardReferenceIdAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public WardReferenceIdAlreadyUsedException() {
        super(ErrorConstants.WARD_REFERENCE_ID_ALREADY_USED_TYPE, "wardManagement", "wardidexists");
    }
}