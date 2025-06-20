export interface Document {
  id?: string;
  name: string;
  type: string;
  date: Date;
  companyName: string;
  additionalFields?: Record<string, any>;
  status?: 'processing' | 'completed' | 'error';
  url?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  fields: DocumentField[];
}

export interface DocumentField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[]; // For select type
}