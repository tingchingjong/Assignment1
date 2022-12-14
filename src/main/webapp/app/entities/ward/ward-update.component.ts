import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWard, Ward } from 'app/shared/model/ward.model';
import { WardService } from './ward.service';
import { CodeView, IcCodeService } from 'app/ng-iconnect';

@Component({
  selector: 'ic-ward-update',
  templateUrl: './ward-update.component.html'
})
export class WardUpdateComponent implements OnInit {
  public wardClassTypeDatas: CodeView[] = [];
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    wardReferenceId: [null, [Validators.maxLength(7), Validators.pattern('WARD_(0[1-9]|10)')]],
    wardName: [null, [Validators.maxLength(10)]],
    wardClassType: [null, [Validators.required]],
    wardLocation: [null, [Validators.required]]
  });

  constructor(
    protected wardService: WardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected codeService: IcCodeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ward }) => {
      this.updateForm(ward);
    });

    this.codeService.gets('wardclasstype').subscribe((datas: any[]) => {
      this.wardClassTypeDatas = datas[0];
    });
  }

  updateForm(ward: IWard): void {
    this.editForm.patchValue({
      id: ward.id,
      wardReferenceId: ward.wardReferenceId,
      wardName: ward.wardName,
      wardClassType: ward.wardClassType,
      wardLocation: ward.wardLocation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ward = this.createFromForm();
    if (ward.id !== undefined) {
      this.subscribeToSaveResponse(this.wardService.update(ward));
    } else {
      this.subscribeToSaveResponse(this.wardService.create(ward));
    }
  }

  private createFromForm(): IWard {
    return {
      ...new Ward(),
      id: this.editForm.get(['id'])!.value,
      wardReferenceId: this.editForm.get(['wardReferenceId'])!.value,
      wardName: this.editForm.get(['wardName'])!.value,
      wardClassType: this.editForm.get(['wardClassType'])!.value,
      wardLocation: this.editForm.get(['wardLocation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWard>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
