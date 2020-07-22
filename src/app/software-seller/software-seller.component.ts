import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-software-seller',
  templateUrl: './software-seller.component.html',
  styleUrls: ['./software-seller.component.css']
})
export class SoftwareSellerComponent implements OnInit {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public currentUserName: string = localStorage.getItem('full_name');
  public currentUserType: string = localStorage.getItem('user_type');

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public logOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('username');
    localStorage.removeItem('full_name');
    localStorage.removeItem('user_type');

    setTimeout(() => {
      location.reload();
    }, 500);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

  }

}
