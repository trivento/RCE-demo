import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from '../../services/ui/ui.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
    selector: 'app-rijksmonument-detail',
    templateUrl: './rijksmonument-detail.component.html',
    styleUrls: ['./rijksmonument-detail.component.scss'],
})
export class RijksmonumentDetailComponent implements OnInit, OnDestroy {
    private items = [];
    private item;
    private geometrieWKT;
    unsubscribe = new Subject<void>();
    private query: string;

    constructor(private uiService: UiService,
        private searchService: SearchService) {
    }

    ngOnInit() {
        this.uiService.activeRijksmonument.pipe(takeUntil(this.unsubscribe)).subscribe(rm => {
            console.log(rm);
            if (rm) {
                this.item = rm;
                this.geometrieWKT = this.item.geometrieWKT;
                if (this.item.cultureelHistorischObject) {
                    this.query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
                    SELECT ?architect ?actorEnRol WHERE {
                      <${this.item.cultureelHistorischObject}> ceo:heeftGebeurtenis ?obj .
                      ?obj ceo:heeftActorEnRol ?actorEnRol .
                      ?actorEnRol ceo:rol ?rol
                      FILTER CONTAINS(?rol, "architect")
                      ?actorEnRol ceo:actor ?architect
                    }`;
                }
            }
        });
    }

    onListItems(items) {
        this.items = items;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
