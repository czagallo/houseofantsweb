import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Thermometer, Droplets, BarChart3, Clock } from 'lucide-react';

interface DataPoint {
  timestamp: Date;
  temperature: number;
  humidity: number;
}

interface HistoricalStats {
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  avgHumidity: number;
  minHumidity: number;
  maxHumidity: number;
  dataPoints: number;
  timeRange: string;
}

export default function HistoricalDataChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [stats, setStats] = useState<HistoricalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | 'all'>('24h');
  const [hoveredPoint, setHoveredPoint] = useState<{
    type: 'temperature' | 'humidity';
    data: DataPoint;
    x: number;
    y: number;
    chartX: number;
  } | null>(null);

  const parseCSV = (csvText: string): DataPoint[] => {
    const lines = csvText.trim().split('\n');
    const dataPoints: DataPoint[] = [];
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const [timestampStr, tempStr, humidityStr] = line.split(',');
      
      try {
        const timestamp = new Date(timestampStr);
        const temperature = parseFloat(tempStr);
        const humidity = parseFloat(humidityStr);
        
        if (!isNaN(temperature) && !isNaN(humidity) && !isNaN(timestamp.getTime())) {
          dataPoints.push({ timestamp, temperature, humidity });
        }
      } catch (e) {
        console.warn('Skipping invalid line:', line);
      }
    }
    
    return dataPoints.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const filterDataByTimeRange = (data: DataPoint[], range: '24h' | '7d' | 'all'): DataPoint[] => {
    if (range === 'all') return data;
    
    const now = new Date();
    const cutoff = new Date();
    
    if (range === '24h') {
      cutoff.setHours(now.getHours() - 24);
    } else if (range === '7d') {
      cutoff.setDate(now.getDate() - 7);
    }
    
    return data.filter(point => point.timestamp >= cutoff);
  };

  const calculateStats = (data: DataPoint[]): HistoricalStats => {
    if (data.length === 0) {
      return {
        avgTemp: 0, minTemp: 0, maxTemp: 0,
        avgHumidity: 0, minHumidity: 0, maxHumidity: 0,
        dataPoints: 0, timeRange: ''
      };
    }

    const temps = data.map(d => d.temperature);
    const humidities = data.map(d => d.humidity);
    
    const minTime = new Date(Math.min(...data.map(d => d.timestamp.getTime())));
    const maxTime = new Date(Math.max(...data.map(d => d.timestamp.getTime())));
    
    return {
      avgTemp: temps.reduce((a, b) => a + b, 0) / temps.length,
      minTemp: Math.min(...temps),
      maxTemp: Math.max(...temps),
      avgHumidity: humidities.reduce((a, b) => a + b, 0) / humidities.length,
      minHumidity: Math.min(...humidities),
      maxHumidity: Math.max(...humidities),
      dataPoints: data.length,
      timeRange: `${minTime.toLocaleDateString()} - ${maxTime.toLocaleDateString()}`
    };
  };

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/Antfarm Climate_export_202508191936.csv');
      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }
      
      const csvText = await response.text();
      const allData = parseCSV(csvText);
      const filteredData = filterDataByTimeRange(allData, timeRange);
      
      setData(filteredData);
      setStats(calculateStats(filteredData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
    
    // Refresh data every 5 minutes to catch file updates
    const interval = setInterval(fetchHistoricalData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const createMiniChart = (data: DataPoint[], type: 'temperature' | 'humidity') => {
    if (data.length === 0) return null;
    
    const values = data.map(d => type === 'temperature' ? d.temperature : d.humidity);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    
    // Sample data points for mini chart (max 50 points for performance)
    const step = Math.max(1, Math.floor(data.length / 50));
    const sampledData = data.filter((_, i) => i % step === 0);
    
    const points = sampledData.map((point, i) => {
      const value = type === 'temperature' ? point.temperature : point.humidity;
      const x = (i / (sampledData.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      
      // Find closest data point
      const dataIndex = Math.round((x / 100) * (sampledData.length - 1));
      const closestPoint = sampledData[dataIndex];
      
      if (closestPoint) {
        setHoveredPoint({
          type,
          data: closestPoint,
          x: e.clientX,
          y: e.clientY,
          chartX: x
        });
      }
    };

    const handleMouseLeave = () => {
      setHoveredPoint(null);
    };
    
    return (
      <div 
        className="relative cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg 
          className="w-full h-16" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={type === 'temperature' ? '#f59e0b' : '#3b82f6'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={type === 'temperature' ? '#f59e0b' : '#3b82f6'} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <polyline
            points={points}
            fill="none"
            stroke={type === 'temperature' ? '#f59e0b' : '#3b82f6'}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={`0,100 ${points} 100,100`}
            fill={`url(#gradient-${type})`}
          />
          
        </svg>
        
        {/* Vertical hover line - extends through entire chart container */}
        {hoveredPoint && hoveredPoint.type === type && (
          <div
            className="absolute top-0 bottom-0 w-px bg-black opacity-60 pointer-events-none"
            style={{ left: `${hoveredPoint.chartX}%` }}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-100">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading historical data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-white/90 via-red-50/50 to-pink-50/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-red-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Historical Data Unavailable</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-100"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-4 sm:mb-0">
          📊 Historical Climate Data
        </h3>
        
        <div className="flex space-x-2">
          {(['24h', '7d', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-blue-100'
              }`}
            >
              {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Temperature Stats */}
        <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Temperature</h4>
                <p className="text-sm text-gray-600">°C</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">
                {stats?.avgTemp.toFixed(1)}°
              </p>
              <p className="text-sm text-gray-600">Average</p>
            </div>
          </div>
          
          {createMiniChart(data, 'temperature')}
          
          <div className="flex justify-between mt-4 text-sm">
            <div className="flex items-center space-x-1 text-blue-600">
              <TrendingDown className="w-4 h-4" />
              <span>{stats?.minTemp.toFixed(1)}°</span>
            </div>
            <div className="flex items-center space-x-1 text-red-600">
              <TrendingUp className="w-4 h-4" />
              <span>{stats?.maxTemp.toFixed(1)}°</span>
            </div>
          </div>
        </div>

        {/* Humidity Stats */}
        <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Humidity</h4>
                <p className="text-sm text-gray-600">%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {stats?.avgHumidity.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">Average</p>
            </div>
          </div>
          
          {createMiniChart(data, 'humidity')}
          
          <div className="flex justify-between mt-4 text-sm">
            <div className="flex items-center space-x-1 text-orange-600">
              <TrendingDown className="w-4 h-4" />
              <span>{stats?.minHumidity.toFixed(1)}%</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span>{stats?.maxHumidity.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Info */}
      <div className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 rounded-xl p-4 border border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Data Range: {stats?.timeRange}</span>
          </div>
          <div className="text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredPoint && (
        <div
          className="fixed z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-2 pointer-events-none text-sm"
          style={{
            left: `${hoveredPoint.x + 10}px`,
            top: `${hoveredPoint.y - 60}px`
          }}
        >
          <div className="font-medium text-gray-800 mb-1">
            {hoveredPoint.data.timestamp.toLocaleDateString()} {hoveredPoint.data.timestamp.toLocaleTimeString()}
          </div>
          <div className={`text-base font-bold ${
            hoveredPoint.type === 'temperature' ? 'text-orange-600' : 'text-blue-600'
          }`}>
            {hoveredPoint.type === 'temperature' 
              ? `${hoveredPoint.data.temperature.toFixed(1)}°C`
              : `${hoveredPoint.data.humidity.toFixed(1)}%`
            }
          </div>
        </div>
      )}
    </motion.div>
  );
}
