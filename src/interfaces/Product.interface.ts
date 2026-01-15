import type { Extension } from '@/interfaces/type'

export interface ProductInterface {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  quantity?: number | undefined;
  extension: Extension;
}
