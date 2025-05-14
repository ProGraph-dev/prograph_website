import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface ILoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
    };
}

export interface IRegistrationResponse {
    token: string;
    user: {
        id: number;
        email: string;
    };
}

export const authService = {
    async login(email: string, password: string): Promise<ILoginResponse> {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            return response.data.response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    async register(email: string, password: string): Promise<IRegistrationResponse> {
        try {
            const response = await axios.post(`${API_URL}/auth/registration`, {
                email,
                password
            });
            return response.data.response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    },

    setToken(token: string) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    removeToken() {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};