import api from './api';

export interface IService {
    id: number;
    title: string;
    description: string;
    slug: string;
    ISO: string;
}

export interface IServiceResponse {
    list: IService[];
    count: number;
}

export const serviceService = {
    getMany: async (params: { skip: number; take: number; ISO?: string; title?: string }): Promise<IServiceResponse> => {
        try {
            const response = await api.get<IServiceResponse>('/services/many', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
            return { list: [], count: 0 };
        }
    },

    getOne: async (id: number): Promise<IService | null> => {
        try {
            const response = await api.get<IService>(`/services/get/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching service:', error);
            return null;
        }
    }
};