import { Component, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-architect-list',
  templateUrl: './architect-list.component.html',
  styleUrls: ['./architect-list.component.scss'],
})
export class ArchitectListComponent {
  private architecten: Array<any>;
  searchString: string;
  filteredValues: Array<any>;
  @Output() total = new EventEmitter();

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
      }`).subscribe(res => {
      this.filteredValues = this.architecten = res;
      console.log(this.filteredValues.length)
      this.total.emit(this.filteredValues.length);
    });;
  }

  search(): void {
    if (!this.searchString) {
      this.filteredValues = this.architecten;
      this.total.emit(this.filteredValues.length);
      return;
    }
    this.filteredValues = this.architecten.filter(architect => {
      return architect.actor.value.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
    });
    this.total.emit(this.filteredValues.length);
  }
}
