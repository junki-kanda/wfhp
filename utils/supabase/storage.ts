// Get image URL from Supabase storage
export const getImageUrl = async (category: string, name: string): Promise<string | null> => {
  console.log(`getImageUrl called for ${category}/${name}`);
  
  // Skip Supabase calls if in development and images folder exists - TEMPORARILY DISABLED FOR TESTING
  // if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  //   console.log(`getImageUrl: Skipping Supabase in development for ${category}/${name}`);
  //   // In development, return null immediately to use fallbacks
  //   return null;
  // }

  try {
    // Create timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.debug('Supabase credentials not configured');
      return null;
    }
    
    const response = await fetch(
      `${supabaseUrl}/functions/v1/make-server-99d1dd43/images/${category}/${name}`,
      {
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.debug(`Image not found in Supabase storage: ${category}/${name}`);
      return null;
    }

    const data = await response.json();
    return data.success ? data.publicUrl : null;
  } catch (error) {
    console.debug(`Network error getting image URL for ${category}/${name}:`, error);
    return null;
  }
};

// Get multiple image URLs for a category
export const getCategoryImages = async (category: string): Promise<Array<{name: string, publicUrl: string, size?: number, lastModified?: string}>> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.debug('Supabase credentials not configured');
      return [];
    }
    
    const response = await fetch(
      `${supabaseUrl}/functions/v1/make-server-99d1dd43/images/${category}`,
      {
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      console.debug(`No images found for category ${category}`);
      return [];
    }

    const data = await response.json();
    return data.success ? data.images : [];
  } catch (error) {
    console.debug(`Network error getting images for category ${category}:`, error);
    return [];
  }
};

// Upload image to Supabase storage
export const uploadImage = async (file: File, category: string, name: string): Promise<{success: boolean, publicUrl?: string, error?: string}> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('name', name);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return { success: false, error: 'Supabase credentials not configured' };
    }
    
    const response = await fetch(
      `${supabaseUrl}/functions/v1/make-server-99d1dd43/images/upload`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'アップロードに失敗しました' };
  }
};

// Helper function to generate consistent image paths
export const getStorageImagePath = (category: string, name: string) => {
  return `${category}/${name}`;
};

// Fallback image URLs for development
export const getFallbackImageUrl = (category: string, name: string): string => {
  const fallbackMap: {[key: string]: string} = {
    'services/accommodation-operation': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'services/startup-support': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'services/ai-development': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'services/real-estate-consulting': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'hero/luxury-villa': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'hero/karuizawa-nature': 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'hero/villa-1': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'hero/DSCF1830.jpeg': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'villas/villa-a': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'villas/villa-b-sauna': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'villas/villa-ashiyu': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'villas/villa-flat': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'villas/villa-hinoki': 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'villas/villa-sauna': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  };

  const key = `${category}/${name}`;
  return fallbackMap[key] || `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80`;
};