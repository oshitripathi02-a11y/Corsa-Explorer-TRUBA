export type Category = 
  | 'All'
  | 'Specialty Coffee'
  | 'Rooftops'
  | 'Quiet Work Spots'
  | 'Gelato'
  | 'Hidden Patios'
  | 'Aperitivo Bars';

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  badge?: string;
}

export interface Spot {
  id: string;
  name: string;
  neighborhood: string;
  category: Category;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  categoryLabel: string;
  rating: number;
  reviewCount: string;
  distanceMeters: number;
  distanceLabel: string;
  walkingMinutes: number;
  imageUrl: string;
  altText: string;
  tags: string[];
  insiderTip: string;
  primaryActionLabel: string;
  primaryActionIcon: string;
  actionType: 'route' | 'reserve' | 'seating' | 'menu';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openHours: string;
  wifiSpeed?: string;
  noiseLevel?: string;
  powerOutlets?: string;
  crowdLevel?: 'Quiet' | 'Moderate' | 'Buzzing' | 'Peak';
  crowdPercentage?: number;
  description: string;
  menuHighlights: MenuItem[];
  tableReservationsAvailable?: boolean;
}

export interface CuratedRoute {
  id: string;
  title: string;
  subtitle: string;
  neighborhoods: string[];
  distanceKm: number;
  estimatedMinutes: number;
  checkpointsCount: number;
  tags: string[];
  spotIds: string[];
  description: string;
  heroImage: string;
}
