

import React, { useState, useMemo } from 'react';

// --- TYPES & INTERFACES ---
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  bodyStyle: 'Sedan' | 'SUV' | 'Coupe' | '🏎️ Convertible' | 'Truck';
  fuelType: 'Electric' | 'Hybrid' | 'Gasoline';
  transmission: 'Automatic' | 'Manual';
  horsepower: number;
  acceleration: string; // 0-60 mph
  topSpeed: number; // mph
  imageUrl: string;
  features: string[];
}

// --- CURATED DATASET (30 CARS) ---
const CAR_DATASET: Car[] = [
  {
    id: 'vc-01',
    make: 'Porsche',
    model: '🚘 Coupe ',
    year: 2024,
    price: 131300,
    bodyStyle: 'Coupe',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 443,
    acceleration: '3.5s',
    topSpeed: 191,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: ['Sport Chrono Package', 'Rear Axle Steering', 'PASM Suspension', 'Porsche Connect']
  },
  {
    id: 'vc-02',
    make: 'Audi',
    model: 'R8 V10 Performance',
    year: 2023,
    price: 196800,
    bodyStyle: '🏎️ Convertible',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 602,
    acceleration: '3.1s',
    topSpeed: 205,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    features: ['Quattro AWD', 'Carbon Exterior Package', 'Virtual Cockpit', 'Laser Headlights']
  },
  {
    id: 'vc-03',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 89990,
    bodyStyle: 'Sedan',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 1020,
    acceleration: '1.99s',
    topSpeed: 200,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    features: ['Tri-Motor AWD', 'Yoke Steering', 'Autopilot Capability', '22-Speaker Audio']
  },
  {
    id: 'vc-04',
    make: 'BMW',
    model: 'M8 Competition',
    year: 2024,
    price: 138800,
    bodyStyle: 'Coupe',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 617,
    acceleration: '3.0s',
    topSpeed: 190,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    features: ['M xDrive', 'Carbon Ceramic Brakes', 'Head-Up Display', 'Merino Leather']
  },
  {
    id: 'vc-05',
    make: 'Mercedes-Benz',
    model: 'G 63 AMG',
    year: 2024,
    price: 183000,
    bodyStyle: 'SUV',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 577,
    acceleration: '4.5s',
    topSpeed: 149,
    imageUrl: 'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&w=800&q=80',
    features: ['Triple Diff Locks', 'Burmester Sound System', 'AMG Ride Control', 'Nappa Leather']
  },
  {
    id: 'vc-06',
    make: 'Rivian',
    model: 'R1T Adventure',
    year: 2024,
    price: 79000,
    bodyStyle: 'Truck',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 835,
    acceleration: '3.0s',
    topSpeed: 110,
    imageUrl: 'https://images.unsplash.com/photo-1669023101431-7e30dcd3bc43?auto=format&fit=crop&w=800&q=80',
    features: ['Quad-Motor Drive', 'Gear Tunnel', 'Air Suspension', 'Panoramic Glass Roof']
  },
  {
    id: 'vc-07',
    make: 'Chevrolet',
    model: 'Corvette Z06',
    year: 2024,
    price: 112700,
    bodyStyle: 'Coupe',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 670,
    acceleration: '2.6s',
    topSpeed: 195,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    features: ['Flat-plane Crank V8', 'Magnetic Ride Control', 'Performance Data Recorder']
  },
  {
    id: 'vc-08',
    make: 'Aston Martin',
    model: 'Vantage F1 Edition',
    year: 2023,
    price: 162000,
    bodyStyle: 'Coupe',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 527,
    acceleration: '3.5s',
    topSpeed: 195,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    features: ['Track-Biased Aero', 'F1 Satin Finish', 'Alcantara Trim', 'Carbon Fiber Interior']
  },
  {
    id: 'vc-09',
    make: 'Lamborghini',
    model: 'Huracán Tecnica',
    year: 2024,
    price: 249000,
    bodyStyle: '🏎️ Convertible',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 631,
    acceleration: '3.2s',
    topSpeed: 201,
    imageUrl: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
    features: ['Rear-Wheel Drive', 'LDVI System', 'Carbon Ceramic Brakes', 'Hexagonal Exhausts']
  },
  {
    id: 'vc-10',
    make: 'Land Rover',
    model: 'Range Rover Sport SV',
    year: 2024,
    price: 180300,
    bodyStyle: 'SUV',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    horsepower: 626,
    acceleration: '3.6s',
    topSpeed: 180,
    imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80',
    features: ['6D Dynamics Suspension', 'Carbon Fiber Wheels', 'Body and Soul Seat', 'All-Wheel Steering']
  },
  {
    id: 'vc-11',
    make: 'Lucid',
    model: 'Air Sapphire',
    year: 2024,
    price: 249000,
    bodyStyle: 'Sedan',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 1234,
    acceleration: '1.89s',
    topSpeed: 205,
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
    features: ['Three-Motor AWD', 'Carbon Ceramic Rotors', 'Track Mode Tuning', 'Ultra-fast charging']
  },
  {
    id: 'vc-12',
    make: 'Ford',
    model: 'Mustang Dark Horse',
    year: 2024,
    price: 59270,
    bodyStyle: 'Coupe',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    horsepower: 500,
    acceleration: '4.1s',
    topSpeed: 168,
    imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
    features: ['TREMEC Manual Transmission', 'MagneRide Damping', 'Brembo Front Calipers']
  },
  {
    id: 'vc-13',
    make: 'Lexus',
    model: 'LC 500 Inspiration',
    year: 2024,
    price: 116700,
    bodyStyle: 'Coupe',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 471,
    acceleration: '4.4s',
    topSpeed: 168,
    imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80',
    features: ['Torsen Limited-Slip Diff', 'Carbon Fiber Roof', 'Mark Levinson Sound System']
  },
  {
    id: 'vc-14',
    make: 'Ferrari',
    model: 'Roma Spider',
    year: 2024,
    price: 272900,
    bodyStyle: '🏎️ Convertible',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 612,
    acceleration: '3.4s',
    topSpeed: 199,
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    features: ['Retractable Fabric Roof', 'Slide Slip Control 6.0', 'Dual-Cockpit Dashboard']
  },
  {
    id: 'vc-15',
    make: 'BMW',
    model: 'XM Red Label',
    year: 2024,
    price: 185000,
    bodyStyle: 'SUV',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    horsepower: 738,
    acceleration: '3.7s',
    topSpeed: 175,
    imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80',
    features: ['M Hybrid System', 'Vintage Leather Cabin', 'Adaptive M Suspension Pro']
  },
  {
    id: 'vc-16',
    make: 'Tesla',
    model: 'Model Y Performance',
    year: 2024,
    price: 52490,
    bodyStyle: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 456,
    acceleration: '3.5s',
    topSpeed: 155,
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
    features: ['Performance Brakes', 'Carbon Fiber Spoiler', 'All-Wheel Drive', 'Track Mode']
  },
  {
    id: 'vc-17',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 147100,
    bodyStyle: 'Sedan',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 637,
    acceleration: '3.1s',
    topSpeed: 155,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    features: ['Quattro AWD System', 'Carbon Fiber Roof', 'e-tron Sport Sound', 'Carbide Brakes']
  },
  {
    id: 'vc-18',
    make: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    price: 194900,
    bodyStyle: 'Sedan',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 750,
    acceleration: '2.6s',
    topSpeed: 161,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    features: ['Overboost Power', '800V Architecture', 'Sport Adaptive Air Suspension']
  },
  {
    id: 'vc-19',
    make: 'Mercedes-Benz',
    model: 'AMG GT 63 S E',
    year: 2024,
    price: 195000,
    bodyStyle: 'Coupe',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    horsepower: 831,
    acceleration: '2.9s',
    topSpeed: 196,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    features: ['E PERFORMANCE Hybrid', 'Rear-axle Steering', 'Active Aerodynamics']
  },
  {
    id: 'vc-20',
    make: 'Hyundai',
    model: 'Ioniq 5 N',
    year: 2024,
    price: 66100,
    bodyStyle: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 641,
    acceleration: '3.2s',
    topSpeed: 162,
    imageUrl: 'https://images.unsplash.com/photo-1669023101431-7e30dcd3bc43?auto=format&fit=crop&w=800&q=80',
    features: ['N Drift Optimizer', 'e-Shift Emulated Clutch', 'N Active Sound+']
  },
  {
    id: 'vc-21',
    make: 'Chevrolet',
    model: 'Silverado EV RST',
    year: 2024,
    price: 94500,
    bodyStyle: 'Truck',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 754,
    acceleration: '4.5s',
    topSpeed: 110,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Multi-Flex Midgate', 'Four-Wheel Steering', 'Super Cruise Navigation']
  },
  {
    id: 'vc-22',
    make: 'Lexus',
    model: 'RX 500h F Sport',
    year: 2024,
    price: 63800,
    bodyStyle: 'SUV',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    horsepower: 366,
    acceleration: '5.9s',
    topSpeed: 130,
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['DIRECT4 AWD System', 'Dynamic Rear Steering', 'BladeScan AHS Headlights']
  },
  {
    id: 'vc-23',
    make: 'Ford',
    model: 'F-150 Lightning Plat.',
    year: 2024,
    price: 84995,
    bodyStyle: 'Truck',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 580,
    acceleration: '3.8s',
    topSpeed: 110,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Pro Power Onboard', 'Mega Power Frunk', 'BlueCruise Auto Driving']
  },
  {
    id: 'vc-24',
    make: 'Audi',
    model: 'RS6 Avant Performance',
    year: 2024,
    price: 125800,
    bodyStyle: 'Sedan',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 621,
    acceleration: '3.3s',
    topSpeed: 190,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    features: ['Bi-turbo V8', 'Quattro with Sport Diff', 'Valcona Leather Comfort Seats']
  },
  {
    id: 'vc-25',
    make: 'Porsche',
    model: 'Cayenne Turbo E-Hybrid',
    year: 2024,
    price: 146900,
    bodyStyle: 'SUV',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    horsepower: 729,
    acceleration: '3.5s',
    topSpeed: 183,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: ['HD-Matrix LED Lights', 'GT Package Tuning', 'Air Suspension with PASM']
  },
  {
    id: 'vc-26',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    price: 82200,
    bodyStyle: 'Coupe',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 503,
    acceleration: '3.4s',
    topSpeed: 180,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    features: ['M Drift Analyzer', 'Carbon Fiber Bucket Seats', 'Dynamic Stability Control']
  },
  {
    id: 'vc-27',
    make: 'Mercedes-Benz',
    model: 'EQS 580 SUV',
    year: 2024,
    price: 125950,
    bodyStyle: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 536,
    acceleration: '4.7s',
    topSpeed: 130,
    imageUrl: 'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&w=800&q=80',
    features: ['HEPA Air Filtration', 'Airmatic Air Suspension', 'MBUX Hyperscreen (56")']
  },
  {
    id: 'vc-28',
    make: 'Rivian',
    model: 'R1S Launch Edition',
    year: 2024,
    price: 84000,
    bodyStyle: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic',
    horsepower: 835,
    acceleration: '3.0s',
    topSpeed: 110,
    imageUrl: 'https://images.unsplash.com/photo-1669023101431-7e30dcd3bc43?auto=format&fit=crop&w=800&q=80',
    features: ['Three-Row Seating', 'Hydraulic Roll Control', 'Underbody Protection']
  },
  {
    id: 'vc-29',
    make: 'Chevrolet',
    model: 'Tahoe Premier High',
    year: 2024,
    price: 76900,
    bodyStyle: 'SUV',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 420,
    acceleration: '5.9s',
    topSpeed: 130,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Magnetic Ride Control', 'Rear Seat Media System', 'Adaptive Cruise Control']
  },
  {
    id: 'vc-30',
    make: 'Lamborghini',
    model: 'Urus Performante',
    year: 2024,
    price: 269000,
    bodyStyle: 'SUV',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 657,
    acceleration: '3.3s',
    topSpeed: 190,
    imageUrl: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
    features: ['Rally Driving Mode', 'Carbon Fiber Aero hood', 'Akrapovič Titanium Exhaust']
  }
];

export default function App() {
  // Filters & State
  const [selectedMake, setSelectedMake] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  
  // Custom Interactivity states
  const [comparisonList, setComparisonList] = useState<Car[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'showroom' | 'showroom-favorites'>('showroom');

  // Static list of unique luxury makes
  const makes = useMemo(() => {
    return ['All', ...Array.from(new Set(CAR_DATASET.map(c => c.make)))].sort();
  }, []);

  const styles = ['All', 'Coupe', 'Sedan', 'SUV', 'Supercar', 'Truck'];

  // Filtered dataset
  const filteredCars = useMemo(() => {
    return CAR_DATASET.filter((car) => {
      const matchMake = selectedMake === 'All' || car.make === selectedMake;
      const matchStyle = selectedStyle === 'All' || car.bodyStyle === selectedStyle;
      const matchPrice = car.price <= maxPrice;
      const matchQuery = 
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFavorite = activeTab === 'showroom-favorites' ? favorites.includes(car.id) : true;
      
      return matchMake && matchStyle && matchPrice && matchQuery && matchFavorite;
    });
  }, [selectedMake, selectedStyle, maxPrice, searchQuery, activeTab, favorites]);

  // Comparison mechanics
  const toggleCompare = (car: Car) => {
    if (comparisonList.some(item => item.id === car.id)) {
      setComparisonList(comparisonList.filter(item => item.id !== car.id));
    } else {
      if (comparisonList.length >= 3) return; // limit to 3
      setComparisonList([...comparisonList, car]);
    }
  };

  const toggleFavorite = (carId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(carId)) {
      setFavorites(favorites.filter(id => id !== carId));
    } else {
      setFavorites([...favorites, carId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* GEOMETRIC BRAND LOGO */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab('showroom'); setSelectedMake('All'); setSelectedStyle('All'); }}>
            <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 40V80L50 90L10 80V40L50 10Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M50 40L75 58V73L50 60L25 73V58L50 40Z" fill="currentColor" opacity="0.85"/>
              <circle cx="50" cy="28" r="4" fill="currentColor" />
            </svg>
            <div>
              <span className="text-xl font-black tracking-widest text-white block leading-none">VISION CAR</span>
              <span className="text-[10px] tracking-wider text-emerald-500 font-semibold uppercase">The Apex Showroom</span>
            </div>
          </div>

          {/* MAIN ACTIONS */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('showroom')}
              className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === 'showroom' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Browse Showroom
            </button>
            <button
              onClick={() => setActiveTab('showroom-favorites')}
              className={`flex items-center space-x-1.5 text-sm font-semibold tracking-wide transition-colors ${activeTab === 'showroom-favorites' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <svg className="w-4 h-4 fill-current text-rose-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Saved ({favorites.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-900 py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase bg-emerald-500/10 px-3 py-1.5 rounded-full">
            Precision Engineering & Design
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Drive the Future of Elite Performance
          </h1>
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our meticulously curated dynamic portfolio of {CAR_DATASET.length} high-fidelity vehicles. Experience cutting-edge luxury, hypercar speed metrics, and pristine power.
          </p>
        </div>
      </section>

      {/* SEARCH, FILTER, AND GRID WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SEARCH & FILTERS CONTROLS */}
          <aside className="space-y-6">
            <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl space-y-6">
              <h2 className="text-lg font-bold text-white tracking-wide">Refine Inventory</h2>
              
              {/* Text Search */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Keywords</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Porsche, BMW, SUV..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 text-sm p-3 pl-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-200"
                  />
                  <span className="absolute left-3 top-3.5 text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                </div>
              </div>

              {/* Manufacturers Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Brand</label>
                <div className="flex flex-wrap gap-2">
                  {makes.map((make) => (
                    <button
                      key={make}
                      onClick={() => setSelectedMake(make)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium ${selectedMake === make ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 hover:bg-slate-850 text-slate-300'}`}
                    >
                      {make}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Styles Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Body Silhouette</label>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium ${selectedStyle === style ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 hover:bg-slate-850 text-slate-300'}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Cap Filter */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  <span>Price Cap</span>
                  <span className="text-emerald-400 text-sm font-bold">${maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={300000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 cursor-pointer"
                />
              </div>

              {/* Reset Action */}
              <button
                onClick={() => {
                  setSelectedMake('All');
                  setSelectedStyle('All');
                  setMaxPrice(300000);
                  setSearchQuery('');
                }}
                className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          </aside>

          {/* MAIN GRID */}
          <section className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-400 font-medium">
                Showing <span className="text-white font-bold">{filteredCars.length}</span> luxury matches
              </p>
              <div className="flex space-x-2 text-xs">
                <span className="text-slate-400 font-semibold">Max Price Threshold:</span>
                <span className="text-emerald-400 font-bold">${maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* CARS SHOWCASE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => {
                const isFavorite = favorites.includes(car.id);
                const isComparing = comparisonList.some(item => item.id === car.id);

                return (
                  <div
                    key={car.id}
                    onClick={() => setSelectedCar(car)}
                    className="group bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-emerald-500/5 hover:border-slate-800 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Media Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={car.imageUrl}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Body Style Badge */}
                      <span className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur text-slate-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                        {car.bodyStyle}
                      </span>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(car.id, e)}
                        className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur p-2 rounded-full hover:bg-slate-900 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <svg className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : 'stroke-current fill-none'}`} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Metadata body */}
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{car.make}</p>
                          <span className="text-emerald-400 font-bold text-sm tracking-tight">${car.price.toLocaleString()}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">{car.model}</h3>
                        <p className="text-xs text-slate-500 font-medium">Model Year {car.year} &middot; {car.fuelType}</p>
                      </div>

                      {/* Specs pills */}
                      <div className="grid grid-cols-3 gap-2 border-t border-slate-900/60 pt-4 text-center">
                        <div className="bg-slate-950/40 p-1.5 rounded-lg">
                          <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">HP</span>
                          <span className="text-xs font-bold text-slate-200">{car.horsepower}</span>
                        </div>
                        <div className="bg-slate-950/40 p-1.5 rounded-lg">
                          <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">0-60</span>
                          <span className="text-xs font-bold text-slate-200">{car.acceleration}</span>
                        </div>
                        <div className="bg-slate-950/40 p-1.5 rounded-lg">
                          <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Max</span>
                          <span className="text-xs font-bold text-slate-200">{car.topSpeed}mph</span>
                        </div>
                      </div>
                    </div>

                    {/* Compare CTA bar */}
                    <div className="px-5 pb-5 pt-1 border-t border-slate-900/40 flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleCompare(car)}
                        className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${isComparing ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-950 hover:bg-slate-900 text-slate-400'}`}
                      >
                        <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                      </button>
                      <button
                        onClick={() => setSelectedCar(car)}
                        className="text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors flex items-center space-x-1"
                      >
                        <span>Configure</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredCars.length === 0 && (
                <div className="col-span-full py-16 text-center space-y-4">
                  <p className="text-slate-400 font-medium">No luxury vehicles matched your refine filters.</p>
                  <button
                    onClick={() => {
                      setSelectedMake('All');
                      setSelectedStyle('All');
                      setMaxPrice(300000);
                      setSearchQuery('');
                      setActiveTab('showroom');
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-emerald-400 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:bg-slate-950 transition-colors"
                  >
                    Reset Filter Search
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER METADATA */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex justify-center items-center space-x-2">
            <svg className="w-6 h-6 text-emerald-500/80" viewBox="0 0 100 100" fill="none">
              <path d="M50 10L90 40V80L50 90L10 80V40L50 10Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-bold tracking-widest text-white">VISION CAR</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Interactive, frontend-only showcase simulation platform. Unsplash image models provided for editorial mockup layout purposes.
          </p>
        </div>
      </footer>

      {/* CAR COMPARISON BOTTOM DRAWER (DOCK) */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-emerald-500/20 shadow-[0_-8px_30px_rgb(0,0,0,0.8)] backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-center md:text-left">
              <span className="text-emerald-500 font-bold text-xs uppercase bg-emerald-500/10 px-2 py-1 rounded">Compare Tool</span>
              <p className="text-sm text-slate-300 font-medium">Compare configurations side by side (max 3)</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {comparisonList.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-lg p-2 flex items-center space-x-3 pr-4">
                  <img src={item.imageUrl} alt={item.model} className="w-10 h-7 object-cover rounded" />
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{item.model}</p>
                    <p className="text-[10px] text-slate-500 font-medium">${item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => toggleCompare(item)} className="text-slate-500 hover:text-slate-300">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}

              <div className="h-6 w-[1px] bg-slate-800 hidden md:block" />

              <button
                onClick={() => setComparisonList([])}
                className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 transition-colors"
              >
                Clear
              </button>

              <button
                onClick={() => {
                  if (comparisonList.length > 0) {
                    setSelectedCar(comparisonList[0]);
                  }
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 py-2 rounded-lg transition-colors"
              >
                Inspect Comparison Specs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RICH SPECIFICATIONS DETAIL MODAL */}
      {selectedCar && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
            
            {/* Media Banner */}
            <div className="relative aspect-[16/9] bg-slate-950">
              <img src={selectedCar.imageUrl} alt={selectedCar.model} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur p-2.5 rounded-full text-slate-400 hover:text-white transition-colors border border-slate-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Spec Details */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{selectedCar.make} SHOWROOM</span>
                  <h2 className="text-2xl md:text-3xl font-black text-white">{selectedCar.model}</h2>
                  <p className="text-xs text-slate-400 font-medium mt-1">Vehicle Reference ID: {selectedCar.id}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold">Base Config Pricing</span>
                  <span className="text-2xl font-black text-emerald-400">${selectedCar.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Max Output</span>
                  <span className="text-sm font-bold text-slate-200">{selectedCar.horsepower} HP</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Acceleration</span>
                  <span className="text-sm font-bold text-slate-200">{selectedCar.acceleration}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Velocity Cap</span>
                  <span className="text-sm font-bold text-slate-200">{selectedCar.topSpeed} MPH</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Power System</span>
                  <span className="text-sm font-bold text-slate-200">{selectedCar.fuelType}</span>
                </div>
              </div>

              {/* Features Lists */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Premium Integrations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCar.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg font-medium">
                      &bull; {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inquiry Action Box */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">Inquire About This Model</h4>
                    <p className="text-xs text-slate-500">Contact a Vision Car advisor for virtual configurators or scheduling delivery.</p>
                  </div>
                  <button
                    onClick={() => alert(`Inquiry initiated for the ${selectedCar.make} ${selectedCar.model}. Our advisory desk will follow up.`)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap self-stretch sm:self-auto text-center"
                  >
                    Submit Advisory Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}