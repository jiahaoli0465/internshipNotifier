import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import supabase from '../config/supabaseClient';

interface AuthState {
  session: Session | null;
  user: User | null;
  userId: string | null;
  userEmail: string | null;
  loading: boolean;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    userId: null,
    userEmail: null,
    loading: true,
  });

  useEffect(() => {
    const setUser = (session: Session | null) => {
      setAuthState({
        session: session,
        user: session?.user ?? null,
        userId: session?.user?.id ?? null,
        userEmail: session?.user?.email ?? null,
        loading: false,
      });
    };

    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });

    // Listen for changes on auth state (login, logout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return authState;
};
