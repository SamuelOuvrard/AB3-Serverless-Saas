import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document, DocumentTemplate } from './models/document.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
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
    { id: '1', name: 'Sample Document 1', type: 'PDF', date: new Date(), companyName: 'ABC Corp' },
    { id: '2', name: 'Sample Document 2', type: 'DOCX', date: new Date(), companyName: 'XYZ Inc' }
  ];

  constructor() { }

  getDocumentTemplates(): Observable<DocumentTemplate[]> {
    return of(this.documentTemplates);
  }

  getDocumentTemplate(id: string): Observable<DocumentTemplate | undefined> {
    const template = this.documentTemplates.find(template => template.id === id);
    return of(template);
  }

  getDocuments(): Observable<Document[]> {
    return of(this.documents);
  }

  createDocument(document: Document): Observable<Document> {
    const newDocument = {
      ...document,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date()
    };
    this.documents.push(newDocument);
    return of(newDocument);
  }
}