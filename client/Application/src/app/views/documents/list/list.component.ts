import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  documentData: any[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'type', 'date'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // This is a placeholder - no API connection for now
    // Sample data for demonstration
    this.documentData = [
      { id: '1', name: 'Sample Document 1', type: 'PDF', date: new Date() },
      { id: '2', name: 'Sample Document 2', type: 'DOCX', date: new Date() }
    ];
  }

  onCreate() {
    // Placeholder for document creation
    console.log('Create document clicked');
  }
}