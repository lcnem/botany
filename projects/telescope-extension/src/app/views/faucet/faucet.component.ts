import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FaucetRequest } from 'projects/telescope-extension/src/app/models/faucets/faucet.model';

export type Amount = {
  amount: number;
  denom: string;
};

@Component({
  selector: 'app-view-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.css'],
})
export class FaucetComponent implements OnInit, OnChanges {
  @Input() hasFaucet?: boolean;
  @Input() denoms?: string[];
  @Input() creditAmount?: number;
  @Input() maxCredit?: number;
  @Input() address?: string;

  @Output() postFaucetRequested: EventEmitter<FaucetRequest> = new EventEmitter<FaucetRequest>();

  amounts: Amount[];

  constructor(private matSnackBar: MatSnackBar) {
    if (this.denoms === undefined || this.denoms.length === 0) {
      this.amounts = [
        {
          amount: 0,
          denom: '',
        },
      ];
    } else {
      this.amounts = this.denoms.map((denom) => ({
        amount: 0,
        denom,
      }));
    }
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.denoms === undefined || this.denoms.length === 0) {
      this.amounts = [
        {
          amount: 0,
          denom: '',
        },
      ];
    } else {
      this.amounts = this.denoms.map((denom) => ({
        amount: 0,
        denom,
      }));
    }
  }

  onPostFaucetRequested(address: string, amounts: Amount[]): void {
    const faucetRequest: FaucetRequest = {
      address,
      coins: amounts.filter((coin) => coin.amount > 0),
    };
    if (faucetRequest.coins.length > 0) {
      this.postFaucetRequested.emit(faucetRequest);
    } else {
      this.matSnackBar.open('No Claims! At least 1 amount must be plus number!', undefined, {
        duration: 6000,
      });
    }
  }
}
