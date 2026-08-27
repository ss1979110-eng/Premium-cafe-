export type CategoryType = 'ALL' | 'NOODLES' | 'SHAKE' | 'CHINESE' | 'MOCKTAILS' | 'TEA' | 'COFFEE';

export interface MenuItem {
  id: string;
  name: string;
  category: 'NOODLES' | 'SHAKE' | 'CHINESE' | 'MOCKTAILS' | 'TEA' | 'COFFEE';
  price: number;
  description?: string;
  image: string;
  featured?: boolean;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface BusinessInfo {
  location: string;
  phone: string;
  phoneRaw: string;
  directionsUrl: string;
  heroHeadline: string;
  heroTagline: string;
}
