import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui/ui.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MapsGeoMetrie} from '../../models/rijksmonument.model';

@Component({
    selector: 'app-rijksmonument-detail',
    templateUrl: './rijksmonument-detail.component.html',
    styleUrls: ['./rijksmonument-detail.component.scss'],
})
export class RijksmonumentDetailComponent implements OnInit, OnDestroy {
    private item;
    private geometrieWKT: MapsGeoMetrie = {huidigeNaam: '', geometrieWKT: ''};
    unsubscribe = new Subject<void>();

    constructor(private uiService: UiService) {
    }

    ngOnInit() {
        this.uiService.activeRijksmonument.pipe(takeUntil(this.unsubscribe)).subscribe(rm => {
            if (rm) {
                this.item = rm;
                this.geometrieWKT = {huidigeNaam: this.item.huidigeNaam, geometrieWKT: this.item.geometrieWKT};
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
