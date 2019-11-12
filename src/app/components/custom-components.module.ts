import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GlobalHeaderComponent } from './global-header/global-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [GlobalHeaderComponent],
  exports: [GlobalHeaderComponent]
})
export class CustomComponentsModule {}
