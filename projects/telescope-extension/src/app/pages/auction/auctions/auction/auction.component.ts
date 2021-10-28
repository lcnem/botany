import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rest } from 'botany-client';
import { InlineResponse2001 } from 'botany-client/esm/openapi';
import { CosmosSDKService } from 'projects/telescope-extension/src/app/models/index';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
})
export class AuctionComponent implements OnInit {
  auctionID$: Observable<string>;
  auction$: Observable<InlineResponse2001>;

  constructor(private route: ActivatedRoute, private cosmosSDK: CosmosSDKService) {
    this.auctionID$ = this.route.params.pipe(map((params) => params.auction_id));
    this.auction$ = combineLatest([this.cosmosSDK.sdk$, this.auctionID$]).pipe(
      mergeMap(([sdk, id]) => rest.botany.auction.auction(sdk.rest, id).then((res) => res.data)),
    );
  }

  ngOnInit(): void {}
}
