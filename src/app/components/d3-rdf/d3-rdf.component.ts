import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Link, Node } from '../../models/';
import { D3Service } from 'src/app/services/d3/d3.service';
import { D3GraphComponent } from './d3/graph/graph.component';
import { Subscription } from 'rxjs';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui/ui.service';
import { SearchService } from 'src/app/services/search/search.service';
import { APP_CONFIG } from 'src/app/app.config';

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
  cultHistObj: any;
  cultHistObjEvents: Array<any>;

  constructor(private router: Router,
    private uiService: UiService,
    private d3Service: D3Service,
    private searchService: SearchService,
    private globalFunctions: GlobalFunctionsService) {
    this.subscriptions = [];
    this.cultHistObjEvents = [];
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
          subject.uri = subject.id;
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
      this.cultHistObj = node;
      this.cultHistObjEvents = [];
      console.log(node)
      const query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      SELECT * WHERE {
        ?gebeurtenis ceo:heeftBetrekkingOp <${node.entity.uri}> .
        ?gebeurtenis rdf:type ?typeNaam .
        FILTER (?typeNaam = ceo:Gebeurtenis) .
        ?gebeurtenis ceo:heeftGebeurtenisNaam ?gebeurtenisNaamObject .
        ?gebeurtenisNaamObject skos:prefLabel ?gebeurtenisNaam .
        
        ?gebeurtenis ceo:heeftDatering  ?datering .
        ?datering ceo:heeftTijdvak  ?tijdvak .
        ?tijdvak ceo:startdatum  ?startdatum .
      #  OPTIONAL {?gebeurtenis ceo:heeftDatering  ?datering .
      #  ?datering ceo:heeftTijdvak  ?tijdvak .
      #  ?tijdvak ceo:startdatum  ?startdatum .} .
      } 
      `;
      this.searchService.postRCEQuery(query).subscribe(data => {
        console.log(data);
        data.results.bindings.forEach(event => {
          const node = new Node(
            {
              id: event.datering.value,
              uri: event.datering.value,
              fill: APP_CONFIG.COLORS.WHITE,
              stroke: APP_CONFIG.COLORS.RED,
              textColor: APP_CONFIG.COLORS.ORANGE,
              entity: event,
              text: `${event.startdatum.value}: ${event.gebeurtenisNaam.value}`,
              entityType: "Event"
            }
          )
          this.cultHistObjEvents.push(node);
        });
      });
      // this.uiService.activeRijksmonument.next(node.entity);
      // this.router.navigate(['detail']);
    }
  }
}
