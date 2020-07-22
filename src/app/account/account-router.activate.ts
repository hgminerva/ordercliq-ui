import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

import { AccountService } from './account.service';

@Injectable()
export class AccountRouterActivate implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    public userTypeSubscription: any;

    canActivate() {
        if (localStorage.getItem("access_token") != null) {
            if (localStorage.getItem("user_type") == null) {
                this.accountService.getUserType();
                this.userTypeSubscription = this.accountService.userTypeObservable.subscribe(
                    data => {
                        switch (data) {
                            case "Seller": {
                                this.router.navigate(["/software-seller"]);
                                return false;
                            }
                            case "Buyer": {
                                this.router.navigate(["/software-buyer"]);
                                return false;
                            }
                            default: {
                                return true;
                            }
                        }
                    }
                );
            } else {
                switch (localStorage.getItem("user_type")) {
                    case "Seller": {
                        this.router.navigate(["/software-seller"]);
                        return false;
                    }
                    case "Buyer": {
                        this.router.navigate(["/software-buyer"]);
                        return false;
                    }
                    default: {
                        return true;
                    }
                }
            }
        } else {
            return true;
        }
    }
}