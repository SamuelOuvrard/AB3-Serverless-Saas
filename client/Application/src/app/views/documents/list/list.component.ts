import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from '../models/document.interface';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  documentData: Document[] = [];
  isLoading: boolean = true;
  displayedColumns: string[] = ['name', 'type', 'date', 'companyName'];

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.isLoading = true;
    this.documentService.getDocuments().subscribe(documents => {
      this.documentData = documents;
      this.isLoading = false;
    });
  }

  onCreate() {
    this.router.navigate(['documents', 'create']);
  }
}