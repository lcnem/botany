import { Injectable } from '@angular/core';
import { BroadcastTxCommitResult, Coin } from 'cosmos-client/api';
import { CdpInfrastructureService } from './cdp.infrastructure.service';
import { Key } from '../keys/key.model';
import { AccAddress } from 'cosmos-client';

export interface ICdpInfrastructure {
  createCDP(
    key: Key,
    privateKey: string,
    collateral: Coin,
    principal: Coin,
  ): Promise<any>;

  drawCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    denom: string,
    principal: Coin,
  ): Promise<any>;
  repayCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    denom: string,
    payment: Coin,
  ): Promise<any>;

  depositCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    collateral: Coin,
  ): Promise<any>;

  withdrawCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    collateral: Coin,
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

  createCDP(
    key: Key,
    privateKey: string,
    collateral: Coin,
    principal: Coin,
  ): Promise<BroadcastTxCommitResult> {
    return this.iCdpInfrastructure.createCDP(
      key,
      privateKey,
      collateral,
      principal,
    );
  }

  drawCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    denom: string,
    principal: Coin,
  ): Promise<BroadcastTxCommitResult> {
    return this.iCdpInfrastructure.drawCDP(
      key,
      privateKey,
      ownerAddr,
      denom,
      principal,
    );
  }

  repayCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    denom: string,
    payment: Coin,
  ): Promise<BroadcastTxCommitResult> {
    return this.iCdpInfrastructure.repayCDP(
      key,
      privateKey,
      ownerAddr,
      denom,
      payment,
    );
  }

  depositCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    collateral: Coin,
  ) {
    return this.iCdpInfrastructure.depositCDP(
      key,
      privateKey,
      ownerAddr,
      collateral,
    );
  }

  withdrawCDP(
    key: Key,
    privateKey: string,
    ownerAddr: AccAddress,
    collateral: Coin,
  ) {
    return this.iCdpInfrastructure.withdrawCDP(
      key,
      privateKey,
      ownerAddr,
      collateral,
    );
  }
}
