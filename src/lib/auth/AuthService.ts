import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  password: string;
}

class AuthService {
  /**
   * Obtém a sessão atual
   */
  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Erro ao obter sessão:', error.message);
      return null;
    }

    return data.session;
  }

  /**
   * Obtém o usuário autenticado
   */
  async getUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Erro ao obter usuário:', error.message);
      return null;
    }

    return data.user;
  }

  /**
   * Login
   */
  async signIn({
    email,
    password,
  }: LoginData): Promise<User> {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Usuário não encontrado.');
    }

    return data.user;
  }

  /**
   * Cadastro
   */
  async signUp({
    nome,
    email,
    password,
  }: RegisterData): Promise<User> {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
          },
        },
      });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Não foi possível criar o usuário.');
    }

    return data.user;
  }

  /**
   * Logout
   */
  async signOut(): Promise<void> {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Recuperação de senha
   */
  async resetPassword(
    email: string,
  ): Promise<void> {
    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            window.location.origin +
            '/reset-password',
        },
      );

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Atualiza senha
   */
  async updatePassword(
    password: string,
  ): Promise<void> {
    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Escuta alterações na autenticação
   */
  onAuthStateChange(
    callback: (session: Session | null) => void,
  ) {
    return supabase.auth.onAuthStateChange(
      (_event, session) => {
        callback(session);
      },
    );
  }
}

export const authService =
  new AuthService();