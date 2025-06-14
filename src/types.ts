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

export interface AboutBulletItem {
  data: string;
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
  discount?: boolean;
  quantity?: string | number;
  lang?: string;
}

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
