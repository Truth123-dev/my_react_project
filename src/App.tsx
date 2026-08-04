

import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Activity, 
  Heart,  
  Shield, 
  ChevronRight, 
  Star, 
  X, 
  CheckCircle2, 
  Menu,
  Sparkles
} from 'lucide-react';

// Interfaces for our data
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
}

interface Doctor {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  rating: number;
  availability: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Medicine',
    doctor: '',
    date: '',
    notes: ''
  });

  const services: Service[] = [
    {
      id: 1,
      title: "Cardiology",
      description: "Comprehensive heart care including diagnostics, preventative care, and advanced treatment options.",
      icon: <Heart className="h-6 w-6 text-emerald-600" />
    },
    {
      id: 2,
      title: "Emergency Care",
      description: "24/7 rapid-response emergency department fully equipped for critical care and trauma patients.",
      icon: <Activity className="h-6 w-6 text-emerald-600" />
    },
    {
      id: 3,
      title: "Pediatrics",
      description: "Dedicated healthcare for infants, children, and adolescents delivered by experienced pediatric specialists.",
      icon: <Sparkles className="h-6 w-6 text-emerald-600" />
    },
    {
      id: 4,
      title: "Neurology",
      description: "Specialized assessment and management of disorders affecting the brain, spinal cord, and nervous system.",
      icon: <Shield className="h-6 w-6 text-emerald-600" />
    }
  ];

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      role: "Chief of Cardiology",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      availability: "Mon, Wed, Fri"
    },
    {
      id: 2,
      name: "Dr. Marcus Vance",
      role: "Senior Neurosurgeon",
      specialty: "Neurology",
      image: "https://images.unsplash.com/photo-1645066928295-2506defde470?auto=format&fit=crop&q=80&w=400",
      rating: 4.8,
      availability: "Tue, Thu"
    },
    {
      id: 3,
      name: "Dr. Alisha Patel",
      role: "Pediatric Specialist",
      specialty: "Pediatrics",
      image: "https://images.unsplash.com/photo-1645066928295-2506defde470?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      availability: "Mon, Tue, Thu, Fri"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setIsBookingOpen(false);
      setBookingSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: 'General Medicine',
        doctor: '',
        date: '',
        notes: ''
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes softFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-fade-up {
          animation: fadeUp 700ms ease both;
        }

        .animate-fade-in {
          animation: fadeIn 400ms ease both;
        }

        .animate-scale-in {
          animation: scaleIn 360ms ease both;
        }

        .animate-soft-float {
          animation: softFloat 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up,
          .animate-fade-in,
          .animate-scale-in,
          .animate-soft-float {
            animation: none;
          }
        }
      `}</style>
      
      {/* Top Banner Contact bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-2 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-emerald-300" />
              <span>Emergency 24/7: <strong>(555) 0199-911</strong></span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-300" />
              <span>Mon - Sun: 08:00 AM - 10:00 PM</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-emerald-300" />
            <span>123 Medical Boulevard, Center City</span>
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block">Hopewell</span>
              <span className="text-xs text-emerald-600 font-medium tracking-widest uppercase block -mt-1">Medical Center</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Services</a>
            <a href="#doctors" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Specialists</a>
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">About Us</a>
            <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:block">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-5 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
            <a 
              href="#services" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-2 hover:text-emerald-600"
            >
              Services
            </a>
            <a 
              href="#doctors" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-2 hover:text-emerald-600"
            >
              Specialists
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-2 hover:text-emerald-600"
            >
              About Us
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-2 hover:text-emerald-600"
            >
              Contact
            </a>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full bg-emerald-600 text-white text-sm font-semibold py-3 rounded-lg block text-center"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-slate-900 to-slate-800 text-white overflow-hidden py-20 lg:py-28 animate-fade-in">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&q=80&w=1600" 
            alt="Hospital Building Exterior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Accepting New Patients
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Compassionate Care, <br className="hidden sm:inline" />
              <span className="text-emerald-400">Advanced Medicine</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Hopewell Medical Center delivers world-class clinical care with a patient-centric philosophy. Accessible treatment, industry-leading specialists, and responsive support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all text-center flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Schedule Consultation
              </button>
              <a 
                href="#services" 
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3.5 px-8 rounded-lg border border-slate-700 hover:border-slate-600 transition-all text-center"
              >
                Our Specialties
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 animate-soft-float">
              <img 
                src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600" 
                alt="Healthcare Professional with Patient" 
                className="w-full h-100 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-4 rounded-xl text-slate-900 shadow-lg">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">State-of-the-Art Care</p>
                <p className="text-sm font-semibold text-slate-800">Equipped with the latest diagnostic and imaging equipment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-white border-b border-slate-200 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-extrabold text-slate-900">12,000+</p>
              <p className="text-sm font-medium text-slate-500 mt-1">Annual Successful Procedures</p>
            </div>
            <div className="text-center border-l border-slate-100 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-extrabold text-slate-900">150+</p>
              <p className="text-sm font-medium text-slate-500 mt-1">Specialist Physicians</p>
            </div>
            <div className="text-center border-l border-slate-100 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-extrabold text-slate-900">99.2%</p>
              <p className="text-sm font-medium text-slate-500 mt-1">Patient Satisfaction Rate</p>
            </div>
            <div className="text-center border-l border-slate-100 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-extrabold text-slate-900">25+</p>
              <p className="text-sm font-medium text-slate-500 mt-1">Specialty Departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-3">Our Expertise</h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Core Clinical Services</p>
          <p className="text-slate-600 mt-4 text-base">We offer a full spectrum of healthcare options utilizing highly advanced methods to assist in patient assessment, recovery, and rehabilitation.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md hover:-translate-y-1 group animate-fade-up"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="bg-emerald-50 rounded-lg p-3 w-fit mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {React.cloneElement(service.icon, {
                  className: "h-6 w-6 text-emerald-600 group-hover:text-white transition-colors"
                })}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{service.description}</p>
              <a href="#contact" className="mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Learn more
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital Showcase Info (Split Section) */}
      <section id="about" className="bg-slate-100 py-20 lg:py-24 border-y border-slate-200 animate-fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 animate-fade-up">
            <h2 className="text-xs font-bold text-emerald-600 tracking-wider uppercase">Modern Facilities</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Why Choose Hopewell Medical?</h3>
            <p className="text-slate-600">
              Our campus boasts state-of-the-art laboratory testing, high-resolution diagnostic imaging suites, and sterilized surgical facilities designed to support optimal recovery environments.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900">Accredited Clinical Staff</h4>
                  <p className="text-sm text-slate-600">Every physician on our staff maintains board certification in their respective medical specialties.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900">Patient-First Care Coordination</h4>
                  <p className="text-sm text-slate-600">We assist you through every milestone of treatment from direct insurance filing to recovery discharge planning.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900">24-Hour Service Availability</h4>
                  <p className="text-sm text-slate-600">Our emergency wards and critical response laboratories remain active every hour of the year.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400" 
                alt="Hospital Ward Corridor" 
                className="rounded-xl shadow-md w-full h-48 object-cover object-center transition-transform duration-500 hover:scale-105 animate-fade-up"
              />
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400" 
                alt="Medical Laboratory Diagnostics" 
                className="rounded-xl shadow-md w-full h-48 object-cover mt-6 transition-transform duration-500 hover:scale-105 animate-fade-up"
                style={{ animationDelay: '90ms' }}
              />
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400" 
                alt="Attentive Clinical Care" 
                className="rounded-xl shadow-md w-full h-48 object-cover -mt-6 transition-transform duration-500 hover:scale-105 animate-fade-up"
                style={{ animationDelay: '180ms' }}
              />
              <img 
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400" 
                alt="Modern Medical Devices" 
                className="rounded-xl shadow-md w-full h-48 object-cover transition-transform duration-500 hover:scale-105 animate-fade-up"
                style={{ animationDelay: '270ms' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialists/Doctors Section */}
      <section id="doctors" className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-3">Our Physicians</h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Board Certified Specialists</p>
          <p className="text-slate-600 mt-4 text-base">Meet our practice directors dedicated to delivering exceptional treatment outcomes across key medical departments.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <div className="relative h-64 bg-slate-100">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>{doctor.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase">{doctor.specialty}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{doctor.name}</h3>
                <p className="text-xs text-slate-500 font-medium mb-4">{doctor.role}</p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Available on:</span>
                  <span className="font-semibold text-slate-950">{doctor.availability}</span>
                </div>
                <button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, doctor: doctor.name, department: doctor.specialty }));
                    setIsBookingOpen(true);
                  }}
                  className="mt-5 w-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold py-2 rounded-lg border border-slate-200 hover:border-emerald-300 transition-all text-xs"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-scale-in">
            <div className="bg-emerald-900 text-white p-6">
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-bold">Request an Appointment</h3>
              <p className="text-xs text-emerald-200 mt-1.5">Please provide your details below. A patient representative will reach out to confirm your scheduled block.</p>
            </div>

            {bookingSubmitted ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="bg-emerald-100 text-emerald-600 p-3.5 rounded-full">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Request Received</h4>
                  <p className="text-sm text-slate-600 mt-1 max-w-sm">We are reviewing available slots based on your selections and will contact you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000"
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="department" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
                    <select 
                      id="department"
                      name="department" 
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="General Medicine">General Medicine</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      id="date"
                      name="date" 
                      required 
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="doctor" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Physician (Optional)</label>
                  <input 
                    type="text" 
                    id="doctor"
                    name="doctor" 
                    value={formData.doctor}
                    onChange={handleInputChange}
                    placeholder="Specific specialist name if known"
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Additional Notes</label>
                  <textarea 
                    id="notes"
                    name="notes" 
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the symptoms or reason for visit"
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-all text-sm mt-2"
                >
                  Submit Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Info / Contact Section */}
      <section id="contact" className="py-20 lg:py-24 bg-slate-900 text-slate-300 animate-fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white p-2 rounded-lg">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Hopewell</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Delivering professional and specialized healthcare infrastructure designed around standard procedural accuracy and supportive recovery processes.
            </p>
            <div className="space-y-4 pt-2 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500" />
                <span>Primary Clinic: (555) 0199-900</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-500" />
                <span>123 Medical Boulevard, Center City</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-emerald-500" />
                <span>Emergency Admittance: 24 Hours / 7 Days</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Helpful Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Specialties & Care</a></li>
              <li><a href="#doctors" className="hover:text-emerald-400 transition-colors">Doctor Profiles</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">Safety Standards</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Facility Tour</a></li>
              <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-emerald-400 transition-colors text-left">Appointment Registration</button></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Facility Hours</h4>
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-800 text-sm space-y-3.5">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Outpatient Clinics</span>
                <span className="font-semibold text-white">Mon - Sat: 9 AM - 6 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Visiting Hours</span>
                <span className="font-semibold text-white">Daily: 11 AM - 8 PM</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Trauma Center</span>
                <span>Open 24/7</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer copyright */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Hopewell Medical Center. All clinical rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#about" className="hover:text-slate-300">Terms of Care</a>
            <a href="#about" className="hover:text-slate-300">Nondiscrimination Notice</a>
          </div>
        </div>
      </footer>

    </div>
  );
}


