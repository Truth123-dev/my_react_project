

import React, { useState, useEffect } from "react";

// --- Strict TypeScript Interfaces ---

interface CurrentWeather {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

interface ForecastItem {
  date: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
}

// Interfaces matching the exact structure returned by OpenWeather API
interface OpenWeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

interface OpenWeatherWeatherItem {
  description: string;
  icon: string;
}

interface OpenWeatherWind {
  speed: number;
}

interface OpenWeatherCurrentResponse {
  name: string;
  main: OpenWeatherMain;
  weather: OpenWeatherWeatherItem[];
  wind: OpenWeatherWind;
}

interface OpenWeatherForecastListItem {
  dt: number;
  main: OpenWeatherMain;
  weather: OpenWeatherWeatherItem[];
}

interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastListItem[];
}

// --- Mock Data ---
const MOCK_CURRENT: CurrentWeather = {
  city: "San Francisco",
  temp: 18,
  feelsLike: 17,
  humidity: 65,
  windSpeed: 12,
  description: "Partly Cloudy",
  icon: "03d",
};

const MOCK_FORECAST: ForecastItem[] = [
  { date: "Mon", temp: 18, minTemp: 12, maxTemp: 20, description: "Partly Cloudy", icon: "03d" },
  { date: "Tue", temp: 16, minTemp: 11, maxTemp: 18, description: "Light Rain", icon: "10d" },
  { date: "Wed", temp: 15, minTemp: 10, maxTemp: 17, description: "Showers", icon: "09d" },
  { date: "Thu", temp: 19, minTemp: 13, maxTemp: 22, description: "Sunny", icon: "01d" },
  { date: "Fri", temp: 21, minTemp: 14, maxTemp: 24, description: "Sunny", icon: "01d" },
];

export default function WeatherDashboard() {
  const [city, setCity] = useState("San Francisco");
  const [searchQuery, setSearchQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(MOCK_CURRENT);
  const [forecast, setForecast] = useState<ForecastItem[]>(MOCK_FORECAST);

  const formatTemp = (celsius: number) => {
    if (isCelsius) return `${Math.round(celsius)}°C`;
    return `${Math.round((celsius * 9) / 5 + 32)}°F`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setCity(searchQuery);
  };

  useEffect(() => {
    if (!apiKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentWeather({ ...MOCK_CURRENT, city });
      setForecast(MOCK_FORECAST);
      setError(null);
      return;
    }

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Current Weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!currentRes.ok) throw new Error("City not found or invalid API key.");
        const currentData: OpenWeatherCurrentResponse = await currentRes.json();

        // Fetch 5-Day Forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!forecastRes.ok) throw new Error("Forecast fetch failed.");
        const forecastData: OpenWeatherForecastResponse = await forecastRes.json();

        // Parse Current Weather
        setCurrentWeather({
          city: currentData.name,
          temp: currentData.main.temp,
          feelsLike: currentData.main.feels_like,
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          description: currentData.weather[0]?.description || "N/A",
          icon: currentData.weather[0]?.icon || "01d",
        });

        // Parse Forecast
        const dailyData: ForecastItem[] = [];
        const seenDates = new Set<string>();

        forecastData.list.forEach((item: OpenWeatherForecastListItem) => {
          const dateStr = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
          if (!seenDates.has(dateStr) && dailyData.length < 5) {
            seenDates.add(dateStr);
            dailyData.push({
              date: dateStr,
              temp: item.main.temp,
              minTemp: item.main.temp_min,
              maxTemp: item.main.temp_max,
              description: item.weather[0]?.description || "N/A",
              icon: item.weather[0]?.icon || "01d",
            });
          }
        });

        setForecast(dailyData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  // --- SVG Path Calculation for the Mini-Chart ---
  const chartHeight = 100;
  const chartWidth = 500;
  const temps = forecast.map((f) => f.temp);
  const minTemp = Math.min(...temps) - 2;
  const maxTemp = Math.max(...temps) + 2;
  const tempRange = maxTemp - minTemp || 1;

  const points = forecast
    .map((item, index) => {
      const x = (index / (forecast.length - 1)) * (chartWidth - 40) + 20;
      const y = chartHeight - ((item.temp - minTemp) / tempRange) * (chartHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Header Block */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              Weather Forecasting Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {!apiKey ? "Showing Demo Data. Enter your OpenWeather API Key to connect live." : `Monitoring live data for ${currentWeather.city}`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            {/* API Key Input */}
            <input
              type="password"
              placeholder="Paste OpenWeather API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 w-full sm:w-48 text-slate-300"
            />
            {/* Unit Toggle Button */}
            <button
              onClick={() => setIsCelsius(!isCelsius)}
              className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 transition rounded font-medium border border-slate-700"
            >
              Switch to {isCelsius ? "°F" : "°C"}
            </button>
          </div>
        </header>

        {/* Search Controls */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search for a city (e.g., Tokyo, London)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-slate-500"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 transition rounded-lg font-medium text-white shadow-md shadow-sky-950"
          >
            Search
          </button>
        </form>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-900 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Current Weather Card */}
            <div className="md:col-span-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Current Weather</span>
                <h2 className="text-2xl font-bold mt-1 text-slate-200">{currentWeather.city}</h2>
                <p className="text-xs text-slate-400 capitalize">{currentWeather.description}</p>
              </div>

              <div className="my-6 flex items-center justify-between">
                <span className="text-5xl font-bold tracking-tight text-white">
                  {formatTemp(currentWeather.temp)}
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                  alt={currentWeather.description}
                  className="w-16 h-16 bg-slate-800/30 rounded-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-4 border-t border-slate-800/60">
                <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
                  <span className="text-slate-500 block mb-0.5">Feels Like</span>
                  <span className="font-semibold text-slate-300">{formatTemp(currentWeather.feelsLike)}</span>
                </div>
                <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
                  <span className="text-slate-500 block mb-0.5">Humidity</span>
                  <span className="font-semibold text-slate-300">{currentWeather.humidity}%</span>
                </div>
                <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40 col-span-2">
                  <span className="text-slate-500 block mb-0.5">Wind Speed</span>
                  <span className="font-semibold text-slate-300">{currentWeather.windSpeed} m/s</span>
                </div>
              </div>
            </div>

            {/* Interactive Trend Chart and 5-Day Outlook */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Custom SVG Trend Chart */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-slate-400 mb-4">Temperature Trend (Next 5 Days)</h3>
                <div className="relative w-full overflow-hidden">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                    {/* Background Grids */}
                    <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#1e293b" strokeDasharray="4 4" />
                    
                    {/* The Chart Line */}
                    <polyline
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />

                    {/* Data Points / Labels */}
                    {forecast.map((item, index) => {
                      const x = (index / (forecast.length - 1)) * (chartWidth - 40) + 20;
                      const y = chartHeight - ((item.temp - minTemp) / tempRange) * (chartHeight - 30) - 15;
                      return (
                        <g key={index}>
                          <circle cx={x} cy={y} r="4" fill="#38bdf8" />
                          <text
                            x={x}
                            y={y - 8}
                            fill="#94a3b8"
                            fontSize="10"
                            textAnchor="middle"
                            fontWeight="600"
                          >
                            {formatTemp(item.temp)}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* 5-Day Forecast Grid */}
              <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {forecast.map((day, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 flex flex-col items-center justify-between text-center"
                  >
                    <span className="text-xs font-semibold text-slate-400">{day.date}</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                      alt={day.description}
                      className="w-10 h-10 my-1"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-200">{formatTemp(day.temp)}</span>
                      <span className="text-[10px] text-slate-500">{formatTemp(day.minTemp)}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
