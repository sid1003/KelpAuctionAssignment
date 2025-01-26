import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bid-input',
  templateUrl: './bid-input.component.html',
  styleUrls: ['./bid-input.component.css']
})
export class BidInputComponent {

  newBid: number = 0;
  @Output() bidPlaced = new EventEmitter<number>();

  placeBid() {
    if (this.newBid > 0) {
      this.bidPlaced.emit(this.newBid);
    } else {
      alert('Bid must be greater than 0');
    }
  }

}
