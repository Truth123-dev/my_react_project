
import React, { useState } from 'react';
import { 
  Check, 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  Shield, 
  Zap, 
  BarChart3, 
  ChevronDown,
  Users,
  MessageSquare
} from 'lucide-react';

// --- Type Definitions ---
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-orange-500 selection:text-white">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Layers className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                SaaS<span className="text-orange-500">Force</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Testimonials</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">FAQ</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors px-3 py-2">
                Sign In
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                Start Free Trial
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded={isMenuOpen}
                aria-label="Toggle main menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              FAQ
            </a>
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2 px-3">
              <button className="w-full text-center py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">
                Sign In
              </button>
              <button className="w-full text-center py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors shadow">
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Container */}
      <main id="main-content">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              
              {/* Hero Left Info */}
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  Now live: Version 3.0 Platform Upgrade
                </span>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  Streamline operations. <br />
                  <span className="text-blue-600">Scale without limits.</span>
                </h1>
                <p className="mt-4 text-base text-slate-600 sm:mt-5 sm:text-xl">
                  Manage your team's workflow, analyze critical metrics, and automate everyday processes with a dashboard engineered for high-performance enterprises.
                </p>

                {/* Hero CTAs */}
                <div className="mt-8 sm:max-w-lg sm:mx-auto lg:mx-0 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Get Started Free <ArrowRight className="h-5 w-5" />
                  </button>
                  <button className="flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-blue-600 hover:border-blue-500 font-semibold transition-all duration-200">
                    Book Live Demo
                  </button>
                </div>
                
                <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Check className="text-emerald-500 h-4 w-4" /> No credit card required</span>
                  <span className="flex items-center gap-1"><Check className="text-emerald-500 h-4 w-4" /> 14-day free trial</span>
                </div>
              </div>

              {/* Hero Right Visual */}
              <div className="mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 flex justify-center relative">
                <div className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10">
                  <div className="relative rounded-lg bg-slate-900 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
                    {/* Mock Browser Header */}
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800 border-b border-slate-700">
                      <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <div className="ml-4 bg-slate-700 h-4 w-32 rounded-sm opacity-60"></div>
                    </div>
                    {/* Mock Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between text-slate-400">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="h-6 w-24 bg-blue-500/20 rounded border border-blue-500/30"></div>
                          <div className="h-6 w-16 bg-orange-500/20 rounded border border-orange-500/30"></div>
                        </div>
                        <div className="h-3 bg-slate-800 rounded w-full"></div>
                        <div className="h-3 bg-slate-800 rounded w-5/6"></div>
                        <div className="h-3 bg-slate-800 rounded w-4/6"></div>
                      </div>
                      
                      {/* Visual Graphic Representation */}
                      <div className="mt-4 bg-slate-900 p-4 border border-slate-800 rounded-lg flex items-end gap-2 h-28">
                        <div className="bg-blue-600 w-full rounded-t" style={{ height: '40%' }}></div>
                        <div className="bg-orange-500 w-full rounded-t" style={{ height: '65%' }}></div>
                        <div className="bg-blue-500 w-full rounded-t" style={{ height: '50%' }}></div>
                        <div className="bg-slate-700 w-full rounded-t" style={{ height: '30%' }}></div>
                        <div className="bg-orange-600 w-full rounded-t" style={{ height: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-slate-50 py-10 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Trusted by scaling operations around the globe
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 items-center justify-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex justify-center text-sm font-bold text-slate-600">ACME CORP</div>
              <div className="flex justify-center text-sm font-bold text-slate-600">GLOBEX</div>
              <div className="flex justify-center text-sm font-bold text-slate-600">INITECH</div>
              <div className="flex justify-center text-sm font-bold text-slate-600">UMBRELLA</div>
              <div className="flex justify-center text-sm font-bold text-slate-600">Hooli</div>
              <div className="flex justify-center text-sm font-bold text-slate-600">VeerTech</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-28 bg-white scroll-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Features Suite</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Engineered to optimize your routine workflow
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                A streamlined operations suite loaded with capabilities to monitor, optimize, and report on organizational milestones.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<Zap className="h-6 w-6 text-orange-500" />}
                title="Immediate Automation"
                description="Trigger workflow steps instantly with simple conditions. Save hours of manual effort daily without typing a single line of code."
              />
              <FeatureCard 
                icon={<Shield className="h-6 w-6 text-blue-600" />}
                title="Enterprise-Grade Security"
                description="We employ SOC-2 compliance standards, end-to-end encryption, and rigorous continuous monitoring protocols to keep system data private."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
                title="Advanced Dashboarding"
                description="Generate performance matrices, dynamic exports, and interactive cohort tables to share cleanly with strategic partners."
              />
              <FeatureCard 
                icon={<Users className="h-6 w-6 text-blue-600" />}
                title="Collaborative Syncing"
                description="Centralize shared projects. Coordinate file structures and view audit paths directly from integrated environments."
              />
              <FeatureCard 
                icon={<MessageSquare className="h-6 w-6 text-orange-500" />}
                title="Central Notifications"
                description="Deliver automatic reports and system changes straight to third-party endpoints, including Slack, Teams, and webhooks."
              />
              <FeatureCard 
                icon={<Layers className="h-6 w-6 text-blue-600" />}
                title="Modular Integrations"
                description="Extend functionality with easy APIs. Hook into external platforms to sync inventories, orders, or records."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200 scroll-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Pricing Structures</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Transparent plans for scaling groups
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Pick an adaptable subscription tier corresponding to your organizational requirements. Free scaling tier available.
              </p>
              
              {/* Interactive Pricing Toggle */}
              <div className="mt-10 flex items-center justify-center gap-4">
                <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  type="button"
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 bg-slate-300"
                  role="switch"
                  aria-checked={isAnnual}
                  aria-label="Toggle annual pricing"
                >
                  <span 
                    aria-hidden="true" 
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAnnual ? 'translate-x-5 bg-blue-600' : 'translate-x-0'}`}
                  />
                </button>
                <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'} flex items-center gap-1.5`}>
                  Annual (Save 30%)
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-800">
                    20% OFF
                  </span>
                </span>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              
              <PricingCard 
                title="Starter"
                price={isAnnual ? "19" : "24"}
                period={isAnnual ? "yr" : "mo"}
                description="Essential operations workspace for individuals or newly formed teams."
                features={[
                  "Up to 3 active projects",
                  "Standard dashboard tooling",
                  "Secure community support",
                  "6 GB Cloud allocation limit",
                ]}
                ctaText="Start Free Trial"
              />

              <PricingCard 
                title="Growth Suite"
                price={isAnnual ? "59" : "74"}
                period={isAnnual ? "yr" : "mo"}
                description="Designed for scaling outfits looking for deeper insight workflows."
                features={[
                  "Unlimited active projects",
                  "Comprehensive analytics views",
                  "Dedicated API gateway keys",
                  "50 GB Cloud allocation limit",
                  "Priority business day help",
                ]}
                isPopular={true}
                ctaText="Start Growth Trial"
              />

              <PricingCard 
                title="Enterprise"
                price={isAnnual ? "119" : "149"}
                period={isAnnual ? "yr" : "mo"}
                description="Deep compliance options suited for advanced workloads."
                features={[
                  "Unlimited everything",
                  "Full white-label dashboarding",
                  "Premium API call limits",
                  "Tailored Cloud allocation levels",
                  "Dedicated 24/7 Account Partner",
                  "99.9% uptime commitments",
                ]}
                ctaText="Contact Sales Support"
              />

            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-slate-200 scroll-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Testimonials</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Supported by exceptional operators
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 flex flex-col justify-between">
                <p className="text-slate-600 italic">
                  "Transitioning team systems to SaaSForce unified our operations pipelines within three system periods. Highly recommend for managing multi-tier setups."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    HR
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Helena Rostova</h3>
                    <p className="text-xs text-slate-500">Director of Systems, TechStream</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 flex flex-col justify-between">
                <p className="text-slate-600 italic">
                  "The analytical dashboard views saved us roughly eight internal hours each report period. Our partners valued the automated exports immensely."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    MK
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Marcus Vance</h3>
                    <p className="text-xs text-slate-500">Principal Architect, Apex Solutions</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 flex flex-col justify-between">
                <p className="text-slate-600 italic">
                  "The customer care framework exceeded our operational constraints. We customized endpoints cleanly with modular API parameters."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    ST
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Sarah Tanaka</h3>
                    <p className="text-xs text-slate-500">Product Lead, CloudCore</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="py-20 lg:py-28 bg-slate-50 scroll-mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Common Inquiries</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Find helpful explanations regarding setups, subscriptions, and security parameters.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              <FaqItem 
                question="How does the 14-day testing program function?"
                answer="Our testing program allows unlimited dashboard features access for up to two full continuous workweeks. You can choose to upgrade or cancel anytime during this phase without billing penalties."
                isOpen={openFaqIndex === 0}
                onToggle={() => toggleFaq(0)}
              />
              <FaqItem 
                question="Can team configurations be dynamically adjusted later?"
                answer="Yes. Subscriptions adjust dynamically based on active usage. You can upgrade, downgrade, or cancel directly inside your administration panels anytime."
                isOpen={openFaqIndex === 1}
                onToggle={() => toggleFaq(1)}
              />
              <FaqItem 
                question="Is custom API documentation included?"
                answer="Comprehensive, schema-validated API guides are standard on all levels. Starter subscriptions receive up to three secure webhooks, while higher plans benefit from full schema access."
                isOpen={openFaqIndex === 2}
                onToggle={() => toggleFaq(2)}
              />
              <FaqItem 
                question="What security practices protect customer datastores?"
                answer="We run isolated multi-region databases with full encryption on-disk and during transit. We complete periodic security audits to ensure reliable infrastructure integrity."
                isOpen={openFaqIndex === 3}
                onToggle={() => toggleFaq(3)}
              />
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500 filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-orange-500 filter blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to unify your system workflows?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
              Set up your profile structures in minutes. Scale operational volume cleanly without administrative headaches.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow">
                Start Free Trial
              </button>
              <button className="bg-transparent hover:bg-white/10 border border-slate-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Contact Enterprise
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              No long-term commitments required. Upgrade or downgrade seamlessly.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
                  <Layers className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold text-white tracking-tight">
                  SaaS<span className="text-orange-500">Force</span>
                </span>
              </div>
              <p className="text-sm max-w-sm">
                Optimized enterprise solutions facilitating smooth workflow architectures and performance metrics.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security Rules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Developer Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API References</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Inquiries</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Principles</a></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} SaaSForce Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Helper Sub-components ---

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
      <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, period, description, features, isPopular = false, ctaText }: PricingCardProps) {
  return (
    <div className={`relative p-8 bg-white rounded-2xl border flex flex-col justify-between ${
      isPopular 
        ? 'border-blue-600 shadow-lg scale-100 md:scale-105 z-10' 
        : 'border-slate-200 shadow-sm'
    }`}>
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white uppercase tracking-wider">
          Most Popular Choice
        </span>
      )}
      <div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed min-h-[40px]">{description}</p>
        <div className="mt-6 flex items-baseline">
          <span className="text-4xl font-extrabold text-slate-900">${price}</span>
          <span className="ml-1 text-slate-500">/{period}</span>
        </div>

        <ul className="mt-8 space-y-3.5" aria-label={`Features included with ${title}`}>
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
              <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <button className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isPopular 
            ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-sm' 
            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400'
        }`}>
          {ctaText}
        </button>
      </div>
    </div>
  );
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border border-slate-200 bg-white rounded-lg overflow-hidden transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}