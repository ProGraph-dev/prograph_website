import api from './api';

export interface IProduct {
    id: number;
    title: string;
    url: string;
    ISO: string;
    price: number;
    productTypeId: number;
}

export interface IProductResponse {
    items: IProduct[];
    total: number;
}

export const productService = {
    getProducts: async (skip: number = 0, take: number = 9, ISO: string = 'EN'): Promise<IProductResponse> => {
        try {
            console.log("api:", api)
            const response = await api.get('/product/list', {
                params: { skip, take, ISO }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return { items: [], total: 0 };
        }
    }
};