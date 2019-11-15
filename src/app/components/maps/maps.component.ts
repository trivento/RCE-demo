import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MapsGeoMetrie, Markers} from '../../models/rijksmonument.model';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, OnChanges {

    @Input() geometrieWKTList: MapsGeoMetrie[];
    @Input() zoom = 16;
    lat = 52.088648926989;
    lng = 5.08957305275236;
    pathList: any = [];
    markers: Markers[] = [];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.geometrieWKTList = changes.geometrieWKTList.currentValue;
        this.setMapsValues();
    }

    ngOnInit() {
        this.setMapsValues();
    }

    setMapsValues() {
        this.pathList = [];
        this.markers = [];

        this.geometrieWKTList.forEach(geo => {
            switch (true) {
                case geo.geometrieWKT.startsWith('POINT') :
                    const latlon = geo.geometrieWKT.substring(6, geo.geometrieWKT.length - 1);
                    this.lat = this.getLat(latlon);
                    this.lng = this.getLng(latlon);
                    this.markers.push({huidigeNaam: geo.huidigeNaam, lat: this.getLat(latlon), lng: this.getLng(latlon)});
                    break;
                case geo.geometrieWKT.startsWith('POLYGON') :
                    const polygon = geo.geometrieWKT.substring(9, geo.geometrieWKT.length - 1);
                    const polygonPath = this.transformPolygonToPaths(polygon, 1);
                    this.pathList.push(polygonPath);
                    this.markers.push({
                        huidigeNaam: geo.huidigeNaam,
                        lat: polygonPath[0].lat,
                        lng: polygonPath[0].lng
                    });
                    this.lat = polygonPath[0].lat;
                    this.lng = polygonPath[0].lng;
                    break;
                case geo.geometrieWKT.startsWith('MULTIPOLYGON'):
                    const multipolygon = geo.geometrieWKT.substring(15, geo.geometrieWKT.length - 3);
                    const multipolygonPath = this.transformMultiPolygonToPaths(multipolygon);
                    this.pathList.push(multipolygonPath);
                    this.markers.push({
                        huidigeNaam: geo.huidigeNaam,
                        lat: multipolygonPath[0][0].lat,
                        lng: multipolygonPath[0][0].lng
                    });
                    this.lat = multipolygonPath[0][0].lat;
                    this.lng = multipolygonPath[0][0].lng;
                    break;
                default:
                    break;
            }
        });
    }

    getLat(latlng: string) {
        return Number(latlng.split(' ')[1]);
    }

    getLng(latlng: string) {
        return Number(latlng.split(' ')[0]);
    }

    transformPolygonToPaths(polygon: string, trimEnd: number) {
        return polygon.split(',').map(item => {
            const latlon = item.substring(0, item.length - trimEnd);
            return {
                lat: this.getLat(latlon),
                lng: this.getLng(latlon)
            };
        });
    }

    transformMultiPolygonToPaths(multiPolygon: string) {
        return multiPolygon.split('),(').map(polygon => {
            return this.transformPolygonToPaths(polygon, 0);
        });
    }
}
