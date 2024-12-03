import {
  NavItem,
  HowToUseItem,
  AboutBulletItem,
  LanguageSwitchItem,
  SolutionItem,
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

export const solutionItems: SolutionItem[] = [
  {
    imageUrl: '/images/solution/item1.png',
    title: 'solution.item1title',
    text: [
      'solution.item1textP1',
      'solution.item1textP2',
      'solution.item1textP3',
      'solution.item1textP4',
    ],
  },
  {
    imageUrl: '/images/solution/item2.png',
    title: 'solution.item2title',
    text: ['solution.item2textP1', 'solution.item2textP2'],
  },
  {
    imageUrl: '/images/solution/item1.png',
    title: 'solution.item1title',
    text: [
      'solution.item1textP1',
      'solution.item1textP2',
      'solution.item1textP3',
      'solution.item1textP4',
    ],
  },
  {
    imageUrl: '/images/solution/item2.png',
    title: 'solution.item2title',
    text: ['solution.item2textP1', 'solution.item2textP2'],
  },
];

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
