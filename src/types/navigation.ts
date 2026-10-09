export type PageId =
  | 'home'
  | 'menu'
  | 'custom-builder'
  | 'branches'
  | 'gallery'
  | 'tracker'
  | 'standards';

export interface PageRoute {
  id: PageId;
  label: string;
  path: string;
}

export const NAV_PAGES: PageRoute[] = [
  { id: 'home', label: 'Home', path: '#/' },
  { id: 'menu', label: 'Menu & Cakes', path: '#/menu' },
  { id: 'custom-builder', label: 'Custom Cake Builder', path: '#/custom-builder' },
  { id: 'branches', label: 'Branches & Hours', path: '#/branches' },
  { id: 'gallery', label: 'Gallery & Reviews', path: '#/gallery' },
  { id: 'tracker', label: 'Track Order', path: '#/tracker' },
];
