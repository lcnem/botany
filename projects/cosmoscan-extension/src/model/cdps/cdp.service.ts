import { Injectable } from '@angular/core';
import { Coin } from 'cosmos-client/api';
import { CdpInfrastructureService } from './cdp.infrastructure.service';
import { Key } from '../keys/key.model';

export interface ICdpInfrastructure {
  createCDP(
    key: Key,
    privateKey: string,
    collateral: Coin,
    principal: Coin,
  ): Promise<any>;
}

@Injectable({
  providedIn: 'root',
})
export class CdpService {
  private readonly iCdpInfrastructure: ICdpInfrastructure;
  constructor(readonly cdpInfrastructure: CdpInfrastructureService) {
    this.iCdpInfrastructure = cdpInfrastructure;
  }

  createCDP(key: Key, privateKey: string, collateral: Coin, principal: Coin) {
    this.iCdpInfrastructure.createCDP(key, privateKey, collateral, principal);
  }
}
