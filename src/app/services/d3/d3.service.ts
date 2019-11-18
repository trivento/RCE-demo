import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ForceDirectedGraph, Link, Node } from '../../models';
import { APP_CONFIG } from 'src/app/app.config';
import { RdfResult } from '../search/search.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */

  constructor(private http: HttpClient) { }

  public getSubject(subject): Observable<RdfResult> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'X-Api-Key': `${environment.token}`
    });

    return this.http.post<RdfResult>(`${environment.backendApiUrl}`, `query=PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT * WHERE {
      <${subject}> ?pred ?obj .
    } `, {
      headers: headers,
      responseType: "json"
    }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getFactoriesCultHistObject() {
    const query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
    SELECT ?id ?functieNaam ?huidigeNaam  ?omschrijving ?geometrieWKT WHERE {
      ?sub ceo:heeftFunctieNaam ?obj_functie .
      ?obj_functie <http://www.w3.org/2004/02/skos/core#prefLabel> ?functieNaam
      FILTER CONTAINS(?functieNaam, "fabriek")
      #cultureelHistorischObject
      ?sub ceo:heeftBetrekkingOp ?id .
      #huidigeNaam
      ?id ceo:heeftNaam ?naam_obj .
      ?id ceo:heeftKennisregistratie ?kennisRegistratie .
      ?kennisRegistratie rdf:type ?type .
      FILTER (?type = ceo:Naam) .
      ?kennisRegistratie ceo:naam ?huidigeNaam .
      #omschrijving
      ?id ceo:heeftOmschrijving ?heeftOmschrijving .
      ?heeftOmschrijving ceo:omschrijving ?omschrijving .
      #locatie
      ?id ceo:heeftGeometrie ?geometrie .
      ?geometrie <http://www.opengis.net/ont/geosparql#asWKT> ?geometrieWKT .
    }`;
    // const query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    // PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    // PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
    // PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    // SELECT ?id ?functieNaam ?huidigeNaam  ?omschrijving ?geometrieWKT ?gebeurtenis ?gebeurtenisNaam ?startdatum WHERE {
    //   ?sub ceo:heeftFunctieNaam ?obj_functie .
    //   ?obj_functie <http://www.w3.org/2004/02/skos/core#prefLabel> ?functieNaam
    //   FILTER CONTAINS(?functieNaam, "fabriek")
    //   #cultureelHistorischObject
    //   ?sub ceo:heeftBetrekkingOp ?id .
    //   #huidigeNaam
    //   ?id ceo:heeftNaam ?naam_obj .
    //   ?id ceo:heeftKennisregistratie ?kennisRegistratie .
    //   ?kennisRegistratie rdf:type ?type .
    //   FILTER (?type = ceo:Naam) .
    //   ?kennisRegistratie ceo:naam ?huidigeNaam .
    //   #omschrijving
    //   ?id ceo:heeftOmschrijving ?heeftOmschrijving .
    //   ?heeftOmschrijving ceo:omschrijving ?omschrijving .
    //   #locatie
    //   ?id ceo:heeftGeometrie ?geometrie .
    //   ?geometrie <http://www.opengis.net/ont/geosparql#asWKT> ?geometrieWKT .
    //   OPTIONAL { 
    //       ?gebeurtenis ceo:heeftBetrekkingOp ?id .
    //       OPTIONAL {
    //         ?gebeurtenis rdf:type ?typeNaam .
    //         FILTER (?typeNaam = ceo:Gebeurtenis) .
    //         ?gebeurtenis ceo:heeftGebeurtenisNaam ?gebeurtenisNaamObject .
    //         ?gebeurtenisNaamObject skos:prefLabel ?gebeurtenisNaam .
            
    //         ?gebeurtenis ceo:heeftDatering  ?datering .
    //         ?datering ceo:heeftTijdvak  ?tijdvak .
    //         ?tijdvak ceo:startdatum  ?startdatum .
    //       }
    //     }
    // }`;

    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'X-Api-Key': `${environment.token}`
    });

    return this.http.post<RdfResult>(`${environment.backendApiUrl}`, `query=${query}`, {
      headers: headers,
      responseType: "json"
    }).pipe(
      map((rdfResult) => {
        return rdfResult.results.bindings.map(item => {
          let retVal: any = {};
          rdfResult.head.vars.forEach(variable => {
             //@ts-ignore
            if(item[variable]) {
               //@ts-ignore
              retVal[variable] = item[variable].value;
            }
          });
          return retVal;
        });
      })
    );
  }

  createD3(triples: Array<any>) {
    let nodes: Node[] = [];
    let links: Link[] = [];

    triples.forEach(triple => {
      //subject
      if (!nodes.find(node => {
        return node.id == triple[0].id;
      })) {
        nodes.push(new Node({
          id: triple[0].id,
          uri: triple[0].uri,
          fill: APP_CONFIG.COLORS.RED,
          stroke: APP_CONFIG.COLORS.RED,
          textColor: APP_CONFIG.COLORS.BLUE,
          entity: triple[0],
          text: triple[0].text,
          entityType: "Rijksmonument"
        }))
      }
      //predicate 
      links.push(new Link(triple[0].id, triple[2].id, triple[1]));

      //object
      if (!nodes.find(node => {
        return node.id == triple[2].id;
      })) {
        nodes.push(new Node({
          id: triple[2].id,
          uri: triple[2].uri,
          fill: APP_CONFIG.COLORS.ORANGE,
          stroke: APP_CONFIG.COLORS.ORANGE,
          textColor: APP_CONFIG.COLORS.BLUE,
          entity: triple[2],
          text: triple[2].text,
          entityType: ""
        }))
      }
    });
    return { nodes: nodes, links: links };
  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      const transform = d3.event.transform;
      container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
    }

    zoom = d3.zoom().on("zoom", zoomed);
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    function started() {
      /** Preventing propagation of dragstart to parent elements */
      d3.event.sourceEvent.stopPropagation();

      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3.event.on("drag", dragged).on("end", ended);

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag()
      .on("start", started));
  }

  getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    const sg = new ForceDirectedGraph(nodes, links, options);
    return sg;
  }
}
