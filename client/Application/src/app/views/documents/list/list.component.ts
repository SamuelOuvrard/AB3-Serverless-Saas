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
  displayedColumns: string[] = ['name', 'type', 'date', 'companyName', 'status'];

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.isLoading = true;
    this.documentService.fetch().subscribe({
      next: (documents) => {
        // Convert date strings to Date objects
        this.documentData = documents.map(doc => ({
          ...doc,
          date: new Date(doc.date),
          status: doc.status || 'completed'
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
        this.isLoading = false;
      }
    });
  }

  onCreate() {
    this.router.navigate(['documents', 'create']);
  }
}