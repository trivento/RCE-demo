import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { ArchitectListComponent } from './architect-list/architect-list.component';
import { SearchListComponent } from './search-list/search-list.component';
import {RijksmonumentListComponent} from './rijksmonument-list/rijksmonument-list.component';
import {RijksmonumentDetailComponent} from './rijksmonument-detail/rijksmonument-detail.component';
import {AgmCoreModule} from '@agm/core';
import {MapsComponent} from './maps/maps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
  ],
  declarations: [
    GlobalHeaderComponent,
    ArchitectListComponent,
    SearchListComponent,
    RijksmonumentListComponent,
    RijksmonumentDetailComponent,
    MapsComponent
  ],
  exports: [
    GlobalHeaderComponent,
    ArchitectListComponent,
    SearchListComponent,
    RijksmonumentListComponent,
    RijksmonumentDetailComponent,
    MapsComponent
  ]
})
export class CustomComponentsModule { }
