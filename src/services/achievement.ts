import api from './api';

export interface Achievement {
  id: string;
  title: string;
  count: number;
  is_active: boolean;
}

export interface AchievementResponse {
  list: Achievement[];
  total: number;
}

export const achievementService = {
  getMany: async (params: { skip: number; take: number; is_active?: boolean }) => {
    const response = await api.get<AchievementResponse>('/achievement/many', { params });
    return response.data;
  },
};