/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IconnectSampleAppLabTestModule } from '../../../../test.module';
import { RoleService } from 'app/admin/access-control/role/role.service';
import { RoleDeleteDialogComponent } from 'app/admin/access-control/role/role-delete-dialog.component';
describe('Component Tests', () => {
  describe('Function Management Delete Component', () => {
    let comp: RoleDeleteDialogComponent;
    let fixture: ComponentFixture<RoleDeleteDialogComponent>;
    let service: RoleService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [IconnectSampleAppLabTestModule],
        declarations: [RoleDeleteDialogComponent],
        providers: [RoleService]
      })
        .overrideTemplate(RoleDeleteDialogComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RoleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RoleService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
