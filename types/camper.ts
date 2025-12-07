interface GalleryItem {
  thumb: string;
  original: string;
}

export type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: 'panelTruck' | 'fullyIntegrated' | 'alcove';
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: 'automatic' | 'manual';
  engine: 'petrol' | 'diesel' | 'hybrid';
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: GalleryItem[];
  reviews: Review[];
};

export type EquipmentFilter =
  | 'AC'
  | 'automatic'
  | 'kitchen'
  | 'TV'
  | 'bathroom';

export type VehicleType = 'panelTruck' | 'fullyIntegrated' | 'alcove';

export interface FiltersState {
  location: string;
  equipment: EquipmentFilter[];
  type: VehicleType | null;
}

export interface CamperResponse {
  items: Camper[];
  total: number;
}
