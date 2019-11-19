import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { MapsGeoMetrie } from '../../models/rijksmonument.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnChanges {

  private values: Array<any>;
  searchString: string;
  filteredValues: Array<any>;
  dataLoaded: boolean;
  @Input() geometrieWKTList: MapsGeoMetrie[] = [];
  @Output() listItems = new EventEmitter();
  @Output() itemClick = new EventEmitter();
  @Input() objectName: string;
  @Input() query: string;
  @Input() showMap: boolean;
  @Input() hideSearch: boolean;
  @Input() showKey: boolean;
  @Input() hiddenKeys: Array<String> = [];

  constructor(private searchService: SearchService) {

  }

  ngOnChanges() {
    if (this.query && !this.dataLoaded) {
      this.dataLoaded = true;
      this.loadData(this.query);
    }
  }

  loadData(query) {
    this.searchService.postRCEQuery(query).subscribe(rdfResult => {
      this.filteredValues = this.values = rdfResult.results.bindings.map(item => {
        let retVal: any = {};
        rdfResult.head.vars.forEach(variable => {
          //@ts-ignore
          if (item[variable]) {
            //@ts-ignore
            retVal[variable] = item[variable].value;
          }
        });
        return retVal;
      });
      this.listItems.emit(this.filteredValues);
    });
  }


  search(): void {
    if (!this.searchString) {
      this.filteredValues = this.values;
      this.listItems.emit(this.filteredValues);
      return;
    }
    this.filteredValues = this.values.filter(value => {
      let retVal = false;
      Object.keys(value).filter(key => {
        return this.hiddenKeys.indexOf(key) === -1;
      }).forEach(key => {
        if (value[key].toLowerCase().indexOf(this.searchString.toLowerCase()) > -1) {
          retVal = true;
        }
      });
      return retVal;
    });
    this.listItems.emit(this.filteredValues);
  }

  itemClicked(item) {
    this.itemClick.emit(item);
  }
}
