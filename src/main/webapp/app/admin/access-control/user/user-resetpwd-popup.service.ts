import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class UserResetpwdPopupService {
  private ngbModalRef: NgbModalRef | null;

  constructor(private modalService: NgbModal, private router: Router) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: string | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>(resolve => {
      if (this.ngbModalRef) {
        resolve(this.ngbModalRef);
      }
      if (id) {
        setTimeout(() => {
          this.ngbModalRef = this.userModalRef(component, id);
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  userModalRef(component: Component, loginName: string): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.loginName = loginName;
    modalRef.result.then(
      () => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      },
      () => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      }
    );
    return modalRef;
  }
}
