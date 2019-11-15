import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Link, Node } from '../../models/';
import { D3Service } from 'src/app/services/d3/d3.service';
import { D3GraphComponent } from './d3/graph/graph.component';
import { Subscription } from 'rxjs';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';

@Component({
  selector: 'app-d3-rdf',
  templateUrl: './d3-rdf.component.html',
  styleUrls: ['./d3-rdf.component.scss'],
})
export class D3RdfComponent implements AfterViewInit {
  @ViewChild(D3GraphComponent, { static: false }) d3Graph: D3GraphComponent;
  @ViewChild('graphContent', { read: ElementRef, static: false }) graphContent: ElementRef;

  options: { width, height } = { width: window.innerWidth, height: window.innerHeight };
  nodes: Node[] = [];
  links: Link[] = [];
  subscriptions: Subscription[];
  triples: Array<any>;

  constructor(private d3Service: D3Service,
    private globalFunctions: GlobalFunctionsService) {
    this.subscriptions = [];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.options = {
        width: this.graphContent.nativeElement.clientWidth,
        height: this.graphContent.nativeElement.clientHeight
      }
      this.d3Service.getFactories().subscribe(data => {
        this.triples = [];
        data.forEach((element, index) => {
          this.triples.push([element.huidigeNaam, "" , index == 0 ? data[data.length-1].huidigeNaam : data[index-1].huidigeNaam]);
        });
        let nodesAndLinks = this.d3Service.createD3(this.triples);
        this.nodes = nodesAndLinks.nodes;
        this.links = nodesAndLinks.links;
        this.d3Graph.initGraph(this.nodes, this.links);
      });
      window.onresize = () => {
        setTimeout(() => {
          this.globalFunctions.detectScreenSize();
          const width = this.graphContent.nativeElement.clientWidth;
          const height = this.graphContent.nativeElement.clientHeight;
          if (width === 0 || height === 0) {
            return;
          }
          this.options = {
            width: width,
            height: height
          }
          this.d3Graph.updateGraph();
        }, 100);
      }
      this.globalFunctions.detectScreenSize();
    }, 100);
  }
  nodeClicked(node) {
    console.log(node)
  }
}
