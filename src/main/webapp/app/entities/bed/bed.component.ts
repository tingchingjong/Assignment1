import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Bed, IBed } from 'app/shared/model/bed.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BedService } from './bed.service';
import { BedDeleteDialogComponent } from './bed-delete-dialog.component';

@Component({
  selector: 'ic-bed',
  templateUrl: './bed.component.html'
})
export class BedComponent implements OnInit, OnDestroy {
  beds?: IBed[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  searchBed = new Bed();

  constructor(
    protected bedService: BedService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.bedService
      .query({
        page: pageToLoad - 1,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBed[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    });
    this.registerChangeInBeds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBed): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBeds(): void {
    this.eventSubscriber = this.eventManager.subscribe('bedListModification', () => this.loadPage());
  }

  delete(bed: IBed): void {
    const modalRef = this.modalService.open(BedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bed = bed;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IBed[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/bed'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.beds = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  search(): void {
    this.load();
  }

  load(): void {
    this.bedService
      .query({
        'bedName.contains': this.searchBed.bedName,
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })

      .subscribe(
        (res: HttpResponse<IBed[]>) => this.onSuccess(res.body, res.headers, this.page),

        () => this.onError()
      );
  }
}
