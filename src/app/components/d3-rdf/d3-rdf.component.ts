import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Link, Node } from '../../models/';
import { D3Service } from 'src/app/services/d3/d3.service';
import { D3GraphComponent } from './d3/graph/graph.component';
import { Subscription } from 'rxjs';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui/ui.service';

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

  constructor(private router: Router,
    private uiService: UiService,
    private d3Service: D3Service,
    private globalFunctions: GlobalFunctionsService) {
    this.subscriptions = [];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.options = {
        width: this.graphContent.nativeElement.clientWidth,
        height: this.graphContent.nativeElement.clientHeight
      }
      this.d3Service.getFactoriesCultHistObject().subscribe(data => {
        this.triples = [];
        data.forEach((subject, index) => {
          const keys = Object.keys(subject);
          subject.id = subject.id.replace('https://linkeddata.cultureelerfgoed.nl/cho-kennis/id/', '');
          subject.text = subject.id;
          keys.forEach(predicate => {
            if (predicate !== "id" && predicate !== "geometrieWKT" && predicate !== "omschrijving") {
              let object = {
                text: subject[predicate],
                id: subject.id + subject[predicate]
              }
              this.triples.push([subject, predicate, object]);
            }
          });
          // for now no links between monumenten
          // let object = index == 0 ? data[data.length - 1] : data[index - 1];
          // object.text = object.id;
          // object.id = object.id.replace('https://linkeddata.cultureelerfgoed.nl/cho-kennis/id/', '');
          // this.triples.push([subject, "", object]);
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
    // TODO make entityType Enum
    if (node.entityType === "Rijksmonument") {
      this.uiService.activeRijksmonument.next(node.entity);
      this.router.navigate(['detail']);
    }
  }
}
