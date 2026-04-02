'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  blogPosts as staticPosts,
  getPublishedPosts as staticGetPublished,
  getCategoryLabel,
  type BlogPost,
} from '@/data/blog-posts';

/**
 * Convert an API post (flat strings) to the BlogPost shape used by frontend pages.
 */
function apiToBlogPost(p: any): BlogPost {
  const content = p.content || '';
  const contentAr = p.contentAr || '';
  return {
    slug: p.slug,
    category: (p.category || 'families') as BlogPost['category'],
    publishDate: p.date || p.publishDate || new Date().toISOString().split('T')[0],
    readTime: p.readTime || 5,
    coverImage: p.image || p.coverImage || undefined,
    titleEn: p.title || p.titleEn || '',
    titleAr: p.titleAr || '',
    excerptEn: p.excerpt || p.excerptEn || '',
    excerptAr: p.excerptAr || '',
    contentEn: Array.isArray(content) ? content : (content ? content.split('\n\n') : []),
    contentAr: Array.isArray(contentAr) ? contentAr : (contentAr ? contentAr.split('\n\n') : []),
    tags: p.tags || [],
    featured: p.featured || false,
  } as BlogPost;
}

// Module-level cache
let cachedPosts: BlogPost[] | null = null;

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(() => cachedPosts || staticGetPublished());
  const [loaded, setLoaded] = useState(!!cachedPosts);

  useEffect(() => {
    // If we already have cached data, use it immediately
    if (cachedPosts) {
      setPosts(cachedPosts);
      setLoaded(true);
      return;
    }

    // Fetch from API
    let cancelled = false;
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        if (data.posts && Array.isArray(data.posts)) {
          const today = new Date().toISOString().split('T')[0];
          const merged = data.posts
            .filter((p: any) => p.source === 'cms' ? p.published !== false : true)
            .map(apiToBlogPost)
            .filter((p: BlogPost) => p.publishDate <= today)
            .sort((a: BlogPost, b: BlogPost) => b.publishDate.localeCompare(a.publishDate));

          cachedPosts = merged;
          setPosts(merged);
        }
      })
      .catch(() => { /* keep static */ })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => { cancelled = true; };
  }, []);

  const getPublishedPosts = useCallback(() => posts, [posts]);

  const getPostsByCategory = useCallback((category: string) =>
    posts.filter(p => p.category === category), [posts]);

  const getPostBySlug = useCallback((slug: string) =>
    posts.find(p => p.slug === slug), [posts]);

  const getLatestPosts = useCallback((count: number = 3) =>
    posts.slice(0, count), [posts]);

  const getRelatedPosts = useCallback((currentSlug: string, count: number = 2) => {
    const current = posts.find(p => p.slug === currentSlug);
    if (!current) return posts.slice(0, count);
    return posts
      .filter(p => p.slug !== currentSlug && p.category === current.category)
      .slice(0, count);
  }, [posts]);

  const getAllCategories = useCallback(() =>
    Array.from(new Set(posts.map(p => p.category))), [posts]);

  return {
    posts,
    loaded,
    getPublishedPosts,
    getPostsByCategory,
    getPostBySlug,
    getLatestPosts,
    getRelatedPosts,
    getAllCategories,
    getCategoryLabel,
  };
}
