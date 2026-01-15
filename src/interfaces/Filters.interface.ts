import type { Extension } from '@/interfaces/type'

export interface FiltersInterface {
  search: string;
  priceRange: [number, number];
  extension: Extension;
}

export interface FilterUpdate {
  search?: string;
  priceRange?: [number, number];
  extension?: Extension;
}
