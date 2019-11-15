import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui/ui.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-rijksmonument-detail',
    templateUrl: './rijksmonument-detail.component.html',
    styleUrls: ['./rijksmonument-detail.component.scss'],
})
export class RijksmonumentDetailComponent implements OnInit, OnDestroy {
    private item;
    private geometrieWKT = '';
    unsubscribe = new Subject<void>();

    constructor(private uiService: UiService) {
    }

    ngOnInit() {
        this.uiService.activeRijksmonument.pipe(takeUntil(this.unsubscribe)).subscribe(rm => {
            if (rm) {
                this.item = rm;
                this.geometrieWKT =  this.item.geometrieWKT;
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
