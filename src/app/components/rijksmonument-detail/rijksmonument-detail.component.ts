import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from '../../services/ui/ui.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapsGeoMetrie } from '../../models/rijksmonument.model';

@Component({
    selector: 'app-rijksmonument-detail',
    templateUrl: './rijksmonument-detail.component.html',
    styleUrls: ['./rijksmonument-detail.component.scss'],
})
export class RijksmonumentDetailComponent implements OnInit, OnDestroy {
    items = [];
    item;
    geometrieWKT: MapsGeoMetrie = { huidigeNaam: '', geometrieWKT: '' };
    unsubscribe = new Subject<void>();
    query: string;

    constructor(private uiService: UiService) {
    }

    ngOnInit() {
        this.uiService.activeRijksmonument.pipe(takeUntil(this.unsubscribe)).subscribe(rm => {
            if (rm) {
                this.item = rm;
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
                this.geometrieWKT = { huidigeNaam: this.item.huidigeNaam, geometrieWKT: this.item.geometrieWKT };
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
