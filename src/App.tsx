
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  ShoppingCart, 
  Heart, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Settings, 
  Check,
  Clock,
  BookOpen
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Recipe {
  id: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  ingredientLines: string[];
  calories: number;
  totalTime: number; // in minutes
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface MealPlan {
  [day: string]: {
    Breakfast?: Recipe;
    Lunch?: Recipe;
    Dinner?: Recipe;
  };
}

interface PlannerContextType {
  recipes: Recipe[];
  favorites: Recipe[];
  mealPlan: MealPlan;
  shoppingList: string[];
  apiConfig: { appId: string; appKey: string };
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setApiConfig: (config: { appId: string; appKey: string }) => void;
  searchRecipes: (ingredients: string) => Promise<void>;
  toggleFavorite: (recipe: Recipe) => void;
  addMealToPlan: (day: DayOfWeek, mealType: MealType, recipe: Recipe) => void;
  removeMealFromPlan: (day: DayOfWeek, mealType: MealType) => void;
  clearPlan: () => void;
}

// ==========================================
// MOCK DATA (Fallback when API credentials aren't set)
// ==========================================

const MOCK_RECIPES: Recipe[] = [
  {
    id: 'mock-1',
    label: 'Avocado Toast with Poached Eggs',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    source: 'Simple Kitchen',
    url: '#',
    yield: 2,
    dietLabels: ['Vegetarian'],
    healthLabels: ['High-Fiber', 'Low-Sodium'],
    ingredientLines: ['2 slices sourdough bread', '1 ripe avocado', '2 fresh eggs', 'Red pepper flakes', 'Salt and pepper to taste'],
    calories: 380,
    totalTime: 15
  },
  {
    id: 'mock-2',
    label: 'Mediterranean Quinoa Salad',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    source: 'Healthy Bites',
    url: '#',
    yield: 4,
    dietLabels: ['Vegetarian', 'Gluten-Free'],
    healthLabels: ['Low-Fat', 'High-Protein'],
    ingredientLines: ['1 cup cooked quinoa', '1/2 cup cherry tomatoes', '1/2 cup diced cucumber', '1/4 cup feta cheese', 'Olive oil and lemon dressing'],
    calories: 290,
    totalTime: 20
  },
  {
    id: 'mock-3',
    label: 'Pan-Seared Salmon with Asparagus',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    source: 'Chef Chronicles',
    url: '#',
    yield: 2,
    dietLabels: ['Low-Carb'],
    healthLabels: ['Keto-Friendly', 'Omega-3 Rich'],
    ingredientLines: ['2 salmon fillets (6oz each)', '1 bunch fresh asparagus', '2 cloves garlic, minced', '1 tbsp butter', 'Fresh lemon juice'],
    calories: 450,
    totalTime: 25
  },
  {
    id: 'mock-4',
    label: 'Zesty Lemon Herb Chicken',
    image: 'https://images.unsplash.com/phnpoto-1532550907401-a500c9a57435?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    source: 'Classic Eats',
    url: '#',
    yield: 3,
    dietLabels: ['High-Protein'],
    healthLabels: ['Sugar-Conscious'],
    ingredientLines: ['3 chicken breasts', '2 lemons, zested and juiced', '2 tbsp olive oil', '1 tbsp dried oregano', '3 cloves garlic'],
    calories: 320,
    totalTime: 35
  }
];

const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner'];

// ==========================================
// CONTEXT PROVIDER Implementation
// ==========================================

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiConfig, setApiConfig] = useState(() => {
    const saved = localStorage.getItem('edamam_config');
    return saved ? JSON.parse(saved) : { appId: '', appKey: '' };
  });

  useEffect(() => {
    localStorage.setItem('edamam_config', JSON.stringify(apiConfig));
  }, [apiConfig]);

  const searchRecipes = async (ingredients: string) => {
    if (!ingredients.trim()) return;
    setIsLoading(true);

    if (!apiConfig.appId || !apiConfig.appKey) {
      // Offline fallback search
      setTimeout(() => {
        const filtered = MOCK_RECIPES.filter(recipe => 
          recipe.ingredientLines.some(line => 
            line.toLowerCase().includes(ingredients.toLowerCase())
          ) || recipe.label.toLowerCase().includes(ingredients.toLowerCase())
        );
        setRecipes(filtered.length > 0 ? filtered : MOCK_RECIPES);
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=${apiConfig.appId}&app_key=${apiConfig.appKey}&from=0&to=12`
      );
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formatted: Recipe[] = data.hits.map((hit: any, index: number) => ({
        id: `edamam-${index}-${hit.recipe.label}`,
        label: hit.recipe.label,
        image: hit.recipe.image,
        source: hit.recipe.source,
        url: hit.recipe.url,
        yield: hit.recipe.yield,
        dietLabels: hit.recipe.dietLabels,
        healthLabels: hit.recipe.healthLabels,
        ingredientLines: hit.recipe.ingredientLines,
        calories: Math.round(hit.recipe.calories),
        totalTime: hit.recipe.totalTime || 20
      }));

      setRecipes(formatted);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Fallback on error
      setRecipes(MOCK_RECIPES);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prev => 
      prev.some(item => item.id === recipe.id)
        ? prev.filter(item => item.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  const addMealToPlan = (day: DayOfWeek, mealType: MealType, recipe: Recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipe
      }
    }));
  };

  const removeMealFromPlan = (day: DayOfWeek, mealType: MealType) => {
    setMealPlan(prev => {
      const updatedDay = { ...prev[day] };
      delete updatedDay[mealType];
      return {
        ...prev,
        [day]: updatedDay
      };
    });
  };

  const clearPlan = () => setMealPlan({});

  // Compile active ingredients from current scheduled meals
  const shoppingList = Object.values(mealPlan).reduce<string[]>((acc, dayMeals) => {
    if (!dayMeals) return acc;
    const ingredients: string[] = [];
    Object.values(dayMeals).forEach(recipe => {
      if (recipe) {
        ingredients.push(...recipe.ingredientLines);
      }
    });
    return Array.from(new Set([...acc, ...ingredients]));
  }, []);

  return (
    <PlannerContext.Provider value={{
      recipes,
      favorites,
      mealPlan,
      shoppingList,
      apiConfig,
      isLoading,
      searchQuery,
      setSearchQuery,
      setApiConfig,
      searchRecipes,
      toggleFavorite,
      addMealToPlan,
      removeMealFromPlan,
      clearPlan
    }}>
      {children}
    </PlannerContext.Provider>
  );
};

const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) throw new Error('usePlanner must be used within a PlannerProvider');
  return context;
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

// Config Panel for optional Edamam API connection
const ApiSettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { apiConfig, setApiConfig } = usePlanner();
  const [appId, setAppId] = useState(apiConfig.appId);
  const [appKey, setAppKey] = useState(apiConfig.appKey);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiConfig({ appId, appKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-orange-50 p-6 border-2 border-sky-200 shadow-xl">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
          <Settings className="text-orange-500 h-5 w-5 animate-spin-slow" /> Edamam API Configuration
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Optional. Provide credentials to query real-time recipes instead of the local culinary dataset.
        </p>
        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Application ID</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none" 
              placeholder="e.g. 5e11b83d" 
              value={appId}
              onChange={e => setAppId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Application Key</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none" 
              placeholder="e.g. 1a679...ef4a2" 
              value={appKey}
              onChange={e => setAppKey(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition text-sm font-semibold text-slate-700"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition text-sm font-semibold shadow-md"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Recipe Detail Modal with Planner integration
const RecipeDetailModal: React.FC<{ recipe: Recipe; onClose: () => void }> = ({ recipe, onClose }) => {
  const { addMealToPlan, favorites, toggleFavorite } = usePlanner();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('Breakfast');
  const isFavorite = favorites.some(f => f.id === recipe.id);

  const handleAddToPlan = () => {
    addMealToPlan(selectedDay, selectedMeal, recipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-orange-50 border border-orange-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Image */}
        <div className="relative h-64 md:h-80 shrink-0">
          <img src={recipe.image} alt={recipe.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-semibold px-2.5 py-1 bg-orange-500 rounded-full inline-block mb-2">
              {recipe.source}
            </span>
            <h3 className="text-2xl font-bold leading-tight">{recipe.label}</h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Attributes */}
          <div className="flex flex-wrap gap-4 text-xs text-slate-600 border-b border-orange-200/60 pb-4">
            <span className="flex items-center gap-1"><Clock size={15} /> {recipe.totalTime} mins</span>
            <span>•</span>
            <span>{recipe.calories} kcal</span>
            <span>•</span>
            <span>Serves {recipe.yield}</span>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Ingredients */}
            <div className="md:col-span-3">
              <h4 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
                <BookOpen size={18} className="text-orange-500" /> Ingredients
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {recipe.ingredientLines.map((line, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scheduler Widget */}
            <div className="md:col-span-2 bg-sky-50/60 border border-sky-100 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3 uppercase tracking-wider">Schedule Meal</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Select Day</label>
                    <select 
                      value={selectedDay} 
                      onChange={e => setSelectedDay(e.target.value as DayOfWeek)}
                      className="w-full p-2 border border-sky-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                    >
                      {DAYS_OF_WEEK.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Select Slot</label>
                    <select 
                      value={selectedMeal} 
                      onChange={e => setSelectedMeal(e.target.value as MealType)}
                      className="w-full p-2 border border-sky-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                    >
                      {MEAL_TYPES.map(meal => <option key={meal} value={meal}>{meal}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-sky-100">
                <button 
                  onClick={handleAddToPlan}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition text-sm font-bold shadow flex items-center justify-center gap-1.5"
                >
                  <Plus size={16} /> Add to Week Plan
                </button>
                <button 
                  onClick={() => toggleFavorite(recipe)}
                  className={`w-full py-2 border rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
                    isFavorite 
                      ? 'border-orange-500 bg-orange-100 text-orange-600' 
                      : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} /> 
                  {isFavorite ? 'Favorited' : 'Bookmark'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Recipe Card Component
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { toggleFavorite, favorites } = usePlanner();
  const [showDetail, setShowDetail] = useState(false);
  const isFavorite = favorites.some(f => f.id === recipe.id);

  return (
    <>
      <div className="bg-orange-50/80 border border-orange-100 hover:border-orange-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between group">
        <div className="relative overflow-hidden h-44 cursor-pointer" onClick={() => setShowDetail(true)}>
          <img 
            src={recipe.image} 
            alt={recipe.label} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(recipe);
            }}
            className="absolute top-2 right-2 bg-orange-50/90 hover:bg-orange-100 p-2 rounded-full shadow-sm transition"
          >
            <Heart size={16} className={isFavorite ? 'text-orange-500 fill-orange-500' : 'text-slate-400'} />
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="mb-3 cursor-pointer" onClick={() => setShowDetail(true)}>
            <span className="text-[10px] font-bold text-sky-600 tracking-wider uppercase">{recipe.source}</span>
            <h4 className="font-bold text-slate-800 text-base leading-tight mt-1 line-clamp-2 hover:text-sky-600 transition">
              {recipe.label}
            </h4>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-orange-100">
            <span className="flex items-center gap-1"><Clock size={12} /> {recipe.totalTime}m</span>
            <span>{recipe.calories} kcal</span>
            <button 
              onClick={() => setShowDetail(true)}
              className="text-orange-600 font-semibold hover:underline flex items-center gap-0.5"
            >
              Plan <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      {showDetail && <RecipeDetailModal recipe={recipe} onClose={() => setShowDetail(false)} />}
    </>
  );
};

// ==========================================
// MAIN WORKSPACE SECTIONS
// ==========================================

const RecipeDiscovery: React.FC = () => {
  const { recipes, isLoading, searchRecipes } = usePlanner();
  const [inputVal, setInputVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes(inputVal);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500/10 via-sky-500/10 to-orange-500/10 p-6 rounded-2xl border border-orange-100/50">
        <h2 className="text-xl font-bold text-slate-800 mb-1">Search & Discover Recipes</h2>
        <p className="text-slate-600 text-sm mb-4">Input ingredients you have on hand, separating them with commas.</p>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-3 bg-orange-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition shadow-inner text-sm text-slate-800"
              placeholder="e.g. Avocado, tomato, spinach, garlic..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl font-semibold shadow-md transition text-sm shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Harvesting delicious suggestions...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

const WeeklyPlanner: React.FC = () => {
  const { mealPlan, removeMealFromPlan, clearPlan } = usePlanner();

  const handleRemove = (day: DayOfWeek, mealType: MealType, e: React.MouseEvent) => {
    e.stopPropagation();
    removeMealFromPlan(day, mealType);
  };

  const hasMealsPlanned = Object.values(mealPlan).some(day => day && Object.keys(day).length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Weekly Meal Calendar</h2>
          <p className="text-sm text-slate-600">Plan out meals across days to balance your diet.</p>
        </div>
        {hasMealsPlanned && (
          <button 
            onClick={clearPlan}
            className="px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg transition"
          >
            Reset Week
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {DAYS_OF_WEEK.map((day) => {
          const dayMeals = mealPlan[day] || {};
          return (
            <div 
              key={day} 
              className="bg-orange-50/70 border border-orange-100 rounded-xl p-3 flex flex-col min-h-[300px] shadow-sm"
            >
              <h3 className="font-bold text-slate-700 border-b border-orange-200/50 pb-2 mb-3 text-center text-sm uppercase tracking-wide">
                {day}
              </h3>
              
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                {MEAL_TYPES.map((mealType) => {
                  const meal = dayMeals[mealType];
                  return (
                    <div 
                      key={mealType} 
                      className={`p-2.5 rounded-lg border text-left transition relative flex flex-col justify-between h-[84px] ${
                        meal 
                          ? 'bg-sky-50/80 border-sky-200' 
                          : 'bg-orange-50 border-orange-100/40 border-dashed hover:border-sky-200'
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none mb-1">
                          {mealType}
                        </span>
                        {meal ? (
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-2 pr-4 leading-snug">
                            {meal.label}
                          </h4>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No meal set</span>
                        )}
                      </div>

                      {meal && (
                        <button 
                          onClick={(e) => handleRemove(day, mealType, e)}
                          className="absolute top-1 right-1 text-slate-400 hover:text-red-500 p-1 rounded-full transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ShoppingList: React.FC = () => {
  const { shoppingList } = usePlanner();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="bg-orange-50/90 border border-orange-100 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
        <ShoppingCart className="text-orange-500" size={20} /> Dynamic Shopping List
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Automatically compiled from recipes designated in your meal calendar.
      </p>

      {shoppingList.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-orange-200 rounded-xl bg-orange-100/20">
          <p className="text-sm text-slate-500">Your shopping list is empty. Add recipes to the Weekly Calendar to construct a list.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
          {shoppingList.map((item, index) => (
            <div 
              key={index}
              onClick={() => toggleItem(item)}
              className="flex items-center gap-3 p-2.5 rounded-lg border border-sky-100 bg-sky-50/40 hover:bg-sky-50 cursor-pointer transition"
            >
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                checkedItems[item] 
                  ? 'bg-sky-500 border-sky-500 text-white' 
                  : 'border-slate-300'
              }`}>
                {checkedItems[item] && <Check size={14} />}
              </div>
              <span className={`text-sm text-slate-700 transition-all ${
                checkedItems[item] ? 'line-through text-slate-400' : ''
              }`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// PARENT LAYOUT & APPLICATION CORE
// ==========================================

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'planner'>('discover');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    // Color Profile: Gradient of Sky Blue elements and soft Orange overlaying a comfortable warm cream canvas
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-orange-50 to-sky-100/50 pb-12 font-sans selection:bg-orange-200">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-orange-50/90 backdrop-blur-md border-b border-orange-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-2 rounded-xl text-white shadow">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 tracking-tight leading-none">DishCraft</h1>
              <span className="text-[10px] font-semibold text-sky-600 tracking-wider uppercase">Discovery & Meal Prep</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex bg-slate-200/50 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 flex items-center gap-1.5 ${
                  activeTab === 'discover' 
                    ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Search size={16} /> Discover
              </button>
              <button 
                onClick={() => setActiveTab('planner')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 flex items-center gap-1.5 ${
                  activeTab === 'planner' 
                    ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar size={16} /> Weekly Plan
              </button>
            </nav>

            <button 
              onClick={() => setIsConfigOpen(true)}
              className="p-2 border border-slate-200 rounded-xl bg-orange-50 hover:bg-slate-100 text-slate-600 transition"
              title="API Setup"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'discover' ? <RecipeDiscovery /> : <WeeklyPlanner />}
        <ShoppingList />
      </main>

      <ApiSettingsModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <PlannerProvider>
      <AppLayout />
    </PlannerProvider>
  );
}

