import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users, Zap, Shield, Heart, Brain } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function AntypediaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const antSpecies = [
    {
      id: 1,
      name: "Leafcutter Ant",
      scientificName: "Atta cephalotes",
      category: "Agricultural",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Master farmers that cultivate fungus gardens to feed their colonies.",
      characteristics: ["Fungus cultivation", "Complex social structure", "Leaf harvesting"],
      habitat: "Tropical rainforests",
      size: "2-20mm",
      lifespan: "Queen: 10-20 years, Workers: 2-6 months",
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Fire Ant",
      scientificName: "Solenopsis invicta",
      category: "Aggressive",
      icon: <Zap className="w-6 h-6" />,
      description: "Highly aggressive ants known for their painful stings and rapid colony expansion.",
      characteristics: ["Painful sting", "Rapid reproduction", "Territorial behavior"],
      habitat: "Warm climates, disturbed soils",
      size: "2-6mm",
      lifespan: "Queen: 2-6 years, Workers: 1-6 months",
      image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      name: "Army Ant",
      scientificName: "Eciton burchellii",
      category: "Nomadic",
      icon: <Shield className="w-6 h-6" />,
      description: "Nomadic hunters that form temporary colonies and devastating hunting raids.",
      characteristics: ["Nomadic lifestyle", "Massive raids", "Temporary nests"],
      habitat: "Tropical forests",
      size: "3-12mm",
      lifespan: "Queen: 5-10 years, Workers: 1-3 months",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      name: "Carpenter Ant",
      scientificName: "Camponotus pennsylvanicus",
      category: "Wood-dwelling",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Large ants that excavate wood to create their nests, often in dead or decaying wood.",
      characteristics: ["Wood excavation", "Large size", "Nocturnal activity"],
      habitat: "Forests, wooden structures",
      size: "6-13mm",
      lifespan: "Queen: 10-25 years, Workers: 2-7 months",
      image: "https://images.pexels.com/photos/1108098/pexels-photo-1108098.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      name: "Honeypot Ant",
      scientificName: "Myrmecocystus mexicanus",
      category: "Storage",
      icon: <Heart className="w-6 h-6" />,
      description: "Specialized ants with workers that store honey in their enlarged abdomens.",
      characteristics: ["Honey storage", "Desert adaptation", "Specialized castes"],
      habitat: "Arid and semi-arid regions",
      size: "4-15mm",
      lifespan: "Queen: 15-20 years, Workers: 1-2 years",
      image: "https://images.pexels.com/photos/1108097/pexels-photo-1108097.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 6,
      name: "Weaver Ant",
      scientificName: "Oecophylla smaragdina",
      category: "Arboreal",
      icon: <Brain className="w-6 h-6" />,
      description: "Intelligent ants that weave leaves together using silk from their larvae to create nests.",
      characteristics: ["Leaf weaving", "Arboreal lifestyle", "Cooperative construction"],
      habitat: "Tropical tree canopies",
      size: "8-10mm",
      lifespan: "Queen: 8-10 years, Workers: 2-4 months",
      image: "https://images.pexels.com/photos/1108096/pexels-photo-1108096.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const categories = ["All", "Agricultural", "Aggressive", "Nomadic", "Wood-dwelling", "Storage", "Arboreal"];

  const filteredAnts = antSpecies.filter(ant =>
    ant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ant.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <AnimatedSection direction="up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-lime-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Antypedia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your comprehensive guide to the diverse world of ant species. Discover the incredible variety and unique adaptations of ants from around the globe.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search ant species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-green-200 rounded-lg leading-5 bg-gradient-to-r from-white to-lime-50/50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg"
            />
          </div>
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <AnimatedSection direction="left" delay={0.3} className="bg-gradient-to-br from-white/80 via-lime-50/60 to-emerald-50/60 rounded-2xl p-6 text-center border border-green-100 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">15,000+</h3>
            <p className="text-gray-600">Known Ant Species</p>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.4} className="bg-gradient-to-br from-white/80 via-lime-50/60 to-emerald-50/60 rounded-2xl p-6 text-center border border-green-100 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">6</h3>
            <p className="text-gray-600">Species Featured</p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.5} className="bg-gradient-to-br from-white/80 via-lime-50/60 to-emerald-50/60 rounded-2xl p-6 text-center border border-green-100 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">100M+</h3>
            <p className="text-gray-600">Years of Evolution</p>
          </AnimatedSection>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAnts.map((ant, index) => (
            <AnimatedSection
              key={ant.id}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={0.6 + (index * 0.1)}
            >
              <div className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 rounded-2xl shadow-lg overflow-hidden border border-green-100 group cursor-pointer hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={ant.image}
                    alt={ant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                      {ant.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-white/90 to-lime-50/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      {ant.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-1">
                    {ant.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-3">{ant.scientificName}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{ant.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-700 font-medium">{ant.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Habitat:</span>
                      <span className="text-gray-700 font-medium">{ant.habitat}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Lifespan:</span>
                      <span className="text-gray-700 font-medium">{ant.lifespan}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Characteristics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {ant.characteristics.map((char, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gradient-to-r from-green-100 to-lime-100 text-green-800 rounded-full text-xs"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* No Results */}
        {filteredAnts.length === 0 && (
          <AnimatedSection direction="up" className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No species found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse all categories.</p>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}