import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wifi, WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import HistoricalDataChart from './HistoricalDataChart';

interface GoveeDevice {
  device: string;
  model: string;
  deviceName: string;
  controllable: boolean;
  retrievable: boolean;
  supportCmds: string[];
  properties: {
    online: boolean;
    powerSwitch: number;
    brightness: number;
    color: {
      r: number;
      g: number;
      b: number;
    };
  };
}

interface DeviceStatus {
  device: string;
  model: string;
  properties: Array<{
    online: boolean;
    powerSwitch?: number;
    brightness?: number;
    color?: {
      r: number;
      g: number;
      b: number;
    };
    temperature?: number; // in Fahrenheit
    humidity?: number;
  }>;
}

interface SensorData {
  temperature: {
    fahrenheit: number;
    celsius: number;
  };
  humidity: number;
  isOnline: boolean;
  lastUpdated: string;
}

export default function FormicariumPage() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingRealData, setIsUsingRealData] = useState(false);
  const [apiKey, setApiKey] = useState('8647a6ed-61f3-4cd2-8ecb-dc452c4bfe6c');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualTemp, setManualTemp] = useState('');
  const [manualHumidity, setManualHumidity] = useState('');
  const deviceMac = 'E2:A9:18:1F:68:82:D8:B7';

  // Convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (fahrenheit: number): number => {
    return Math.round(((fahrenheit - 32) * 5/9) * 10) / 10;
  };

  // Fetch device status from Govee API
  const fetchSensorData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch data from GitHub Actions generated file
      try {
        // Fetch directly from GitHub raw content to get real-time updates
        const response = await fetch('https://raw.githubusercontent.com/czagallo/houseofantsweb/main/public/sensor-data.json?' + Date.now()); // Cache busting

        if (!response.ok) {
          throw new Error(`Failed to fetch sensor data: ${response.status}`);
        }

        const text = await response.text();
        
        // Check if response is empty
        if (!text.trim()) {
          throw new Error('Sensor data file is empty - GitHub Actions may not have run yet');
        }
        
        // Check if response is HTML (404 page) instead of JSON
        if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
          throw new Error('Sensor data file not found - GitHub Actions may not have run yet');
        }
        
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          throw new Error(`Invalid JSON in sensor data file: ${parseError.message}`);
        }
        
        if (data.code !== 200) {
          throw new Error(data.message || 'API returned error');
        }

        // Parse GitHub Actions stored Govee API response
        if (data.data && data.data.payload && data.data.payload.capabilities) {
          const capabilities = data.data.payload.capabilities;
          let temperature = null;
          let humidity = null;
          
          capabilities.forEach(cap => {
            if (cap.type === 'devices.capabilities.temperature') {
              temperature = cap.value; // Should be in Fahrenheit
            } else if (cap.type === 'devices.capabilities.humidity') {
              humidity = cap.value;
            }
          });

          if (temperature !== null && humidity !== null) {
            setSensorData({
              temperature: {
                fahrenheit: Math.round(temperature * 10) / 10,
                celsius: fahrenheitToCelsius(temperature),
              },
              humidity: Math.round(humidity * 10) / 10,
              isOnline: true,
              lastUpdated: data.timestamp ? new Date(data.timestamp).toLocaleString() + ` (${data.source || 'GitHub Actions'})` : new Date().toLocaleString() + ' (GitHub Actions)',
            });
            setIsUsingRealData(true);
            setError(null);
            return;
          }
        }
        
        throw new Error('Invalid response format from Govee API');
        
      } catch (fetchError) {
        console.warn('GitHub Actions data not available, falling back to demo data:', fetchError);
        setError(`GitHub Actions not set up yet: ${fetchError.message}. Showing demo data.`);
        useMockData();
      }
      
    } catch (err) {
      console.error('API Error:', err);
      setError(`Error: ${err.message}. Using demo data.`);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration when no API key is provided
  const useMockData = () => {
    // Simulate realistic formicarium conditions
    const baseTemp = 74; // Base temperature in Fahrenheit
    const tempVariation = (Math.sin(Date.now() / 60000) * 2) + (Math.random() * 2 - 1); // Slow oscillation + small random
    const mockTemp = baseTemp + tempVariation; // 72-76°F range
    
    const baseHumidity = 68; // Base humidity
    const humidityVariation = (Math.cos(Date.now() / 80000) * 5) + (Math.random() * 4 - 2); // Slow oscillation + small random
    const mockHumidity = Math.max(50, Math.min(85, baseHumidity + humidityVariation)); // 50-85% range
    
    setSensorData({
      temperature: {
        fahrenheit: Math.round(mockTemp * 10) / 10,
        celsius: fahrenheitToCelsius(mockTemp),
      },
      humidity: Math.round(mockHumidity * 10) / 10,
      isOnline: true,
      lastUpdated: new Date().toLocaleString() + ' (Demo Data)',
    });
    setIsUsingRealData(false);
    setLoading(false);
  };

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const tempF = parseFloat(manualTemp);
    const humidity = parseFloat(manualHumidity);
    
    if (isNaN(tempF) || isNaN(humidity)) {
      setError('Please enter valid numbers for temperature and humidity');
      return;
    }
    
    setSensorData({
      temperature: {
        fahrenheit: Math.round(tempF * 10) / 10,
        celsius: fahrenheitToCelsius(tempF),
      },
      humidity: Math.round(humidity * 10) / 10,
      isOnline: true,
      lastUpdated: new Date().toLocaleString() + ' (Manual Entry)',
    });
    
    setShowManualEntry(false);
    setManualTemp('');
    setManualHumidity('');
    setError(null);
  };

  useEffect(() => {
    // Automatically fetch data with the provided API key
    fetchSensorData();
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('govee-api-key', apiKey);
      fetchSensorData();
    }
  }, [apiKey]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      fetchSensorData();
      setShowApiKeyInput(false);
    }
  };

  const getTemperatureStatus = (celsius: number) => {
    if (celsius < 20) return { status: 'cold', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (celsius > 28) return { status: 'hot', color: 'text-red-600', bg: 'bg-red-100' };
    return { status: 'optimal', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const getHumidityStatus = (humidity: number) => {
    if (humidity < 50) return { status: 'low', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (humidity > 80) return { status: 'high', color: 'text-blue-600', bg: 'bg-blue-100' };
    return { status: 'optimal', color: 'text-green-600', bg: 'bg-green-100' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <AnimatedSection direction="up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-lime-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Formicarium Monitor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time temperature and humidity monitoring for optimal ant colony conditions using Govee sensors.
          </p>
        </AnimatedSection>

        {/* API Key Input Modal */}
        {showApiKeyInput && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Govee API Key</h3>
              <form onSubmit={handleApiKeySubmit}>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Your Govee API Key"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                />
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowApiKeyInput(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600"
                  >
                    Connect
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Manual Data Entry Modal */}
        {showManualEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Sensor Data Manually</h3>
              <form onSubmit={handleManualEntry}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°F)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={manualTemp}
                    onChange={(e) => setManualTemp(e.target.value)}
                    placeholder="e.g., 74.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={manualHumidity}
                    onChange={(e) => setManualHumidity(e.target.value)}
                    placeholder="e.g., 65.0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowManualEntry(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600"
                  >
                    Update Data
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <AnimatedSection direction="up" className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading sensor data...</p>
          </AnimatedSection>
        )}

        {/* Device Info */}
        <AnimatedSection direction="up" delay={0.2} className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 rounded-2xl p-6 mb-8 shadow-lg border border-green-100">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Monitoring Device {!isUsingRealData && '(Demo Mode)'}
            </h3>
            <p className="text-gray-600 text-sm">MAC: {deviceMac}</p>
            <p className="text-gray-500 text-xs mt-1">Govee H5179 Temperature & Humidity Sensor</p>
            {!isUsingRealData && (
              <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Setup Required:</strong> To get real sensor data, add your Govee API key as a GitHub secret 
                  and the GitHub Actions workflow will automatically fetch data every 5 minutes.
                </p>
                <button
                  onClick={() => setShowManualEntry(true)}
                  className="mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm"
                >
                  Enter Data Manually
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Error State */}
        {error && (
          <AnimatedSection direction="up" className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 mb-8 border border-red-200">
            <div className="flex items-center space-x-3 text-red-700">
              <AlertTriangle className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Error</h3>
                <p>{error}</p>
              </div>
            </div>
            <button
              onClick={fetchSensorData}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Retry
            </button>
          </AnimatedSection>
        )}

        {/* Sensor Data Display */}
        {sensorData && !loading && (
          <>
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Temperature Card */}
              <AnimatedSection direction="left" delay={0.3}>
                <div className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 rounded-2xl p-8 shadow-2xl border border-green-100 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Thermometer className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Temperature</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTemperatureStatus(sensorData.temperature.celsius).bg} ${getTemperatureStatus(sensorData.temperature.celsius).color}`}>
                      {getTemperatureStatus(sensorData.temperature.celsius).status}
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">
                      {sensorData.temperature.celsius}°C
                    </div>
                    <div className="text-gray-500">
                      ({sensorData.temperature.fahrenheit}°F)
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-lime-100 rounded-lg p-4">
                    <div className="text-sm text-green-800">
                      <strong>Optimal Range:</strong> 20-28°C (68-82°F)
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Humidity Card */}
              <AnimatedSection direction="right" delay={0.4}>
                <div className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 rounded-2xl p-8 shadow-2xl border border-green-100 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Humidity</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHumidityStatus(sensorData.humidity).bg} ${getHumidityStatus(sensorData.humidity).color}`}>
                      {getHumidityStatus(sensorData.humidity).status}
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-2">
                      {sensorData.humidity}%
                    </div>
                    <div className="text-gray-500">
                      Relative Humidity
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-lime-100 rounded-lg p-4">
                    <div className="text-sm text-green-800">
                      <strong>Optimal Range:</strong> 50-80% RH
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Status and Controls */}
            <AnimatedSection direction="up" delay={0.5} className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 rounded-2xl p-8 shadow-2xl border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${sensorData.isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  <span className="text-lg font-semibold text-gray-800">
                    Sensor Status: {sensorData.isOnline ? (isUsingRealData ? 'Online' : 'Online (Demo)') : 'Offline'}
                  </span>
                </div>
                <button
                  onClick={fetchSensorData}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Last Updated</h4>
                  <p className="text-gray-600">{sensorData.lastUpdated}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Connection</h4>
                  <div className="flex items-center space-x-2">
                    {sensorData.isOnline ? (
                      <Wifi className="w-4 h-4 text-green-600" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-600" />
                    )}
                    <span className={sensorData.isOnline ? 'text-green-600' : 'text-red-600'}>
                      {sensorData.isOnline ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Historical Data Chart */}
            <div className="mt-8">
              <HistoricalDataChart />
            </div>

            {/* Care Tips */}
            <AnimatedSection direction="up" delay={0.6} className="bg-gradient-to-br from-white/90 via-lime-50/50 to-emerald-50/50 rounded-2xl p-8 shadow-2xl border border-green-100 mt-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent mb-6">
                Formicarium Care Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    <span>Temperature Management</span>
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Maintain 20-28°C for most ant species</li>
                    <li>• Use heating cables for consistent warmth</li>
                    <li>• Avoid direct sunlight and heat sources</li>
                    <li>• Monitor temperature fluctuations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span>Humidity Control</span>
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Keep humidity between 50-80%</li>
                    <li>• Use water reservoirs for moisture</li>
                    <li>• Ensure proper ventilation</li>
                    <li>• Adjust based on ant species needs</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}
      </div>
    </div>
  );
}