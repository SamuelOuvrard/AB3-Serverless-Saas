import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../models/document.interface';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  documentData: Document[] = [];
  isLoading: boolean = true;
  displayedColumns: string[] = ['name', 'type', 'date', 'companyName', 'status'];
  private subscription: Subscription = new Subscription();

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
  }

  loadDocuments(): void {
    this.isLoading = true;
    this.subscription = this.documentService.getDocuments().subscribe(documents => {
      this.documentData = documents;
      this.isLoading = false;
    });
  }

  onCreate() {
    this.router.navigate(['documents', 'create']);
  }
  
  openDocument(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}