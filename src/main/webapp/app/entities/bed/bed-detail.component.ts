import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBed } from 'app/shared/model/bed.model';
import { IWard } from 'app/shared/model/ward.model';

@Component({
  selector: 'ic-bed-detail',
  templateUrl: './bed-detail.component.html'
})
export class BedDetailComponent implements OnInit {
  bed: IBed | null = null;
  wards?: IWard[];
  tempWard: IWard[];
  tempWardTypeClass: string;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bed }) => (this.bed = bed));
  }

  previousState(): void {
    window.history.back();
  }
  getWardTypeClass(wardName: string): string {
    this.tempWard = this.wards.filter(v => v.wardName === wardName);

    this.tempWardTypeClass = this.tempWard.find(v => v.wardClassType).toString();

    return this.tempWardTypeClass;
  }
}
