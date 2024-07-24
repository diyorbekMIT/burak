import { ProductCollection, ProductSize, ProductVolume } from "../enums/product.enum";
import {ObjectId} from "mongoose";

export interface Product {
    _id: ObjectId;
    productStatus: ProductSize;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize : ProductSize;
    productVolume?:ProductVolume;
    productDesc: String;
    productImages: string[];
    productViews: number;

}

export interface ProductInput {
    productStatus: ProductSize;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize?: ProductSize;
    productVolume?:ProductVolume;
    productDesc: String;
    productImages?: string[];
    productViews?: number;

}

export interface ProductUpdateInput {
    _id: ObjectId;
    productStatus?: ProductSize;
    productCollection?: ProductCollection;
    productName?: string;
    productPrice?: number;
    productLeftCount?: number;
    productSize?: ProductSize;
    productVolume?:ProductVolume;
    productDesc?: String;
    productImages?: string[];
    productViews?: number;

}

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;

} 