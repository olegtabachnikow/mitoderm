import {
  NavItem,
  HowToUseItem,
  AboutBulletItem,
  LanguageSwitchItem,
  SolutionItem,
  ScrollItems,
  ReviewType,
} from './types';

export const navList: NavItem[] = [
  { text: 'navigation.product', scrollId: ScrollItems.solution },
  { text: 'navigation.results', scrollId: ScrollItems.gallery },
  { text: 'navigation.about', scrollId: ScrollItems.mission },
  { text: 'navigation.info', scrollId: ScrollItems.about },
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
  { data: '70+', text: 'about.itemExp3' },
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

export const reviews: ReviewType[] = [
  {
    name: 'Victoria Aslanyan',
    rating: 5,
    text: 'As a doctor and clinic owner, I integrate advanced exosome treatments into my practice. The results are outstanding! My patients see smoother, rejuvenated skin, and the products have become a cornerstone of my clinic’s offerings. I’m definitely continuing with these treatments!"',
  },
  {
    name: 'Gregory Dyachenko',
    rating: 5,
    text: "I had an amazing experience with the exosome treatment for hair thinning, and I want to thank Ilona especially. In just a few months, my hair has gone from thinning to fuller and healthier. I'm truly impressed with the transformation!",
  },
  {
    name: 'Gregory Dyachenko',
    rating: 5,
    text: "I had an amazing experience with the exosome treatment for hair thinning, and I want to thank Ilona especially. In just a few months, my hair has gone from thinning to fuller and healthier. I'm truly impressed with the transformation!",
  },
  {
    name: 'Victoria Aslanyan',
    rating: 5,
    text: 'As a doctor and clinic owner, I integrate advanced exosome treatments into my practice. The results are outstanding! My patients see smoother, rejuvenated skin, and the products have become a cornerstone of my clinic’s offerings. I’m definitely continuing with these treatments!"',
  },
];
