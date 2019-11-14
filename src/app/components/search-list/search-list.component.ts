import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnChanges {

  private values: Array<any>;
  searchString: string;
  filteredValues: Array<any>;
  @Output() total = new EventEmitter();
  @Input() objectName: string;
  @Input() query: string;
  @Input() showKey: boolean;

  constructor(private searchService: SearchService) {

  }
  ngOnChanges() {
    if (this.query) {
      this.loadData(this.query);
    }
  }

  loadData(query) {
    this.searchService.postRCEQuery(query).subscribe(rdfResult => {
      this.filteredValues = this.values = rdfResult.results.bindings.map(item => {
        let retVal: any = {};
        rdfResult.head.vars.forEach(variable => {
          //@ts-ignore
          retVal[variable] = item[variable].value
        });
        return retVal;
      });
      this.total.emit(this.filteredValues.length);
    });;
  }

  search(): void {
    if (!this.searchString) {
      this.filteredValues = this.values;
      this.total.emit(this.filteredValues.length);
      return;
    }
    this.filteredValues = this.values.filter(value => {
      return value.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
    });
    this.total.emit(this.filteredValues.length);
  }
}
