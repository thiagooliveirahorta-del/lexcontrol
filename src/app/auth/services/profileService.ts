import { supabase } from '../../../lib/supabaseClient';

export type UserProfile = {
  id: string;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  avatar_url: string | null;
  cargo: string | null;
  created_at?: string;
  updated_at?: string;
};

const TABLE = 'profiles';

export async function getProfile(
  userId: string,
): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }

    throw error;
  }

  return data as UserProfile;
}

export async function updateProfile(
  profile: Partial<UserProfile> &
    Pick<UserProfile, 'id'>,
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(profile)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as UserProfile;
}