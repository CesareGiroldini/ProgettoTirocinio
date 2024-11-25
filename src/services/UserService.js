import api from './axiosSetup.js';

const SECRET_KEY = 'abcdefghi12345';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const signUpUser = async (user) => {
    try {
        await delay(1000);
        const response = await api.post('/users', user);
        return response.data;
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        return null;
    }
};

export const loginUser = async (username, password) => {
    try {
        await delay(1000);

        const response = await api.get('/users', {
            params: { username, password },
        });

        if (response.data && response.data.length > 0) {
            const user = response.data[0];

            const token = SECRET_KEY;

            localStorage.setItem('token', token);

            return { ...user, token };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Errore durante il login:', error);
        return null;
    }
};

export const getUserMatches = async (username) => {
    try {
        await delay(1000);
        const response = await api.get(`/matches?user=${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching matches:", error);
        return [];
    }
};

export const saveMatch = async (matchData) => {
    try {
        await delay(1000);
        const response = await api.post(`/matches`, matchData);
        return response.data;
    } catch (error) {
        console.error("Error saving match:", error);
        return null;
    }
};
