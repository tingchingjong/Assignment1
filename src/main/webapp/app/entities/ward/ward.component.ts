import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWard, Ward } from 'app/shared/model/ward.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { WardService } from './ward.service';
import { WardDeleteDialogComponent } from './ward-delete-dialog.component';
import { IBed } from 'app/shared/model/bed.model';
import { BedService } from '../bed/bed.service';

@Component({
  selector: 'ic-ward',
  templateUrl: './ward.component.html'
})
export class WardComponent implements OnInit, OnDestroy {
  searchWard = new Ward();
  wards?: IWard[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  beds?: IBed[];
  tempBeds: IBed[];

  constructor(
    protected wardService: WardService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected bedService: BedService
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.wardService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IWard[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
  search(): void {
    this.load();
  }
  load(): void {
    this.wardService
      .query({
        'wardName.contains': this.searchWard.wardName,
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IWard[]>) => this.onSuccess(res.body, res.headers, this.page),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
      this.loadBeds();
    });
    this.registerChangeInWards();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWard): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWards(): void {
    this.eventSubscriber = this.eventManager.subscribe('wardListModification', () => this.loadPage());
  }

  delete(ward: IWard): void {
    const modalRef = this.modalService.open(WardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ward = ward;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IWard[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/ward'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.wards = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  getNumOfBed(wardId: number): number {
    this.tempBeds = this.beds.filter(v => v.wardId === wardId);

    return this.tempBeds.length;
  }

  loadBeds(page?: number): void {
    const pageToLoad: number = page || this.page;
    this.bedService
      .query({
        page: pageToLoad - 1,
        size: 100,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBed[]>) => this.onSuccessForBed(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
  protected onSuccessForBed(data: IBed[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));

    this.page = page;

    this.router.navigate(['/ward'], {
      queryParams: {
        page: this.page,

        size: this.itemsPerPage,

        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });

    this.beds = data || [];

    this.tempBeds = this.beds;
  }
}
