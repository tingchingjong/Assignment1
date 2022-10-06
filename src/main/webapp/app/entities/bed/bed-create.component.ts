import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBed, Bed } from 'app/shared/model/bed.model';
import { BedService } from './bed.service';
import { IWard } from 'app/shared/model/ward.model';
import { WardService } from 'app/entities/ward/ward.service';

@Component({
  selector: 'ic-bed-create',
  templateUrl: './bed-create.component.html'
})
export class BedCreateComponent implements OnInit {
  isSaving = false;
  wards: IWard[] = [];
  wardAllocationDateDp: any;

  editForm = this.fb.group({
    id: [],
    bedReferenceId: [null, [Validators.required, Validators.maxLength(7), Validators.pattern('BED_(0[1-9]|10)')]],
    bedName: [null, [Validators.maxLength(17)]],
    wardAllocationDate: [null, [Validators.required]],
    wardId: []
  });

  constructor(
    protected bedService: BedService,
    protected wardService: WardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bed }) => {
      this.updateForm(bed);
      this.wardService.query().subscribe((res: HttpResponse<IWard[]>) => {
        this.wards = res.body || [];
        this.wards = this.wards.sort((a, b) => (a.wardName > b.wardName ? 1 : -1));
      });
    });
  }
  updateForm(bed: IBed): void {
    this.editForm.patchValue({
      id: bed.id,
      bedReferenceId: bed.bedReferenceId,
      bedName: bed.bedName,
      wardAllocationDate: bed.wardAllocationDate,
      wardId: bed.wardId
    });
  }

  CreateForm(bed: IBed): void {
    this.editForm.patchValue({
      id: bed.id,
      bedReferenceId: bed.bedReferenceId,
      bedName: bed.bedName,
      wardAllocationDate: bed.wardAllocationDate,
      wardId: bed.wardId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bed = this.createFromForm();
    if (!bed.bedName) {
      bed.bedName = `${this.getWardName(bed.wardId)}_${bed.bedReferenceId}`;
    }
    if (bed.id !== undefined) {
      this.subscribeToSaveResponse(this.bedService.update(bed));
    } else {
      this.subscribeToSaveResponse(this.bedService.create(bed));
    }
  }

  private getWardName(wardId: number): string {
    return this.wards.find(ward => ward.id === wardId).wardName;
  }

  private createFromForm(): IBed {
    return {
      ...new Bed(),
      id: this.editForm.get(['id'])!.value,
      bedReferenceId: this.editForm.get(['bedReferenceId'])!.value,
      bedName: this.editForm.get(['bedName'])!.value,
      wardAllocationDate: this.editForm.get(['wardAllocationDate'])!.value,
      wardId: this.editForm.get(['wardId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBed>>): void {
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

  trackById(index: number, item: IWard): any {
    return item.id;
  }
  convertEpoch(epoch: any): String {
    const date = new Date(epoch);

    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

    return `${day}-${month}-${year}`;
  }
}
