export type LanguageType = 'en-US' | 'he-IL' | 'ru-RU';
export type LocaleType = 'en' | 'he' | 'ru';

export interface NavItem {
  text: string;
  scrollId?: ScrollItems;
  url?: string;
  form?: 'main' | 'event';
}

export interface HowToUseItem {
  imagePath: string;
  text: string;
}

export interface LanguageSwitchItem {
  imageUrl: string;
  url: string;
}

export interface SolutionItem {
  imageUrl: string;
  title: string;
  text: string[];
  column?: boolean;
}

export type NameTypeMain = 'name' | 'email' | 'phone' | 'profession';
export type NameTypeEvent = 'name' | 'email' | 'phone' | 'idNumber';

export interface FormDataType {
  name: { value: string; isValid: boolean };
  email: { value: string; isValid: boolean };
  phone: { value: string; isValid: boolean };
}

export interface MainFormDataType extends FormDataType {
  profession: { value: string; isValid: boolean };
}

export interface EventFormDataType extends FormDataType {
  idNumber: { value: string; isValid: boolean };
  totalPrice?: string;
  discount?: number;
  quantity?: string | number;
  lang?: string;
}

export type DiscountModifier = 0.9 | 1 | 0.01;

export enum ScrollItems {
  gallery = 'gallery',
  solution = 'solution',
  mission = 'mission',
  about = 'about',
  moreInfo = 'faq',
  contactUs = 'contact',
  agenda = 'agenda',
  clinic = 'clinic',
}

export type ModalType = 'privatePolicy' | 'accessibility';

export interface ReviewType {
  name: string;
  rating: number;
  text: string;
}

export interface EventBulletItem {
  imagePath: string;
  text: string;
}

export interface FaqItemProps {
  item: string;
  time?: boolean;
}

export interface CenterItemData {
  name: string;
  city: string;
  contact: string;
}

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
