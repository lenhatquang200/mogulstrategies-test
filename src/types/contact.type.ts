export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  type: string;
  accredited: string;
  message: string;
  createdAt: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  type: string;
  accredited: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
