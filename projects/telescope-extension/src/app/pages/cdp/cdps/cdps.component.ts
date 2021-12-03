import { CosmosSDKService, KeyService } from '../../../models/index';
import { Key } from '../../../models/keys/key.model';
import { KeyStoreService } from '../../../models/keys/key.store.service';
import { Component, OnInit } from '@angular/core';
import { cosmosclient } from '@cosmos-client/core';
import { rest } from 'botany-client';
import { InlineResponse2004Cdp1 } from 'botany-client/esm/openapi';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-cdps',
  templateUrl: './cdps.component.html',
  styleUrls: ['./cdps.component.css'],
})
export class CdpsComponent implements OnInit {
  cdps$: Observable<InlineResponse2004Cdp1[]>;

  constructor(
    private readonly key: KeyService,
    private readonly keyStore: KeyStoreService,
    private readonly cosmosSdk: CosmosSDKService,
  ) {
    const key$ = this.keyStore.currentKey$.asObservable();
    const address$ = key$.pipe(
      filter((key: Key | undefined): key is Key => key !== undefined),
      map((key: Key) =>
        cosmosclient.AccAddress.fromPublicKey(this.key.getPubKey(key.type, key.public_key)),
      ),
    );

    const collateralTypes$ = this.cosmosSdk.sdk$.pipe(
      mergeMap((sdk) => rest.botany.cdp.params(sdk.rest)),
      map((res) => res.data?.params?.collateral_params?.map((p) => p.type!) || []),
    );
    this.cdps$ = combineLatest([address$, collateralTypes$, this.cosmosSdk.sdk$]).pipe(
      mergeMap(([address, collateralTypes, sdk]) =>
        Promise.all(
          collateralTypes.map((collateralType) =>
            rest.botany.cdp.cdp(sdk.rest, address, collateralType),
          ),
        ),
      ),
      map((result) => result.map((res) => res.data)),
      map((data) => data.map((e) => e.cdp!)),
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
    );
  }

  ngOnInit(): void {}
}
