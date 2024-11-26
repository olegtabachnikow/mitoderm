import {
  NavItem,
  HowToUseItem,
  AboutBulletItem,
  LanguageSwitchItem,
} from './types';

export const navList: NavItem[] = [
  { text: 'navigation.product' },
  { text: 'navigation.results' },
  { text: 'navigation.about' },
  { text: 'navigation.info' },
  { text: 'navigation.contact' },
];

export const howToUseItemList: HowToUseItem[] = [
  { imagePath: '/images/howToUse/surgery.png', text: 'howToUse.item1' },
  { imagePath: '/images/howToUse/acne.png', text: 'howToUse.item2' },
  { imagePath: '/images/howToUse/hair.png', text: 'howToUse.item3' },
  { imagePath: '/images/howToUse/skin.png', text: 'howToUse.item4' },
];

export const aboutBulletItems: AboutBulletItem[] = [
  { data: '6000', text: 'about.itemExp1' },
  { data: '3', text: 'about.itemExp4' },
  { data: '1000+', text: 'about.itemExp3' },
  { data: '50%', text: 'about.itemExp2' },
  { data: '100-150', text: 'about.itemExp5' },
];

export const languageSwitchItemList: LanguageSwitchItem[] = [
  { imageUrl: '/languageSwitch/en.svg', url: '/en/' },
  { imageUrl: '/languageSwitch/en.svg', url: '/ru/' },
  { imageUrl: '/languageSwitch/en.svg', url: '/he/' },
];
