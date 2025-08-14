import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Clock, Info, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function HomePage() {
  const [isStreamLoaded, setIsStreamLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedSection direction="up" className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600">
              House of Ants
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Step into the fascinating world of ants at www.houseofants.org! Watch our thriving colony live 24/7 as they build, work, and organize their incredible underground civilization.
          </p>
        </AnimatedSection>

        {/* Live Stream */}
        <AnimatedSection direction="left" delay={0.2} className="bg-gradient-to-br from-white via-lime-50/30 to-emerald-50/30 rounded-2xl shadow-2xl p-6 mb-12 border border-green-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Live Stream</h3>
            </div>
            <a 
              href="https://www.youtube.com/watch?v=XjpD10cdUsA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Watch on YouTube</span>
            </a>
          </div>
          
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-inner">
            {!isStreamLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading live stream...</p>
                </div>
              </div>
            )}
            <iframe
              src="https://www.youtube.com/embed/XjpD10cdUsA?autoplay=0&mute=0"
              title="House of Ants Live Stream"
              className="w-full h-full"
              allowFullScreen
              onLoad={() => setIsStreamLoaded(true)}
            />
          </div>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <AnimatedSection direction="left" delay={0.3} className="bg-gradient-to-br from-white/80 via-lime-50/60 to-emerald-50/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:from-white/90 hover:via-lime-50/80 hover:to-emerald-50/80 transition-all duration-300 hover:shadow-2xl border border-green-100">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-green-500 to-lime-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">24/7</h3>
            <p className="text-gray-600">Continuous live streaming of our ant colony</p>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.4} className="bg-gradient-to-br from-white/80 via-lime-50/60 to-emerald-50/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:from-white/90 hover:via-lime-50/80 hover:to-emerald-50/80 transition-all duration-300 hover:shadow-2xl border border-green-100">
            <div className="w-16 h-16 bg-gradient-to-br from-lime-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">Active Colony</h3>
            <p className="text-gray-600">Thousands of ants working together in harmony</p>
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={0.5} className="bg-gradient-to-br from-white/80 via-lime-50/60 to-emerald-50/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:from-white/90 hover:via-lime-50/80 hover:to-emerald-50/80 transition-all duration-300 hover:shadow-2xl border border-green-100">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 via-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">Educational</h3>
            <p className="text-gray-600">Learn about ant behavior and colony dynamics</p>
          </AnimatedSection>
        </div>

        {/* About Section */}
        <AnimatedSection direction="right" delay={0.6} className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-green-100">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-600 bg-clip-text text-transparent mb-6 text-center">About Our Colony</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-4">The Underground City</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our ant colony is a marvel of natural engineering and social organization. Watch as thousands of ants work together to maintain their underground civilization, each playing a crucial role in the colony's survival and growth.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the tireless workers carrying food and building materials to the careful tending of larvae, every moment offers a glimpse into one of nature's most sophisticated societies.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-4">What You'll See</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Tunnels and chambers being excavated and maintained</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Food foraging and storage activities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Larvae care and colony expansion</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Complex communication and coordination</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}