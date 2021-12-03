import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cosmosclient, proto } from '@cosmos-client/core';
import { Key } from 'projects/telescope-extension/src/app/models/keys/key.model';

export type ClearCdpOnSubmitEvent = {
  key: Key;
  privateKey: string;
  ownerAddr: cosmosclient.AccAddress;
  collateralType: string;
  payment: proto.cosmos.base.v1beta1.ICoin;
};

@Component({
  selector: 'view-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.css'],
})
export class ClearComponent implements OnInit {
  @Input()
  key?: Key | null;

  @Input()
  owner?: string | null;

  @Input()
  collateralType?: string | null;

  @Input()
  denom?: string | null;

  @Input()
  paymentDenom?: string | null;

  @Output()
  appSubmit: EventEmitter<ClearCdpOnSubmitEvent>;

  public payment_amount: string;

  constructor() {
    this.appSubmit = new EventEmitter();
    this.payment_amount = '';
  }

  ngOnInit(): void {}

  onSubmit(
    privateKey: string,
    ownerAddr: string,
    collateralType: string,
    paymentDenom: string,
    paymentAmount: string,
  ) {
    this.appSubmit.emit({
      key: this.key!,
      privateKey,
      ownerAddr: cosmosclient.AccAddress.fromString(ownerAddr),
      collateralType: collateralType,
      payment: {
        denom: paymentDenom,
        amount: paymentAmount,
      },
    });
  }
}
