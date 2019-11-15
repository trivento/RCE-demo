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
import { D3RdfComponent } from './d3-rdf/d3-rdf.component';
import { D3GraphComponent } from './d3-rdf/d3/graph/graph.component';
import { NodeVisualComponent } from './d3-rdf/d3/node-visual/node-visual.component';
import { LinkVisualComponent } from './d3-rdf/d3/link-visual/link-visual.component';
import { ZoomableDirective } from '../directives/d3/zoomable.directive';
import { DraggableDirective } from '../directives/d3/draggable.directive';

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
    MapsComponent,
    D3RdfComponent,
    D3GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    DraggableDirective,
  ],
  exports: [
    GlobalHeaderComponent,
    ArchitectListComponent,
    SearchListComponent,
    RijksmonumentListComponent,
    RijksmonumentDetailComponent,
    MapsComponent,
    D3RdfComponent,
    D3GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    DraggableDirective,
  ]
})
export class CustomComponentsModule { }
