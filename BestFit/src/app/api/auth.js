import { supabase } from "../utils/supabase";

export const uploadFiles = async (files) => {
    const user = getCurrentUser();
    if (!user){return false};
}

// Sign up function
export const signUp = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    return data.user;
};

// Login function
export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
};

// Logout function
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};


// Get the current user
export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
};