import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

import { SoftwareSellerService } from './software-seller.service';

@Injectable()
export class SoftwareSellerRouterActivate implements CanActivate {
    constructor(
        private router: Router,
        public softwareSellerService: SoftwareSellerService
    ) { }

    public isUserSellerTypeSubscription: any;

    canActivate() {
        if (localStorage.getItem("access_token") == null) {
            this.router.navigate(["/account/login/0"]);
            return false;
        } else {
            if (localStorage.getItem("user_type") == null) {
                this.softwareSellerService.getIsSellerUserType();
                this.isUserSellerTypeSubscription = this.softwareSellerService.isUserSellerObservable.subscribe(
                    data => {
                        if (data == true) {
                            return true;
                        } else {
                            this.router.navigate(["/software-buyer"]);
                            return false;
                        }
                    }
                );
            } else {
                if (localStorage.getItem("user_type") == "Seller") {
                    return true;
                } else {
                    this.router.navigate(["/software-buyer"]);
                    return false;
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.isUserSellerTypeSubscription != null) this.isUserSellerTypeSubscription.unsubscribe();
    }
}