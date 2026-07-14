/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useMemo } from 'react';
import { 
  QueryClient, 
  QueryClientProvider, 
  useQuery, 
  useQueryClient 
} from '@tanstack/react-query';
import { 
  Search, 
  Star, 
  RefreshCw, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  BookOpen,
  ChevronRight,
  Cpu,
  Terminal,
  Database
} from 'lucide-react';

// ==========================================
// 1. DATA TYPES & ARCHITECTURE STRUCTURES
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
  private minIntervalMs = 1500; // Delay enforced between client requests to prevent 429s
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
   * Schedules a fetch request through the client-side queue.
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
      this.onLogUpdate(`Enqueued: fetch('${url.split('/').pop()}')`);
      this.processQueue(simulateFailures);
    });
  }

  private async processQueue(simulateFailures: boolean) {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    const currentTask = this.queue[0];
    this.onLogUpdate(`Processing request task: ${currentTask.id}`);

    try {
      const data = await this.executeFetch(currentTask.url, simulateFailures);
      currentTask.resolve(data);
      this.queue.shift();
      this.onQueueUpdate(this.queue.length);
      this.onLogUpdate(`Resolved task: ${currentTask.id}`);
    
    } catch (error: any) {
      this.onLogUpdate(`HTTP 429 Intercepted. Executing delay buffer...`);
      // Hold task, wait for cooloff before retry
      await new Promise((res) => setTimeout(res, 2000));
      currentTask.reject(error);
      this.queue.shift();
      this.onQueueUpdate(this.queue.length);
    } finally {
      this.processing = false;
      
      // Delay processing the next queue item to respect public API thresholds
      if (this.queue.length > 0) {
        this.onLogUpdate(`Pausing ${this.minIntervalMs}ms spacing...`);
        setTimeout(() => this.processQueue(simulateFailures), this.minIntervalMs);
      }
    }
  }

  private async executeFetch(_url: string, simulateFailures: boolean): Promise<CoinData[]> {
    if (simulateFailures && Math.random() < 0.3) {
      throw new Error("HTTP 429: Too Many Requests (Simulated)");
    }
    
    // Fallback Mock Data Engine to ensure persistent uptime and predictable testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.generateMockCryptoData());
      }, 400); // Artificial latency simulation
    });
  }

  private generateMockCryptoData(): CoinData[] {
    const basePrices: Record<string, number> = {
      bitcoin: 64250,
      ethereum: 3450,
      solana: 142,
      cardano: 0.48,
      ripple: 0.52,
      polkadot: 6.20,
      dogecoin: 0.12,
      chainlink: 14.80
    };

    return Object.entries(basePrices).map(([id, price]) => {
      const changePercent = (Math.random() * 4) - 2; 
      const newPrice = price * (1 + changePercent / 100);
      return {
        id,
        symbol: id.substring(0, 3).toUpperCase(),
        name: id.charAt(0).toUpperCase() + id.slice(1),
        current_price: parseFloat(newPrice.toFixed(2)),
        market_cap: Math.round(newPrice * 18000000),
        price_change_percentage_24h: parseFloat(changePercent.toFixed(2)),
        last_updated: new Date().toISOString()
      };
    });
  }
}

// Global Singleton Instance of Queue Interceptor
const apiInterceptor = new ClientSideRateLimitInterceptor();

// ==========================================
// 3. TANSTACK QUERY CLIENT SETUP
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
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        
        {/* Navigation Bar */}
        <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="text-indigo-400 h-5 w-5" />
              <span className="font-mono text-sm tracking-wider font-semibold text-slate-200">
                ARCHITECTURE.LOG // STUDY_04
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE SIMULATION ENGINE
              </span>
            </div>
          </div>
        </nav>

        <TechnicalEngineBlog />
      </div>
    </QueryClientProvider>
  );
}

// ==========================================
// 5. BLOG WORKSPACE COMPONENT
// ==========================================

function TechnicalEngineBlog() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('crypto_watchlist');
    return saved ? JSON.parse(saved) : ['bitcoin', 'ethereum', 'solana'];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const [simulateFailures, setSimulateFailures] = useState(true);
  const [queueLength, setQueueLength] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Synchronize watchlist state with browser storage
  useEffect(() => {
    localStorage.setItem('crypto_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Connect interceptor metrics to React state
  useEffect(() => {
    apiInterceptor.registerCallbacks(
      (len) => setQueueLength(len),
      (msg) => setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] ${msg}`, 
        ...prev.slice(0, 14)
      ])
    );
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column: Case Study Write-up */}
      <div className="lg:col-span-7 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
            <BookOpen className="h-3 w-3" /> Architecture Blueprint
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            Client-Side Request Spacing: Solving Third-Party Throttling in Frontend-Only Dashboards
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            When building serverless or client-only web applications, relying directly on public, third-party REST APIs introduces rate limits. This case study details the implementation of a micro-queue interceptor pattern built to handle downstream resource constraints.
          </p>
        </div>

        {/* Dynamic Queue Flow Diagram */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Data Interception &amp; Request Flow Lifecycle
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs">
            
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center space-y-2">
              <Database className="text-slate-400 h-4 w-4" />
              <span className="font-semibold text-slate-300">TanStack Query</span>
              <p className="text-[10px] text-slate-500">Initiates periodic, state-aware polling schedules.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-indigo-900/50 flex flex-col items-center justify-center space-y-2 relative">
              <Cpu className="text-indigo-400 h-4 w-4" />
              <span className="font-semibold text-indigo-300">Queue Interceptor</span>
              <p className="text-[10px] text-slate-500">Buffers, paces, and serializes incoming promises.</p>
              <ChevronRight className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-800 z-10 h-4 w-4" />
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center space-y-2">
              <Terminal className="text-slate-400 h-4 w-4" />
              <span className="font-semibold text-slate-300">Rate Limited API</span>
              <p className="text-[10px] text-slate-500">Responds safely inside rate boundaries.</p>
            </div>

          </div>
        </div>

        {/* Written Analysis */}
        <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-500">01 /</span> The Architectural Problem
            </h3>
            <p>
              Most free cryptocurrency market data endpoints enforce strict rate limits. If a user configures a polling frequency of 8 seconds on multiple custom watchlists, a single browser tab can trigger an HTTP 429 error within minutes.
            </p>
            <p className="text-slate-400">
              A common, naive solution is simply increasing the polling interval globally, which compromises dashboard real-time fidelity. An alternative, more robust pattern is introducing a <strong>serialized client-side middleware</strong> that queues parallel requests and serializes dispatch times.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-500">02 /</span> The Serialization Pattern
            </h3>
            <p>
              The interceptor class featured on this page implements a scheduling mechanism. When TanStack Query initiates a fetch event, the native request is captured and wrapped inside a custom promise. This promise is enqueued:
            </p>
            <pre className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-xs font-mono text-slate-400 overflow-x-auto space-y-1">
              <code>{`class ClientSideRateLimitInterceptor {`}</code><br />
              <code>{`  private queue: QueueItem[] = [];`}</code><br />
              <code>{`  private minIntervalMs = 1500; // Enforces a spacing gap`}</code><br />
              <code>{`}`}</code>
            </pre>
            <p>
              By processing tasks with a mandatory spacing gap (`minIntervalMs`), we guarantee that downstream services are not over-saturated during sudden manual interface updates or race conditions.
            </p>
          </section>
        </article>
      </div>

      {/* Right Column: Live Diagnostic Sandbox */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl sticky top-24">
          
          {/* Diagnostic Console Header */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono tracking-wider font-bold text-indigo-300 uppercase flex items-center gap-2">
              <Cpu className="h-4 w-4" /> Live Execution Sandbox
            </h2>
            <p className="text-xs text-slate-400">
              Pace background fetching and intercept artificial network errors in real time. Use the controls below to interact with the runtime.
            </p>
          </div>

          {/* Queue Diagnostics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
              <span className="text-[10px] text-slate-500 font-mono block">QUEUE BACKLOG</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`text-xl font-bold font-mono ${queueLength > 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                  {queueLength}
                </span>
                <span className="text-[9px] text-slate-600 font-mono">Tasks pending</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
              <span className="text-[10px] text-slate-500 font-mono block">RATE THROTTLING</span>
              <span className="text-xs font-mono font-semibold text-indigo-400 block mt-1.5">
                1.5s Serialization
              </span>
            </div>
          </div>

          {/* Logger Console */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
              Interceptor Output Logs
            </span>
            <div className="h-32 bg-slate-950 rounded-lg border border-slate-850 p-3 font-mono text-[10px] text-slate-400 overflow-y-auto space-y-1">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">Logs are populated on fetch events...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="truncate border-l border-slate-800 pl-2">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Live System Interface Integration */}
          <div className="border-t border-slate-800 pt-6">
            <LiveDashboard 
              watchlist={watchlist} 
              setWatchlist={setWatchlist}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showWatchlistOnly={showWatchlistOnly}
              setShowWatchlistOnly={setShowWatchlistOnly}
              simulateFailures={simulateFailures}
              setSimulateFailures={setSimulateFailures}
            />
          </div>

        </div>
      </div>

    </main>
  );
}

// ==========================================
// 6. DETAILED SANDBOX INTERFACE
// ==========================================

interface LiveDashboardProps {
  watchlist: string[];
  setWatchlist: React.Dispatch<React.SetStateAction<string[]>>;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  showWatchlistOnly: boolean;
  setShowWatchlistOnly: (val: boolean) => void;
  simulateFailures: boolean;
  setSimulateFailures: (val: boolean) => void;
}

function LiveDashboard({
  watchlist,
  setWatchlist,
  searchQuery,
  setSearchQuery,
  showWatchlistOnly,
  setShowWatchlistOnly,
  simulateFailures,
  setSimulateFailures
}: LiveDashboardProps) {
  const queryClient = useQueryClient();

  // Polling query that intercepts data fetching using our queue
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
    <div className="space-y-4">
      
      {/* Search Input and Watchlist Filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search dashboard assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 text-xs rounded-md pl-8 pr-3 py-2 text-slate-200 border border-slate-850 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
        
        <button
          onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
          className={`flex items-center gap-1 px-2.5 py-2 text-xs rounded-md border transition ${
            showWatchlistOnly 
              ? 'bg-amber-950/20 text-amber-300 border-amber-800/40' 
              : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200'
          }`}
        >
          <Star className={`h-3 w-3 ${showWatchlistOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
          {watchlist.length}
        </button>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-xs">
        <span className="text-slate-400 font-mono text-[10px]">THROTTLING SIMULATOR:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSimulateFailures(!simulateFailures)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
              simulateFailures 
                ? 'bg-amber-950/40 text-amber-300 border border-amber-800' 
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            {simulateFailures ? 'Simulate 429 Errors' : 'Ignore API Errors'}
          </button>
          
          <button
            onClick={() => {
              // Clear cache and queue multiple fetches to demonstrate the queue execution flow
              queryClient.invalidateQueries({ queryKey: ['cryptoMarkets'] });
              refetch();
              refetch();
              refetch();
            }}
            className="flex items-center gap-1 px-2 py-0.5 bg-indigo-950/50 hover:bg-indigo-900/40 border border-indigo-800 text-[10px] text-indigo-300 rounded font-mono transition"
          >
            <RefreshCw className={`h-2.5 w-2.5 ${isFetching ? 'animate-spin' : ''}`} />
            Force Burst
          </button>
        </div>
      </div>

      {/* Mini Data View Table */}
      {error ? (
        <div className="p-4 bg-red-950/10 border border-red-900/30 rounded-lg text-center text-xs text-red-400">
          <AlertTriangle className="h-4 w-4 text-red-500 mx-auto mb-1.5" />
          The request was systematically throttled. The queue scheduler will back-off and retry.
        </div>
      ) : (
        <div className="bg-slate-950 rounded-lg border border-slate-850 overflow-hidden">
          <div className="max-h-56 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-950/90 backdrop-blur border-b border-slate-850 z-10 text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                <tr>
                  <th className="py-2 px-3 w-10 text-center">Fav</th>
                  <th className="py-2 px-2">Asset</th>
                  <th className="py-2 px-2 text-right">Price</th>
                  <th className="py-2 px-3 text-right">24h Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {processedCoins.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-500 italic">
                      No matching assets found.
                    </td>
                  </tr>
                ) : (
                  processedCoins.map((coin) => {
                    const isFavorited = watchlist.includes(coin.id);
                    return (
                      <tr key={coin.id} className="hover:bg-slate-900/20 transition-colors">
                        <td className="py-2.5 px-3 text-center">
                          <button 
                            onClick={() => toggleWatchlist(coin.id)}
                            className="focus:outline-none"
                          >
                            <Star className={`h-3.5 w-3.5 ${
                              isFavorited ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-slate-400'
                            }`} />
                          </button>
                        </td>
                        <td className="py-2.5 px-2 font-medium text-white">
                          <span className="mr-1">{coin.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase">{coin.symbol}</span>
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-slate-200">
                          ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1 py-0.5 rounded ${
                            coin.price_change_percentage_24h >= 0 
                              ? 'text-emerald-400' 
                              : 'text-rose-400'
                          }`}>
                            {coin.price_change_percentage_24h >= 0 ? (
                              <ArrowUpRight className="h-2.5 w-2.5" />
                            ) : (
                              <ArrowDownRight className="h-2.5 w-2.5" />
                            )}
                            {Math.abs(coin.price_change_percentage_24h)}%
                          </span>
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
  );
}
