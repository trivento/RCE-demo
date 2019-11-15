import { Component, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';
import { Router } from '@angular/router';
import { MapsGeoMetrie } from '../../models/rijksmonument.model';

@Component({
    selector: 'app-rijksmonument-list',
    templateUrl: './rijksmonument-list.component.html',
    styleUrls: ['./rijksmonument-list.component.scss'],
})
export class RijksmonumentListComponent {
    total: number = 0;
    listItems: Array<any> = [];
    geometrieWKTList: MapsGeoMetrie[];
    @Input() functieNaam: string = "fabriek";
    filter: string = `${this.functieNaam ? `FILTER CONTAINS(?functieNaam, "${this.functieNaam}")` : ''}`;
    private query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
SELECT DISTINCT ?cultureelHistorischObject ?functieNaam ?huidigeNaam ?omschrijving ?geometrieWKT WHERE {
 #functieNaam
 ?sub ceo:heeftFunctieNaam ?obj_functie .
 ?obj_functie <http://www.w3.org/2004/02/skos/core#prefLabel> ?functieNaam .
 ${this.filter}
 #cultureelHistorischObject
 ?sub ceo:heeftBetrekkingOp ?cultureelHistorischObject .
 #huidigeNaam
 ?cultureelHistorischObject ceo:heeftNaam ?naam_obj .
 ?cultureelHistorischObject ceo:heeftKennisregistratie ?kennisRegistratie .
 ?kennisRegistratie rdf:type ?type .
 FILTER (?type = ceo:Naam) .
 ?kennisRegistratie ceo:naam ?huidigeNaam .
 #omschrijving
 ?cultureelHistorischObject ceo:heeftOmschrijving ?heeftOmschrijving .
 ?heeftOmschrijving ceo:omschrijving ?omschrijving .
 #locatie
 ?cultureelHistorischObject ceo:heeftGeometrie ?geometrie .
 ?geometrie <http://www.opengis.net/ont/geosparql#asWKT> ?geometrieWKT
}`;

    constructor(private router: Router,
        private uiService: UiService) {
    }

    setGeometrieWKTList(list: any[]) {
        this.geometrieWKTList = list.map(item => {
            return {huidigeNaam: item.huidigeNaam, geometrieWKT: item.geometrieWKT};
        });
    }

    itemClicked(item) {
        this.uiService.activeRijksmonument.next(item);
        this.router.navigate(['detail']);
    }


    onListItems(items: Array<any>) {
        this.total = items.length;
        console.log('onListItems')
        this.setGeometrieWKTList(items);
    }
}
