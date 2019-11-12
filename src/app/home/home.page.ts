import { Component } from '@angular/core';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private architecten: Array<any>;
  constructor(private searchService: SearchService) {
    this.loadArchitects();
   }

  loadArchitects() {
    this.searchService.postRCEQuery(`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
      SELECT DISTINCT ?actor WHERE {
        ?sub ceo:rol ?obj .
        FILTER CONTAINS(?obj, "architect")
        ?sub ceo:actor ?actor .
      } 
      LIMIT 1000`).subscribe(res => {
      console.log(res);
      this.architecten = res;
    });;
  }
}
