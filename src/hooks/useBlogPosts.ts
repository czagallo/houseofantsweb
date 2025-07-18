import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  published: boolean;
}

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: "The Amazing Architecture of Ant Colonies",
    excerpt: "Discover how ants create complex underground cities with specialized chambers for different purposes, from nurseries to food storage.",
    content: "Ant colonies are marvels of natural engineering. These underground cities feature intricate tunnel systems, specialized chambers for different purposes, and sophisticated ventilation systems. The architecture varies by species, but all share common principles of efficiency and functionality.",
    author: "Dr. Sarah Chen",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Architecture",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800",
    published: true
  },
  {
    id: '2',
    title: "Communication Secrets: How Ants Talk Without Words",
    excerpt: "Explore the fascinating world of pheromone trails and chemical communication that allows ant colonies to coordinate complex tasks.",
    content: "Ants have developed one of the most sophisticated communication systems in the animal kingdom. Through chemical signals called pheromones, they can convey complex information about food sources, dangers, and colony needs.",
    author: "Prof. Michael Rodriguez",
    date: "2025-01-12",
    readTime: "7 min read",
    category: "Behavior",
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800",
    published: true
  },
  {
    id: '3',
    title: "The Queen's Role in Colony Success",
    excerpt: "Understanding the crucial role of the queen ant in maintaining colony structure, reproduction, and long-term survival strategies.",
    content: "The queen ant is the heart of the colony, responsible for reproduction and maintaining the genetic diversity necessary for colony survival. Her role extends beyond egg-laying to include chemical regulation of colony behavior.",
    author: "Dr. Emily Watson",
    date: "2025-01-10",
    readTime: "6 min read",
    category: "Biology",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    published: true
  },
  {
    id: '4',
    title: "Seasonal Changes in Ant Behavior",
    excerpt: "How our colony adapts to different seasons, from winter preparation to spring expansion and summer foraging patterns.",
    content: "Ant colonies exhibit remarkable seasonal adaptations. From winter dormancy to spring awakening and summer peak activity, each season brings unique challenges and behavioral changes.",
    author: "Dr. James Park",
    date: "2025-01-08",
    readTime: "4 min read",
    category: "Seasonal",
    image: "https://images.pexels.com/photos/1108098/pexels-photo-1108098.jpeg?auto=compress&cs=tinysrgb&w=800",
    published: true
  },
  {
    id: '5',
    title: "Ant Farming: Cultivating Fungus Gardens",
    excerpt: "Learn about leafcutter ants and their sophisticated agricultural practices, growing fungus gardens to feed their colonies.",
    content: "Leafcutter ants are nature's farmers, cultivating fungus gardens with remarkable precision. This agricultural system has evolved over millions of years and represents one of the most sophisticated examples of non-human agriculture.",
    author: "Dr. Lisa Thompson",
    date: "2025-01-05",
    readTime: "8 min read",
    category: "Agriculture",
    image: "https://images.pexels.com/photos/1108097/pexels-photo-1108097.jpeg?auto=compress&cs=tinysrgb&w=800",
    published: true
  },
  {
    id: '6',
    title: "The Science Behind Ant Strength",
    excerpt: "Discover how ants can carry objects many times their own weight and the biomechanics behind their incredible strength.",
    content: "Ants possess incredible strength relative to their size, capable of carrying objects 10-50 times their own weight. This remarkable ability is due to their unique muscle structure and biomechanical advantages.",
    author: "Prof. David Kim",
    date: "2025-01-03",
    readTime: "5 min read",
    category: "Science",
    image: "https://images.pexels.com/photos/1108096/pexels-photo-1108096.jpeg?auto=compress&cs=tinysrgb&w=800",
    published: true
  }
];

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('houseofants-blog-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem('houseofants-blog-posts', JSON.stringify(defaultPosts));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('houseofants-blog-posts', JSON.stringify(newPosts));
  };

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    const newPosts = [newPost, ...posts];
    savePosts(newPosts);
  };

  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    const newPosts = posts.map(post =>
      post.id === id ? { ...post, ...updatedPost } : post
    );
    savePosts(newPosts);
  };

  const deletePost = (id: string) => {
    const newPosts = posts.filter(post => post.id !== id);
    savePosts(newPosts);
  };

  const getPublishedPosts = () => posts.filter(post => post.published);

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPublishedPosts
  };
}