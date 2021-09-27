import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cosmosclient, proto } from 'cosmos-client';
import { Key } from 'projects/telescope-extension/src/app/models/keys/key.model';

export type IssueCdpOnSubmitEvent = {
  key: Key;
  privateKey: string;
  ownerAddr: cosmosclient.AccAddress;
  denom: string;
  principal: proto.cosmos.base.v1beta1.ICoin;
};

@Component({
  selector: 'view-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit {
  @Input()
  key?: Key | null;

  @Input()
  owner?: string | null;

  @Input()
  denom?: string | null;

  @Input()
  principalDenom?: string | null;

  @Output()
  appSubmit: EventEmitter<IssueCdpOnSubmitEvent>;

  public principal_amount: string;

  constructor() {
    this.appSubmit = new EventEmitter();
    this.principal_amount = '';
  }

  ngOnInit(): void {}

  onSubmit(
    privateKey: string,
    ownerAddr: string,
    collateralDenom: string,
    principalDenom: string,
    principalAmount: string,
  ) {
    this.appSubmit.emit({
      key: this.key!,
      privateKey,
      ownerAddr: cosmosclient.AccAddress.fromString(ownerAddr),
      denom: collateralDenom,
      principal: {
        denom: principalDenom,
        amount: principalAmount,
      },
    });
  }
}
