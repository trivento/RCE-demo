import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisualSearchPage } from './visual-search.page';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

const routes: Routes = [
  {
    path: '',
    component: VisualSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisualSearchPage]
})
export class VisualSearchPageModule {}
