import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IcCodeService } from 'app/ng-iconnect';

import { IBed } from 'app/shared/model/bed.model';
import { IWard } from 'app/shared/model/ward.model';
import { WardService } from '../ward/ward.service';

@Component({
  selector: 'ic-bed-detail',
  templateUrl: './bed-detail.component.html'
})
export class BedDetailComponent implements OnInit {
  bed: IBed | null = null;
  wards?: IWard[];
  wardLocation: String | null;
  wardClassType: String | null;
  tempWards: IWard[];
  constructor(protected wardService: WardService, protected activatedRoute: ActivatedRoute, protected codeService: IcCodeService) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bed }) => (this.bed = bed));
    this.loadWards();
  }
  previousState(): void {
    window.history.back();
  }
  convertTime(epoch: any): String {
    const date = new Date(epoch);
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return `${day}-${month}-${year}`;
  }
  loadWards(): void {
    this.wardService
      .query({
        size: 100
      })
      .subscribe(
        (res: HttpResponse<IWard[]>) => this.onSuccessForWard(res.body, res.headers),
        () => this.onError()
      );
  }
  protected onError(): void {}
  protected onSuccessForWard(data: IBed[] | null, headers: HttpHeaders): void {
    this.wards = data || [];
    this.tempWards = this.wards;
  }
  getWardLocation(wardId: number): String {
    this.tempWards = this.wards.filter(v => v.id === wardId);
    const location = this.tempWards[0].wardLocation;
    if (!this.wardLocation) {
      this.codeService.get('Location', location).subscribe((classType: any) => {
        this.wardLocation = classType.label['en-US'];
        return this.wardLocation;
      });
    }
    return this.wardLocation;
  }
  getWardClassType(wardId: number): String {
    this.tempWards = this.wards.filter(v => v.id === wardId);
    const wardClassType = this.tempWards[0].wardClassType;
    if (!this.wardClassType) {
      this.codeService.get('wardClassType', wardClassType).subscribe((classType: any) => {
        this.wardClassType = classType.label['en-US'];
        return this.wardClassType;
      });
    }
    return this.wardClassType;
  }
}
