import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  ReactNode,
} from 'react';

import type {
  Session,
  User,
  AuthChangeEvent,
} from '@supabase/supabase-js';

import { supabase } from '../../../lib/supabaseClient';

type AuthContextData = {
  user: User | null;

  session: Session | null;

  loading: boolean;

  authenticated: boolean;

  signIn: (
    email: string,
    password: string,
  ) => Promise<void>;

  signOut: () => Promise<void>;

  resetPassword: (
    email: string,
  ) => Promise<void>;
};

const AuthContext =
  createContext<AuthContextData | undefined>(
    undefined,
  );

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadSession() {
      const {
        data,
      } =
        await supabase.auth.getSession();

      setSession(data.session);

      setUser(
        data.session?.user ?? null,
      );

      setLoading(false);
    }

    loadSession();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (
          _event: AuthChangeEvent,
          session: Session | null,
        ) => {
          setSession(session);

          setUser(
            session?.user ?? null,
          );

          setLoading(false);
        },
      );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signIn(
    email: string,
    password: string,
  ) {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw error;
    }
  }

  async function signOut() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async function resetPassword(
    email: string,
  ) {
    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
      );

    if (error) {
      throw error;
    }
  }

  const value =
    useMemo<AuthContextData>(
      () => ({
        user,

        session,

        loading,

        authenticated:
          !!user,

        signIn,

        signOut,

        resetPassword,
      }),
      [
        user,
        session,
        loading,
      ],
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro do AuthProvider.',
    );
  }

  return context;
}