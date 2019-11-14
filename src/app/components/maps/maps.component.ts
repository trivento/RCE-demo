import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, OnChanges {

    @Input() geometrieWKT: string;
    lat: number;
    lng: number;
    zoom = 14;
    paths: any[] = [];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.geometrieWKT = changes.geometrieWKT.currentValue;
        this.setMapsValues();
    }
    ngOnInit() {
        this.setMapsValues();
    }

    setMapsValues() {
        switch (true) {
            case this.geometrieWKT.startsWith('POINT') :
                const latlon = this.geometrieWKT.substring(6, this.geometrieWKT.length - 1);
                this.lat = this.getLat(latlon);
                this.lng = this.getLng(latlon);
                this.paths = [];
                this.zoom = 14;
                break;
            case this.geometrieWKT.startsWith('POLYGON') :
                const polygon = this.geometrieWKT.substring(9, this.geometrieWKT.length - 1);
                this.paths = this.transformPolygonToPaths(polygon, 1);
                this.lat = this.paths[0].lat;
                this.lng = this.paths[0].lng;
                this.zoom = 16;
                break;
            case this.geometrieWKT.startsWith('MULTIPOLYGON'):
                const multipolygon = this.geometrieWKT.substring(15, this.geometrieWKT.length - 3);
                this.paths = this.transformMultiPolygonToPaths(multipolygon);
                this.lat = this.paths[0][0].lat;
                this.lng = this.paths[0][0].lng;
                this.zoom = 16;
                break;
            default:
                this.lat = 0;
                this.lng = 0;
                this.paths = [];
                this.zoom = 14;
                break;
        }
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
