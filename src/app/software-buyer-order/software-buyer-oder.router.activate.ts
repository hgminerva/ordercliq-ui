import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, ParamMap, } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { CreateOrderService } from './create-order/create-order.service';

@Injectable()
export class SoftwareBuyerOrderRouterActivate implements CanActivate {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public createOrderService: CreateOrderService,
        private titleService: Title,
        private metaService: Meta
    ) { }

    public productDetailSubscription: any;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let productId = route.paramMap.get('productId');
        if (parseInt(productId) != 0) {
            return new Observable<boolean>((observer) => {
                this.createOrderService.detaiProduct(parseInt(productId));
                this.productDetailSubscription = this.createOrderService.detailProductObservable.subscribe(
                    data => {
                        if (data != null) {
                            this.titleService.setTitle(data.ProductDescription);
                            this.metaService.updateTag({ property: 'og:title', content: data.ProductDescription });
                            this.metaService.updateTag({ property: 'og:description', content: data.Particulars });
                            this.metaService.updateTag({ property: 'og:url', content: 'https://www.ordercliq.com/software-buyer-order/create-order/' + productId });
                            this.metaService.updateTag({ property: 'og:image', content: data.ImageURL });
                        }

                        observer.next(true);
                        observer.complete();
                    }
                );
            });
        } else {
            return true;
        }
    }

    ngOnDestroy() {
        if (this.productDetailSubscription != null) this.productDetailSubscription.unsubscribe();
    }
}
