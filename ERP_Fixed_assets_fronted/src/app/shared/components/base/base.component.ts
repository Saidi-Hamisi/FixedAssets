import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.sass']
})
export class BaseComponent implements OnInit, OnDestroy {
  subject = new Subject<void>()

  constructor() { }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

  ngOnInit(): void {
  }


}
