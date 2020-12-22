import { Product } from "../product";

export interface ProductPageResult {
    totalCount: number;
    list: Product[];
}