import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getImageUrl, getFallbackImageUrl } from '../utils/supabase/storage';
import { getLocalImagePath } from '../utils/devImageLoader';

interface SupabaseImageProps {
  category: string;
  name: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  style?: React.CSSProperties;
}

export const SupabaseImage: React.FC<SupabaseImageProps> = ({
  category,
  name,
  alt,
  className,
  width,
  height,
  priority,
  style
}) => {
  // Initialize with the best available image source
  const getInitialImageUrl = () => {
    // Try local development image first
    const localPath = getLocalImagePath(category, name);
    console.log(`SupabaseImage: ${category}/${name} - Local path found:`, localPath);
    if (localPath && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log(`SupabaseImage: Using local path for ${category}/${name}:`, localPath);
      return localPath;
    }
    // Fall back to Unsplash
    const fallbackUrl = getFallbackImageUrl(category, name);
    console.log(`SupabaseImage: Using fallback for ${category}/${name}:`, fallbackUrl);
    return fallbackUrl;
  };

  const [imageUrl, setImageUrl] = useState<string>(getInitialImageUrl());

  useEffect(() => {
    // In development, prefer local images over Supabase
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      const localPath = getLocalImagePath(category, name);
      if (localPath) {
        setImageUrl(localPath);
        return;
      }
    }

    // Try to load from Supabase in production or if no local image exists
    const loadSupabaseImage = async () => {
      try {
        console.log(`SupabaseImage: Attempting to load from Supabase: ${category}/${name}`);
        const url = await getImageUrl(category, name);
        if (url) {
          console.log(`SupabaseImage: Successfully loaded from Supabase: ${category}/${name}`, url);
          setImageUrl(url);
        } else {
          console.log(`SupabaseImage: No URL returned from Supabase for ${category}/${name}`);
        }
      } catch (error) {
        console.debug(`Supabase image not found for ${category}/${name}, using fallback`, error);
      }
    };

    // Add a small delay to avoid overwhelming the server during page load
    if (!priority) {
      const timeoutId = setTimeout(loadSupabaseImage, 100);
      return () => clearTimeout(timeoutId);
    } else {
      loadSupabaseImage();
    }
  }, [category, name, priority]);

  return (
    <ImageWithFallback
      src={imageUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
    />
  );
};