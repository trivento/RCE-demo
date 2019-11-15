import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {SearchService} from '../../services/search/search.service';
import {UiService} from '../../services/ui/ui.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnChanges {

    private values: Array<any>;
    searchString: string;
    filteredValues: Array<any>;
    geometrieWKTList: string[] = [];
    @Output() total = new EventEmitter();
    @Input() objectName: string;
    @Input() query: string;
    @Input() showKey: boolean;

    constructor(private searchService: SearchService,
                private router: Router,
                private uiService: UiService) {

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
                    retVal[variable] = item[variable].value;
                });
                return retVal;
            });
            this.total.emit(this.filteredValues.length);
            this.setGeometrieWKTList(this.filteredValues);
            this.uiService.activeRijksmonument.next(this.filteredValues[0]);
        });
    }

    setGeometrieWKTList(list: any[]) {
        this.geometrieWKTList = list.map(item => {
            return item.geometrieWKT;
        });
    }
    search(): void {
        if (!this.searchString) {
            this.filteredValues = this.values;
            this.setGeometrieWKTList(this.filteredValues);
            this.total.emit(this.filteredValues.length);
            return;
        }
        this.filteredValues = this.values.filter(value => {
            let retVal = false;
            Object.keys(value).forEach(key => {
                if (value[key].toLowerCase().indexOf(this.searchString.toLowerCase()) > -1) {
                    retVal = true;
                }
            });
            return retVal;
        });
        this.setGeometrieWKTList(this.filteredValues);
        this.total.emit(this.filteredValues.length);
    }

    navigateToDetails(item) {
        this.uiService.activeRijksmonument.next(item);
        this.router.navigate(['detail']);
    }
}
