import api from './api';

export interface IEmployee {
    id: number;
    name: string;
    description: string;
    photo: string;
    userId: number;
    ISO: string;
}

export interface IEmployeeResponse {
    list: IEmployee[];
    count: number;
}

export interface IEmployeeParams {
    skip?: number;
    take?: number;
    ISO?: string;
}

class EmployeeService {
    async getMany(params: IEmployeeParams = {}): Promise<IEmployeeResponse> {
        const { data } = await api.get('/employee/all', { params });
        return data.response;
    }

    async getOne(id: number): Promise<IEmployee> {
        const { data } = await api.get(`/employee/${id}`);
        return data;
    }
}

export const employeeService = new EmployeeService();