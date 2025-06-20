/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getDocumentTemplates(): Observable<DocumentTemplate[]> {
    return of(this.documentTemplates);
  }

  getDocumentTemplate(id: string): Observable<DocumentTemplate | undefined> {
    const template = this.documentTemplates.find(template => template.id === id);
    return of(template);
  }

  fetch(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}`);
  }

  createDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(`${this.baseUrl}`, document);
  }
}