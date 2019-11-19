import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-global-header',
    templateUrl: './global-header.component.html',
    styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeaderComponent {
    public appPages = [
        {
            title: 'Lijst weergave',
            url: '/home',
            icon: 'home'
        }, {
            title: 'Node weergave',
            url: '/visual-search',
            icon: 'search'
        }
    ];


    constructor(public router: Router) {
    }

    openMenu(item: string) {
        this.router.navigate([item]);
    }
}
