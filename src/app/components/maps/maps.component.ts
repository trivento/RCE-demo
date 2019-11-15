import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, OnChanges {

    @Input() geometrieWKTList: string[];
    @Input() zoom = 16;
    lat: number;
    lng: number;
    pathList: any = [];
    markers: { lat: number, lng: number }[] = [];

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
                case geo.startsWith('POINT') :
                    const latlon = geo.substring(6, geo.length - 1);
                    this.lat = this.getLat(latlon);
                    this.lng = this.getLng(latlon);
                    this.markers.push({lat: this.getLat(latlon), lng: this.getLng(latlon)});
                    break;
                case geo.startsWith('POLYGON') :
                    const polygon = geo.substring(9, geo.length - 1);
                    this.pathList.push(this.transformPolygonToPaths(polygon, 1));
                    // this.lat = this.pathList[0][0].lat;
                    // this.lng = this.pathList[0][0].lng;
                    break;
                case geo.startsWith('MULTIPOLYGON'):
                    const multipolygon = geo.substring(15, geo.length - 3);
                    this.pathList.push(this.transformMultiPolygonToPaths(multipolygon));
                    // this.lat = this.pathList[0][0][0].lat;
                    // this.lng = this.pathList[0][0][0].lng;
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
