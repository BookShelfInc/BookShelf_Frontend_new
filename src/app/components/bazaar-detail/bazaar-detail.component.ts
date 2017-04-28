import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { BazaarService } from '../../services/bazaar.service';

import { Bazaar } from '../../models/bazaar';

@Component({
  selector: 'app-bazaar-detail',
  templateUrl: './bazaar-detail.component.html',
  styleUrls: ['./bazaar-detail.component.css']
})
export class BazaarDetailComponent implements OnInit {

  ad: Bazaar;

  constructor(private _route: ActivatedRoute,
              private bazaarService: BazaarService,
              private _router: Router) { }

  ngOnInit() {
    this._route.params
            .switchMap((params: Params) => this.bazaarService.getAd(+params['id'])).subscribe(
                    data => {
                        this.ad = data as Bazaar;
                        console.log(this.ad);
                    },
                    error => {
                        console.log(error);
                    }
            );
  }

}
