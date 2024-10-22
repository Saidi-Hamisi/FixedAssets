import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { LeaseService } from '../../_services/leases.service';

@Component({
  selector: 'app-lessor-details',
  templateUrl: './lessor-details.component.html',
  styleUrls: ['./lessor-details.component.sass']
})
export class LessorDetailsComponent implements OnInit, OnDestroy {

  loading = true;
  lessorData: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    private leaseService: LeaseService,

  ) {
    this.lessorData = this.router.getCurrentNavigation().extras.queryParams.lessorData;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.loading = false
  }
}
