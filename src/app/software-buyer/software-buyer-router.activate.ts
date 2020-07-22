import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

import { SoftwareBuyerService } from './software-buyer.service';

@Injectable()
export class SoftwareBuyerRouterActivate implements CanActivate {
    constructor(
        private router: Router,
        public softwareBuyerService: SoftwareBuyerService
    ) { }

    public isUserBuyerTypeSubscription: any;

    canActivate() {
        if (localStorage.getItem("access_token") == null) {
            this.router.navigate(["/account/login/0"]);
            return false;
        } else {
            if (localStorage.getItem("user_type") == null) {
                this.softwareBuyerService.getIsBuyerUserType();
                this.isUserBuyerTypeSubscription = this.softwareBuyerService.isUserBuyerObservable.subscribe(
                    data => {
                        if (data == true) {
                            return true;
                        } else {
                            this.router.navigate(["/software-seller"]);
                            return false;
                        }
                    }
                );
            } else {
                if (localStorage.getItem("user_type") == "Buyer") {
                    return true;
                } else {
                    this.router.navigate(["/software-seller"]);
                    return false;
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.isUserBuyerTypeSubscription != null) this.isUserBuyerTypeSubscription.unsubscribe();
    }
}