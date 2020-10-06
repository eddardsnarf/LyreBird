import AuthRepository, { LoginResult } from '../../data/repo/authRepository';

export const login = async (email: string, password: string, authRepo: AuthRepository): Promise<LoginResult> => {
    return authRepo.login(email,password);
};
