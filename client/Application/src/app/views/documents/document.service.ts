/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Document, DocumentTemplate } from './models/document.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {}
  baseUrl = `${localStorage.getItem('apiGatewayUrl')}/documents`;
  
  private documentTemplates: DocumentTemplate[] = [
    {
      id: 'private-stock',
      name: 'Private Stock Creation',
      description: 'Documents needed to create new private stocks for your company in Quebec',
      fields: [
        { key: 'companyName', label: 'Company Name', type: 'text', required: true },
        { key: 'companyNumber', label: 'Company Registration Number', type: 'text', required: true },
        { key: 'stockAmount', label: 'Number of Stocks', type: 'number', required: true },
        { key: 'stockValue', label: 'Value per Stock', type: 'number', required: true },
        { key: 'stockClass', label: 'Stock Class', type: 'select', required: true, options: ['Common', 'Preferred', 'Non-voting'] }
      ]
    },
    {
      id: 'address-change',
      name: 'Company Address Change',
      description: 'Documents required to change the address of your company in Quebec',
      fields: [
        { key: 'companyName', label: 'Company Name', type: 'text', required: true },
        { key: 'companyNumber', label: 'Company Registration Number', type: 'text', required: true },
        { key: 'currentAddress', label: 'Current Address', type: 'text', required: true },
        { key: 'newAddress', label: 'New Address', type: 'text', required: true },
        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true }
      ]
    }
  ];

  private documents: Document[] = [
    { id: '1', name: 'Sample Document 1', type: 'PDF', date: new Date(), companyName: 'ABC Corp', status: 'completed' },
    { id: '2', name: 'Sample Document 2', type: 'DOCX', date: new Date(), companyName: 'XYZ Inc', status: 'completed' }
  ];
  
  // Create a BehaviorSubject to track document changes
  private documentsSubject = new BehaviorSubject<Document[]>(this.documents);

  getDocumentTemplates(): Observable<DocumentTemplate[]> {
    return of(this.documentTemplates);
  }

  getDocumentTemplate(id: string): Observable<DocumentTemplate | undefined> {
    const template = this.documentTemplates.find(template => template.id === id);
    return of(template);
  }

  getDocuments(): Observable<Document[]> {
    return this.documentsSubject.asObservable();
  }

  createDocument(document: Document): Observable<Document> {
    console.log('Sending document to API:', document);
    
    // Create a placeholder document immediately
    const placeholderDocument: Document = {
      ...document,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date(),
      status: 'processing'
    };
    
    // Add it to the local array and notify subscribers
    this.documents.push(placeholderDocument);
    this.documentsSubject.next([...this.documents]);
    
    // Send the request to the API
    this.http.post<Document>(`${this.baseUrl}`, document)
      .pipe(
        catchError(error => {
          console.error('API Error:', error);
          // Update the placeholder document status
          const index = this.documents.findIndex(d => d.id === placeholderDocument.id);
          if (index !== -1) {
            this.documents[index] = {
              ...this.documents[index],
              status: 'error'
            };
            // Notify subscribers of the change
            this.documentsSubject.next([...this.documents]);
          }
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          // Update the placeholder document with the real data
          console.log('API Response:', response);
          const index = this.documents.findIndex(d => d.id === placeholderDocument.id);
          if (index !== -1) {
            this.documents[index] = {
              ...response,
              status: 'completed'
            };
            // Notify subscribers of the change
            this.documentsSubject.next([...this.documents]);
          }
        }
      });
    
    // Return the placeholder document immediately
    return of(placeholderDocument);
  }
}