/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useMemo } from 'react';
import { 
  QueryClient, 
  QueryClientProvider, 
  useQuery} from '@tanstack/react-query';
import { 
  Search, 
  Star, 
  RefreshCw, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

// ==========================================
// 1. DATA TYPES & STRUCTURES
// ==========================================

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

interface QueueItem {
  id: string;
  url: string;
  resolve: (value: any) => void;
   
  reject: (reason: any) => void;
  timestamp: number;
}

// ==========================================
// 2. RESILIENT CLIENT-SIDE REQUEST SCHEDULER
// ==========================================

class ClientSideRateLimitInterceptor {
  private queue: QueueItem[] = [];
  private processing = false;
  private minIntervalMs = 1500; // Time buffer to space out requests 
  private onQueueUpdate: (queueLength: number) => void = () => {};
  private onLogUpdate: (message: string) => void = () => {};

  public registerCallbacks(
    onQueueUpdate: (queueLength: number) => void,
    onLogUpdate: (message: string) => void
  ) {
    this.onQueueUpdate = onQueueUpdate;
    this.onLogUpdate = onLogUpdate;
  }

  /**
   * Enqueues incoming requests to serialize execution and mitigate rate-limit thresholds.
   */
  public async fetchResilient(url: string, simulateFailures: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const item: QueueItem = {
        id: Math.random().toString(36).substring(2, 9),
        url,
        resolve,
        reject,
        timestamp: Date.now(),
      };
      this.queue.push(item);
      this.onQueueUpdate(this.queue.length);
      this.onLogUpdate(`Enqueued request for: ${url.split('/').pop()}`);
      this.processQueue(simulateFailures);
    });
  }

  private async processQueue(simulateFailures: boolean) {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    const currentTask = this.queue[0];
    this.onLogUpdate(`Processing: ${currentTask.url.split('/').pop()}`);

    try {
      const data = await this.executeFetch(currentTask.url, simulateFailures);
      currentTask.resolve(data);
      this.queue.shift();
      this.onQueueUpdate(this.queue.length);
      this.onLogUpdate(`Success: Data updated.`);
    } catch (error: any) {
      this.onLogUpdate(`Simulated network failure. Retrying with back-off delay...`);
      // Standard back-off pause duration before resolving/requeuing
      await new Promise((res) => setTimeout(res, 2000));
      currentTask.reject(error);
      this.queue.shift();
      this.onQueueUpdate(this.queue.length);
    } finally {
      this.processing = false;
      
      // Enforce pacing interval delay between consecutive requests
      if (this.queue.length > 0) {
        this.onLogUpdate(`Enforcing ${this.minIntervalMs}ms rate limit buffer...`);
        setTimeout(() => this.processQueue(simulateFailures), this.minIntervalMs);
      }
    }
  }

  private async executeFetch(_url: string, simulateFailures: boolean): Promise<CoinData[]> {
    if (simulateFailures && Math.random() < 0.3) {
      throw new Error("HTTP 429: Rate Limit Exceeded (Simulated)");
    }
    
    // Fallback Mock Data Generation to ensure continuous visual presentation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.generateMockCryptoData());
      }, 450);
    });
  }

  private generateMockCryptoData(): CoinData[] {
    const basePrices: Record<string, number> = {
      bitcoin: 63500,
      ethereum: 3420,
      solana: 139,
      cardano: 0.45,
      ripple: 0.51,
      polkadot: 5.95,
      dogecoin: 0.11,
      chainlink: 14.20
    };

    return Object.entries(basePrices).map(([id, price]) => {
      const changePercent = (Math.random() * 4) - 2; // Simulated daily fluctuations
      const newPrice = price * (1 + changePercent / 100);
      return {
        id,
        symbol: id.substring(0, 3).toUpperCase(),
        name: id.charAt(0).toUpperCase() + id.slice(1),
        current_price: parseFloat(newPrice.toFixed(2)),
        market_cap: Math.round(newPrice * 18500000),
        price_change_percentage_24h: parseFloat(changePercent.toFixed(2)),
        last_updated: new Date().toISOString()
      };
    });
  }
}

// Global Singleton Instance
const apiInterceptor = new ClientSideRateLimitInterceptor();

// ==========================================
// 3. TANSTACK QUERY SETUP
// ==========================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// ==========================================
// 4. MAIN EXPORT COMPONENT
// ==========================================

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CryptoDashboard />
    </QueryClientProvider>
  );
}

function CryptoDashboard() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('crypto_watchlist');
    return saved ? JSON.parse(saved) : ['bitcoin', 'ethereum', 'solana'];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const [simulateFailures, setSimulateFailures] = useState(true);
  const [queueLength, setQueueLength] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Synchronize watchlist items with local client storage
  useEffect(() => {
    localStorage.setItem('crypto_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Hook Interceptor Metrics to the UI Lifecycle
  useEffect(() => {
    apiInterceptor.registerCallbacks(
      (len) => setQueueLength(len),
      (msg) => setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] ${msg}`, 
        ...prev.slice(0, 14)
      ])
    );
  }, []);

  // TanStack Query configured for 8-second background polling
  const { data: coins, isFetching, error, refetch } = useQuery<CoinData[]>({
    queryKey: ['cryptoMarkets'],
    queryFn: () => apiInterceptor.fetchResilient('https://api.coingecko.com/api/v3/coins/markets', simulateFailures),
    refetchInterval: 8000, 
  });

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Memoized Filtering Logic
  const processedCoins = useMemo(() => {
    if (!coins) return [];
    return coins.filter(coin => {
      const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesWatchlist = showWatchlistOnly ? watchlist.includes(coin.id) : true;
      return matchesSearch && matchesWatchlist;
    });
  }, [coins, searchQuery, showWatchlistOnly, watchlist]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Block */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="text-indigo-400 h-6 w-6" />
              Global Cryptocurrency Market Monitor
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Client-Side Data Interception &amp; Request Spacing Layer Demonstration
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 text-sm text-slate-300 rounded-md border border-slate-700 transition"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              Sync Now
            </button>
            <button
              onClick={() => {
                setLogs(prev => [`[SYSTEM] Dispatching multiple polling calls to test queue spacing...`, ...prev]);
                refetch();
                refetch();
                refetch();
              }}
              className="px-3 py-1.5 bg-indigo-950/50 hover:bg-indigo-900/40 text-xs text-indigo-300 rounded-md border border-indigo-800 transition"
            >
              Trigger Request Burst
            </button>
          </div>
        </header>

        {/* Diagnostic Dashboards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Rate Limit Diagnostic View */}
          <div className="md:col-span-2 bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-semibold text-slate-200 flex items-center gap-2 text-sm">
                <AlertTriangle className="text-amber-500 h-4 w-4" />
                Resiliency Engine Control
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Mock Network Throttling:</span>
                <button
                  onClick={() => setSimulateFailures(!simulateFailures)}
                  className={`px-2 py-0.5 text-xs rounded transition font-medium ${
                    simulateFailures 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-600/50' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-800/50'
                  }`}
                >
                  {simulateFailures ? 'Active (30% loss)' : 'Inactive'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Queue Backlog</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xl font-bold ${queueLength > 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                    {queueLength}
                  </span>
                  <span className="text-[10px] text-slate-500">pending</span>
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Serialization Spacing</span>
                <span className="text-xs font-semibold text-indigo-400 block mt-1">
                  1500ms Delay
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Polling Cycle</span>
                <span className="text-xs font-semibold text-emerald-400 block mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Every 8s
                </span>
              </div>
            </div>
          </div>

          {/* Console logger */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-40 md:h-auto">
            <span className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <CheckCircle className="text-emerald-500 h-3.5 w-3.5" /> Interceptor Console logs
            </span>
            <div className="bg-slate-950 p-2 rounded border border-slate-850 flex-grow overflow-y-auto font-mono text-[10px] space-y-1 text-slate-400">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">No events intercepted yet. Polling will trigger shortly...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="truncate select-none">{log}</div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Filtering & View Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search assets by symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-sm rounded-lg pl-9 pr-4 py-2 text-slate-200 border border-slate-800 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition ${
                showWatchlistOnly 
                  ? 'bg-amber-950/30 text-amber-300 border-amber-800' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Star className={`h-4 w-4 ${showWatchlistOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
              Watchlist {watchlist.length > 0 && `(${watchlist.length})`}
            </button>
          </div>
        </div>

        {/* Live Data Grid */}
        {error ? (
          <div className="p-8 bg-red-950/20 border border-red-900/50 rounded-xl text-center text-red-300 space-y-2">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
            <h3 className="font-semibold text-white">Temporary Request Throttled</h3>
            <p className="text-sm max-w-md mx-auto text-red-400">
              Simulation returned rate limits. Retrying execution with exponential backoff queuing.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-400 bg-slate-900/30">
                    <th className="py-4 px-6 font-medium w-16 text-center">Watch</th>
                    <th className="py-4 px-4 font-medium">Asset Name</th>
                    <th className="py-4 px-4 font-medium text-right">Current Price</th>
                    <th className="py-4 px-4 font-medium text-right">24h Shift</th>
                    <th className="py-4 px-4 font-medium text-right">Est. Market Cap</th>
                    <th className="py-4 px-6 font-medium text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-sm">
                  {processedCoins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-500">
                        {isFetching ? "Syncing initial asset data..." : "No assets matched selected criteria."}
                      </td>
                    </tr>
                  ) : (
                    processedCoins.map((coin) => {
                      const isFavorited = watchlist.includes(coin.id);
                      return (
                        <tr key={coin.id} className="hover:bg-slate-900/20 transition duration-150">
                          <td className="py-4 px-6 text-center">
                            <button 
                              onClick={() => toggleWatchlist(coin.id)}
                              className="focus:outline-none"
                            >
                              <Star className={`h-4 w-4 transition-colors ${
                                isFavorited ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-slate-400'
                              }`} />
                            </button>
                          </td>
                          <td className="py-4 px-4 font-medium text-white">
                            <div className="flex items-center gap-2">
                              <span>{coin.name}</span>
                              <span className="text-xs text-slate-500 uppercase">{coin.symbol}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-mono text-slate-200">
                            ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-4 px-4 text-right font-mono">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${
                              coin.price_change_percentage_24h >= 0 
                                ? 'text-emerald-400 bg-emerald-950/30' 
                                : 'text-rose-400 bg-rose-950/30'
                            }`}>
                              {coin.price_change_percentage_24h >= 0 ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              {Math.abs(coin.price_change_percentage_24h)}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right font-mono text-slate-400">
                            ${coin.market_cap.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-right text-xs text-slate-500 font-mono">
                            {new Date(coin.last_updated).toLocaleTimeString()}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}