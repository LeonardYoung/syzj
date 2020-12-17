export interface Product {
    id: string;
    name?: string;
    categoryId?: number;
    categoryName?: string;
    // category: any;
    barcode?: string;
    images: string[];
    price?: number;
    purchasePrice?: number;
    remain?: number;
    format?: number;    //  规格

    supplierName?: string;
    supplierPhone?: number;
}
