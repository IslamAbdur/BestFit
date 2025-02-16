import { supabase } from "../utils/supabase";

export const uploadFiles = async (files) => {
    const user = await getCurrentUser();
    if (!user) return { error: "User not authenticated" };

    const uploadedFiles = [];

    for (const file of files) {
        // Generate unique file name
        const fileName = `${user.id}/${Date.now()}_${file.name}`;

        // Upload file to Supabase Storage ("clothes" bucket)
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from("clothes")
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            console.error(`Upload failed for ${file.name}:`, uploadError.message);
            return { error: uploadError.message };
        }

        // Get the public URL of the uploaded file
        const { data: publicUrlData } = supabase.storage
            .from("clothes")
            .getPublicUrl(fileName);
        const fileUrl = publicUrlData.publicUrl;

        // Insert record into "clothes" table
        const { data: insertData, error: dbError } = await supabase
            .from("clothes")
            .insert([{ user_id: user.id, file_url: fileUrl }]);

        if (dbError) {
            console.error(`Database insert failed for ${file.name}:`, dbError.message);
            return { error: dbError.message };
        }

        // Add uploaded file details to the list
        uploadedFiles.push({ fileName, fileUrl });
    }

    return { data: uploadedFiles };
};


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