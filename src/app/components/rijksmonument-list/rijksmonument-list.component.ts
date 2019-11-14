import {Component} from '@angular/core';

@Component({
    selector: 'app-rijksmonument-list',
    templateUrl: './rijksmonument-list.component.html',
    styleUrls: ['./rijksmonument-list.component.scss'],
})
export class RijksmonumentListComponent {
    private query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
SELECT DISTINCT ?cultureelHistorischObject ?functieNaam ?huidigeNaam ?omschrijving ?geometrieWKT WHERE {
 #functieNaam
 ?sub ceo:heeftFunctieNaam ?obj_functie .
 ?obj_functie <http://www.w3.org/2004/02/skos/core#prefLabel> ?functieNaam
 FILTER CONTAINS(?functieNaam, "fabriek")
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

    constructor() {
    }
}
