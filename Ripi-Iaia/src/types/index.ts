export interface NavItem {
  title: string;
  path: string;
  icon?: string;
}

export interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  linkText: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'audio' | 'video' | 'pdf' | 'image';
  category: string;
  url: string;
  thumbnailUrl?: string;
  dateAdded: string;
  featured?: boolean;
}

export interface RadioTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  imageUrl?: string;
  audioUrl: string;
}

export interface LiveEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  streamUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}