export type LanguageType = 'en-US' | 'he-IL' | 'ru-RU';
export type LocaleType = 'en' | 'he' | 'ru';

export interface NavItem {
  text: string;
}

// export interface HowToUseItem {
//   imagePath: string;
//   text: string;
// }

// export interface AboutBulletItem {
//   data: string;
//   text: string;
// }

export interface LanguageSwitchItem {
  imageUrl: string;
  url: string;
}
