import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  total: number;
  functieNaam: string;
  selectedValue: string = "fabriek";

  totalUpdate(total: number) {
    this.total = total;
  }
}
