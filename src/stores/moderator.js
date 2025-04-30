import { defineStore } from 'pinia';
import { createUserModerador } from '@/services/HttpService';
import { useAuthStore } from './auth'; // pega o token

export const useModeratorStore = defineStore('moderator', {
    state: () => ({}),

    actions: {
        async createModerator(userData) {
            try {
                const auth = useAuthStore();
                const token = auth.token;
                const result = await createUserModerador({ ...userData, role: 'MODERATOR' }, token);
                console.log("Moderador criado com sucesso", result);
                return result;
            } catch (err) {
                console.error('Erro ao criar moderador:', err);
                return null;
            }
        }
    }
});
