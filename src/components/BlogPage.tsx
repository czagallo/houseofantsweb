import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import AnimatedSection from './AnimatedSection';

export default function BlogPage() {
  const { getPublishedPosts } = useBlogPosts();
  const blogPosts = getPublishedPosts();

  const categories = ["All", "Architecture", "Behavior", "Biology", "Seasonal", "Agriculture", "Science"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <AnimatedSection direction="up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-lime-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Ant Colony Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into the fascinating world of ants with insights from our researchers and observations from the House of Ants colony.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection direction="up" delay={0.2} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-white/80 to-lime-50/80 hover:from-green-100 hover:to-emerald-100 text-gray-700 hover:text-green-800 transition-all duration-300 border border-green-200 hover:border-green-300 shadow-sm hover:shadow-md"
            >
              {category}
            </button>
          ))}
        </AnimatedSection>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
        <AnimatedSection direction="left" delay={0.3} className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 rounded-2xl shadow-2xl overflow-hidden mb-12 border border-green-100">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-lime-100 text-green-800 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-full text-sm font-medium">
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <AnimatedSection
              key={post.id}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={0.4 + (index * 0.1)}
            >
              <div className="bg-gradient-to-br from-white/80 via-lime-50/40 to-emerald-50/40 rounded-2xl shadow-lg overflow-hidden border border-green-100 group cursor-pointer hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <button className="flex items-center space-x-1 text-green-600 font-medium hover:text-green-700 transition-colors duration-300">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Load More Button */}
        <AnimatedSection direction="up" delay={0.8} className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
            Load More Posts
          </button>
        </AnimatedSection>
      </div>
    </div>
  );
}