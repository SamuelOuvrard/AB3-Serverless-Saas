import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { DocumentTemplate } from '../models/document.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  documentTemplates: DocumentTemplate[] = [];
  selectedTemplate?: DocumentTemplate;
  selectedTemplateDescription = '';
  documentForm: FormGroup;
  step = 1;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private router: Router
  ) {
    this.documentForm = this.fb.group({
      templateId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.documentService.getDocumentTemplates().subscribe(templates => {
      this.documentTemplates = templates;
    });

    // Update description when template selection changes
    this.documentForm.get('templateId')?.valueChanges.subscribe(templateId => {
      const template = this.documentTemplates.find(t => t.id === templateId);
      this.selectedTemplateDescription = template?.description || '';
    });
  }

  onTemplateSelected(): void {
    const templateId = this.documentForm.get('templateId')?.value;
    if (templateId) {
      this.documentService.getDocumentTemplate(templateId).subscribe(template => {
        if (template) {
          this.selectedTemplate = template;
          
          // Create dynamic form controls based on template fields
          const formControls: {[key: string]: any} = {};
          template.fields.forEach(field => {
            formControls[field.key] = ['', field.required ? Validators.required : null];
          });
          
          this.documentForm = this.fb.group(formControls);
          this.step = 2;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.documentForm.valid && this.selectedTemplate) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const formData = this.documentForm.value;
      const document = {
        name: `${this.selectedTemplate.name} - ${formData.companyName || 'New Document'}`,
        type: this.selectedTemplate.id,
        date: new Date(),
        companyName: formData.companyName || '',
        additionalFields: { ...formData }
      };
      
      console.log('Submitting document:', document);
      
      this.documentService.createDocument(document).subscribe({
        next: (response) => {
          console.log('Document created successfully:', response);
          this.isSubmitting = false;
          this.router.navigate(['/documents']);
        },
        error: (error) => {
          console.error('Error creating document:', error);
          this.errorMessage = 'Failed to create document. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }

  goBack(): void {
    if (this.step === 2) {
      this.step = 1;
      this.documentForm = this.fb.group({
        templateId: [this.selectedTemplate?.id || '', Validators.required]
      });
    } else {
      this.router.navigate(['/documents']);
    }
  }
}