import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IcCodeService } from 'app/ng-iconnect';
import { IBed } from 'app/shared/model/bed.model';

import { IWard } from 'app/shared/model/ward.model';
import { BedService } from '../bed/bed.service';

@Component({
  selector: 'ic-ward-detail',
  templateUrl: './ward-detail.component.html'
})
export class WardDetailComponent implements OnInit {
  ward: IWard | null = null;
  beds?: IBed[];
  numberBed: number | null = null;
  wardLocation: String | null = null;
  wardClassType: String | null = null;
  tempBeds: any;
  constructor(protected bedService: BedService, protected activatedRoute: ActivatedRoute, protected codeService: IcCodeService) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ward }) => (this.ward = ward));
    this.wardClassType = this.getWardClassType(this.ward.wardClassType);
    this.wardLocation = this.getWardLocation(this.ward.wardLocation);
    this.loadBeds();
  }
  previousState(): void {
    window.history.back();
  }
  getWardClassType(wardClassType: string): String {
    this.codeService.get('wardClassType', wardClassType).subscribe((classType: any) => {
      this.wardClassType = classType.label['en-US'];
      return this.wardClassType;
    });
    return this.wardClassType;
  }
  getWardLocation(wardLocation: string): String {
    this.codeService.get('Location', wardLocation).subscribe((classType: any) => {
      this.wardLocation = classType.label['en-US'];
      return this.wardLocation;
    });
    return this.wardLocation;
  }
  loadBeds(): void {
    this.bedService
      .query({
        size: 100
      })
      .subscribe(
        (res: HttpResponse<IWard[]>) => this.onSuccessForBed(res.body, res.headers),
        () => this.onError()
      );
  }
  getNumOfBed(wardId: number): number {
    this.tempBeds = this.beds.filter(v => v.wardId === wardId);
    return this.tempBeds.length;
  }
  getBed(wardId: number): void {
    this.beds = this.beds.filter(v => v.wardId === wardId);
    /* eslint-disable no-debugger, no-console */
    console.log(this.beds);
  }
  protected onError(): void {}
  protected onSuccessForBed(data: IBed[] | null, headers: HttpHeaders): void {
    this.beds = data || [];
    this.tempBeds = this.beds;
    this.getBed(this.ward.id);
  }
}
