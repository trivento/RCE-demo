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

export interface MapsGeoMetrie {
    huidigeNaam: string;
    geometrieWKT: string;
}

export interface Markers {
    lat: number;
    lng: number;
    huidigeNaam: string;
}
