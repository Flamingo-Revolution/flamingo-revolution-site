import { supabase } from './supabase.js';

export async function fetchLeaderboard() {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('leaderboard_scores')
    .select('player_name, score')
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(10);

  if (error) throw error;

  return data.map(({ player_name: name, score }) => ({ name, score }));
}

export async function saveScore(name, score) {
  if (!supabase) return false;

  const { error } = await supabase
    .from('leaderboard_scores')
    .insert({ player_name: name.trim().slice(0, 24), score });

  if (error) throw error;

  return true;
}
