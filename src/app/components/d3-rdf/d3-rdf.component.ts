import { Component, OnInit } from '@angular/core';
import { D3Service } from 'src/app/services/d3/d3.service';

@Component({
  selector: 'app-d3-rdf',
  templateUrl: './d3-rdf.component.html',
  styleUrls: ['./d3-rdf.component.scss'],
})
export class D3RdfComponent {

  constructor(private d3Service: D3Service) {
    this.d3Service.getFactories().subscribe(data => {
      console.log(data);
    });
  }
}
