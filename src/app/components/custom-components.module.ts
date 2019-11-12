import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { ArchitectListComponent } from './architect-list/architect-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    GlobalHeaderComponent,
    ArchitectListComponent
  ],
  exports: [
    GlobalHeaderComponent,
    ArchitectListComponent
  ]
})
export class CustomComponentsModule { }
