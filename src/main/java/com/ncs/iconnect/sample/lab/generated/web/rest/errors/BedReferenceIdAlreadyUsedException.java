package com.ncs.iconnect.sample.lab.generated.web.rest.errors;

public class BedReferenceIdAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public BedReferenceIdAlreadyUsedException() {
        super(ErrorConstants.BED_REFERENCE_ID_ALREADY_USED_TYPE, "bedManagement", "bedidexists");
    }
}