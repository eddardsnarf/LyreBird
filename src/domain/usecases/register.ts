import AuthRepository, { RegisterResult } from '../../data/repo/authRepository';

export const register = async (email: string, password: string, name: string, authRepo: AuthRepository): Promise<RegisterResult> => {
    return authRepo.register(email, password, name);
};
