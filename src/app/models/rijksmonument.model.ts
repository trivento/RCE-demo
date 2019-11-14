export interface Rijksmonument {
    cultureelHistorischObject: RceObject;
    functieNaam: RceObject;
    huidigeNaam: RceObject;
    geometrieWKT: GeometrieWKT;
    omschrijving: RceObject;
}

interface RceObject {
    type: string;
    value: string;
}
interface GeometrieWKT {
    datatype: string;
    type: string;
    value: string;
}

