import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-software-buyer-order',
  templateUrl: './software-buyer-order.component.html',
  styleUrls: ['./software-buyer-order.component.css']
})
export class SoftwareBuyerOrderComponent implements OnInit {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

  }
}
