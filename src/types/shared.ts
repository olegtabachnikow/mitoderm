export interface LeadData {
  name?: string;
  phone: string;
  email?: string;
  source: string;
  timestamp: string;
  conversationSummary?: string;
}

export interface ExtractedInfo {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  confidence?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  showForm?: boolean;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
} 