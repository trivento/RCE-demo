import { Component, } from '@angular/core';

@Component({
  selector: 'app-architect-list',
  templateUrl: './architect-list.component.html',
  styleUrls: ['./architect-list.component.scss'],
})
export class ArchitectListComponent {
  query = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
  SELECT DISTINCT ?architect WHERE {
    ?sub ceo:rol ?obj .
    FILTER CONTAINS(?obj, "architect")
    ?sub ceo:actor ?architect .
  }`;
}
