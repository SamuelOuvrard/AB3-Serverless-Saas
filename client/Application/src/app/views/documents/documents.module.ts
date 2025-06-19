import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DocumentsRoutingModule } from './documents-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ]
})
export class DocumentsModule { }