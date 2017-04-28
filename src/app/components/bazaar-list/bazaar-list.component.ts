import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { BazaarService } from '../../services/bazaar.service';

import { Bazaar } from '../../models/bazaar';
import { Book } from '../../models/book';

@Component({
  selector: 'app-bazaar-list',
  templateUrl: './bazaar-list.component.html',
  styleUrls: ['./bazaar-list.component.css']
})
export class BazaarListComponent implements OnInit {

  ads: Bazaar[];

  constructor(private bazaarService: BazaarService,
              private router: Router,
              public dialog: MdDialog) { }
  
  ngOnInit() {
    this.bazaarService.getAllAds().subscribe(
      data => {
        this.ads = data as Bazaar[];
        console.log(this.ads);
      },
      error => {
        console.log('bazaar ' + error);
      }
    );
  }

  openDialog(ad: Bazaar) {
    this.bazaarService.setChosenAd(ad);
    let dialogRef = this.dialog.open(BazaarDialog);
  }
  
}


@Component({
  selector: 'bazaar-dialog',
  templateUrl: './bazaar-dialog.component.html',
  styleUrls: ['./bazaar-dialog.component.css']
})
export class BazaarDialog implements OnInit {

  ad: Bazaar;

  constructor(public dialogRef: MdDialogRef<BazaarDialog>,
              private bazaarService: BazaarService) {}

  ngOnInit() {
    this.ad = this.bazaarService.getChosenAd() as Bazaar;
  }
}