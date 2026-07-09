import React, { useState, useEffect, useMemo } from "react";

// --- TYPES & INTERFACES ---
interface Policy {
  id: string;
  policyNumber: string;
  holderName: string;
  holderEmail: string;
  type: "Auto" | "Home" | "Life" | "Health";
  premium: number;
  coverageAmount: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Pending";
}

interface Claim {
  id: string;
  policyNumber: string;
  holderName: string;
  claimAmount: number;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
  dateFiled: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  policyCount: number;
}

// --- INITIAL MOCK DATA ---
const INITIAL_POLICIES: Policy[] = [
  {
    id: "1",
    policyNumber: "POL-1001",
    holderName: "Jane Doe",
    holderEmail: "jane.doe@example.com",
    type: "Health",
    premium: 120,
    coverageAmount: 50000,
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    status: "Active",
  },
  {
    id: "2",
    policyNumber: "POL-1002",
    holderName: "John Smith",
    holderEmail: "john.smith@example.com",
    type: "Auto",
    premium: 85,
    coverageAmount: 25000,
    startDate: "2023-06-10",
    endDate: "2024-06-10",
    status: "Expired",
  },
  {
    id: "3",
    policyNumber: "POL-1003",
    holderName: "Alice Johnson",
    holderEmail: "alice.j@example.com",
    type: "Home",
    premium: 210,
    coverageAmount: 150000,
    startDate: "2024-03-01",
    endDate: "2025-03-01",
    status: "Active",
  },
  {
    id: "4",
    policyNumber: "POL-1004",
    holderName: "Robert Lee",
    holderEmail: "robert.lee@example.com",
    type: "Life",
    premium: 150,
    coverageAmount: 200000,
    startDate: "2024-02-20",
    endDate: "2025-02-20",
    status: "Pending",
  },
  {
    id: "5",
    policyNumber: "POL-1005",
    holderName: "Paul Don",
    holderEmail: "Paul.D@example.com",
    type: "Home",
    premium: 310,
    coverageAmount: 450000,
    startDate: "2024-05-01",
    endDate: "2025-02-01",
    status: "Active",
  },
  {
    id: "6",
    policyNumber: "POL-1006",
    holderName: "Kan Lee",
    holderEmail: "Kan.lee@example.com",
    type: "Life",
    premium: 350,
    coverageAmount: 500000,
    startDate: "2024-02-20",
    endDate: "2025-01-20",
    status: "Pending",
  },
];

const INITIAL_CLAIMS: Claim[] = [
  {
    id: "c1",
    policyNumber: "POL-1001",
    holderName: "Jane Doe",
    claimAmount: 1200,
    description: "Annual physical & dental checkups",
    status: "Approved",
    dateFiled: "2024-02-10",
  },
  {
    id: "c2",
    policyNumber: "POL-1003",
    holderName: "Alice Johnson",
    claimAmount: 4500,
    description: "Minor water leakage damage in kitchen",
    status: "Pending",
    dateFiled: "2024-03-15",
  },
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "policies" | "claims" | "customers"
  >("dashboard");

  // Application State
  const [policies, setPolicies] = useState<Policy[]>(() => {
    const saved = localStorage.getItem("ins_policies");
    return saved ? JSON.parse(saved) : INITIAL_POLICIES;
  });

  const [claims, setClaims] = useState<Claim[]>(() => {
    const saved = localStorage.getItem("ins_claims");
    return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
  });

  // Keep localStorage sync'd
  useEffect(() => {
    localStorage.setItem("ins_policies", JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem("ins_claims", JSON.stringify(claims));
  }, [claims]);

  // Derived Customers Data
  const customers = useMemo<Customer[]>(() => {
    const customerMap: Record<
      string,
      { name: string; email: string; count: number }
    > = {};
    policies.forEach((p) => {
      if (!customerMap[p.holderEmail]) {
        customerMap[p.holderEmail] = {
          name: p.holderName,
          email: p.holderEmail,
          count: 0,
        };
      }
      customerMap[p.holderEmail].count += 1;
    });
    return Object.values(customerMap).map((c, index) => ({
      id: `cus-${index}`,
      name: c.name,
      email: c.email,
      phone: "+1 (555) 019-2834",
      policyCount: c.count,
    }));
  }, [policies]);

  // Modal States
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  // Form States
  const [newPolicy, setNewPolicy] = useState<Partial<Policy>>({
    holderName: "",
    holderEmail: "",
    type: "Health",
    premium: 0,
    coverageAmount: 0,
    startDate: "",
    endDate: "",
    status: "Active",
  });

  const [newClaim, setNewClaim] = useState<Partial<Claim>>({
    policyNumber: "",
    claimAmount: 0,
    description: "",
  });

  // Filter States
  const [policyFilter, setPolicyFilter] = useState("");
  const [claimFilter, setClaimFilter] = useState("");

  // Handlers
  const handleAddPolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const policyId = `POL-${Math.floor(1000 + Math.random() * 9000)}`;
    const created: Policy = {
      id: String(Date.now()),
      policyNumber: policyId,
      holderName: newPolicy.holderName || "N/A",
      holderEmail: newPolicy.holderEmail || "N/A",
      type: newPolicy.type || "Health",
      premium: Number(newPolicy.premium) || 0,
      coverageAmount: Number(newPolicy.coverageAmount) || 0,
      startDate: newPolicy.startDate || new Date().toISOString().split("T")[0],
      endDate: newPolicy.endDate || new Date().toISOString().split("T")[0],
      status: (newPolicy.status as Policy["status"]) || "Active",
    };

    setPolicies([created, ...policies]);
    setShowPolicyModal(false);
    setNewPolicy({
      holderName: "",
      holderEmail: "",
      type: "Health",
      premium: 0,
      coverageAmount: 0,
      startDate: "",
      endDate: "",
      status: "Active",
    });
  };

  const handleAddClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const matchingPolicy = policies.find(
      (p) =>
        p.policyNumber.toUpperCase() ===
        (newClaim.policyNumber || "").toUpperCase(),
    );

    const created: Claim = {
      id: `c-${Date.now()}`,
      policyNumber: (newClaim.policyNumber || "").toUpperCase(),
      holderName: matchingPolicy
        ? matchingPolicy.holderName
        : "Unknown Claimant",
      claimAmount: Number(newClaim.claimAmount) || 0,
      description: newClaim.description || "",
      status: "Pending",
      dateFiled: new Date().toISOString().split("T")[0],
    };

    setClaims([created, ...claims]);
    setShowClaimModal(false);
    setNewClaim({ policyNumber: "", claimAmount: 0, description: "" });
  };

  const updateClaimStatus = (id: string, newStatus: Claim["status"]) => {
    setClaims(
      claims.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
    );
  };

  const updatePolicyStatus = (id: string, newStatus: Policy["status"]) => {
    setPolicies(
      policies.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
  };

  // Calculations for dashboard
  const stats = useMemo(() => {
    const totalPremium = policies.reduce(
      (acc, p) => (p.status === "Active" ? acc + p.premium : acc),
      0,
    );
    const activePolicies = policies.filter((p) => p.status === "Active").length;
    const pendingClaims = claims.filter((c) => c.status === "Pending").length;
    const totalPayouts = claims
      .filter((c) => c.status === "Approved")
      .reduce((acc, c) => acc + c.claimAmount, 0);
    return { totalPremium, activePolicies, pendingClaims, totalPayouts };
  }, [policies, claims]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              VisionGuard Insurance Systems
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-slate-300">Logged in as Agent</p>
              <p className="text-sm font-semibold text-slate-700">
                Vision Guard_Ins
              </p>
            </div>
            <div className="h-9 w-9 bg-indigo-500 rounded-full flex items-center justify-center text-slate-600 font-semibold border border-slate-300">
              V_G
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-1 flex-col md:flex-row gap-8">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 bg-white p-2 rounded-xl border border-slate-200 shadow-sm overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full ${activeTab === "dashboard" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
                />
              </svg>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("policies")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full ${activeTab === "policies" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Policies</span>
            </button>
            <button
              onClick={() => setActiveTab("claims")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full ${activeTab === "claims" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Claims</span>
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full ${activeTab === "customers" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Customers</span>
            </button>
          </nav>
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="flex-1 space-y-6">
          {/* VIEW 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Dashboard
                  </h1>
                  <p className="text-slate-500">
                    Overview of metrics and status updates.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPolicyModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2.5 rounded-lg shadow-sm font-medium transition-colors"
                  >
                    + New Policy
                  </button>
                  <button
                    onClick={() => setShowClaimModal(true)}
                    className="bg-white border border-slate-200 text-slate-700 text-sm px-4 py-2.5 rounded-lg shadow-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    File Claim
                  </button>
                </div>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Active Policies
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.activePolicies}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Monthly Premium
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      ${stats.totalPremium.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Pending Claims
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.pendingClaims}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Total Claims Paid
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      ${stats.totalPayouts.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK RECENT UPDATES GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Policies Block */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">
                      Recent Policies
                    </h2>
                    <button
                      onClick={() => setActiveTab("policies")}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {policies.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        className="py-3 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            {p.holderName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {p.policyNumber} · {p.type}
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 text-xs rounded-full font-semibold ${p.status === "Active" ? "bg-emerald-50 text-emerald-700" : p.status === "Expired" ? "bg-slate-100 text-slate-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Claims Block */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">
                      Recent Claims
                    </h2>
                    <button
                      onClick={() => setActiveTab("claims")}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {claims.slice(0, 3).map((c) => (
                      <div
                        key={c.id}
                        className="py-3 flex justify-between items-center"
                      >
                        <div className="max-w-[70%]">
                          <p className="font-semibold text-slate-700 text-sm truncate">
                            {c.description}
                          </p>
                          <p className="text-xs text-slate-500">
                            {c.holderName} · {c.policyNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800 text-sm">
                            ${c.claimAmount}
                          </p>
                          <span
                            className={`text-xs font-semibold ${c.status === "Approved" ? "text-emerald-600" : c.status === "Rejected" ? "text-rose-600" : "text-amber-600"}`}
                          >
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: POLICIES */}
          {activeTab === "policies" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Policies
                  </h1>
                  <p className="text-slate-500">
                    Track and manage client agreements.
                  </p>
                </div>
                <button
                  onClick={() => setShowPolicyModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2.5 rounded-lg shadow-sm font-medium transition-colors"
                >
                  + Add Policy
                </button>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search by holder name, email or policy ID..."
                    value={policyFilter}
                    onChange={(e) => setPolicyFilter(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-slate-200 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* TABLE */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Policy ID
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Holder
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Premium / Coverage
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                    {policies
                      .filter(
                        (p) =>
                          p.holderName
                            .toLowerCase()
                            .includes(policyFilter.toLowerCase()) ||
                          p.policyNumber
                            .toLowerCase()
                            .includes(policyFilter.toLowerCase()) ||
                          p.holderEmail
                            .toLowerCase()
                            .includes(policyFilter.toLowerCase()),
                      )
                      .map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-slate-50/75 transition-colors"
                        >
                          <td className="p-4 font-bold text-indigo-600">
                            {p.policyNumber}
                          </td>
                          <td className="p-4">
                            <p className="font-semibold text-slate-800">
                              {p.holderName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {p.holderEmail}
                            </p>
                          </td>
                          <td className="p-4">
                            <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                              {p.type}
                            </span>
                          </td>
                          <td className="p-4">
                            <p className="font-semibold text-slate-800">
                              ${p.premium}/mo
                            </p>
                            <p className="text-xs text-slate-500">
                              of ${p.coverageAmount.toLocaleString()}
                            </p>
                          </td>
                          <td className="p-4 text-xs">
                            <p className="text-slate-700">{p.startDate} to</p>
                            <p className="text-slate-500">{p.endDate}</p>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 text-xs rounded-full font-semibold ${p.status === "Active" ? "bg-emerald-50 text-emerald-700" : p.status === "Expired" ? "bg-slate-100 text-slate-700" : "bg-amber-50 text-amber-700"}`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <select
                              value={p.status}
                              onChange={(e) =>
                                updatePolicyStatus(
                                  p.id,
                                  e.target.value as Policy["status"],
                                )
                              }
                              className="text-xs border border-slate-200 rounded-md p-1 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option value="Active">Active</option>
                              <option value="Pending">Pending</option>
                              <option value="Expired">Expired</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    {policies.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="p-8 text-center text-slate-400"
                        >
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 3: CLAIMS */}
          {activeTab === "claims" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Claims</h1>
                  <p className="text-slate-500">
                    Approve, reject, or filter outstanding incident requests.
                  </p>
                </div>
                <button
                  onClick={() => setShowClaimModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2.5 rounded-lg shadow-sm font-medium transition-colors"
                >
                  File Claim
                </button>
              </div>

              {/* FILTER BAR */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search by policy number, name or issue..."
                    value={claimFilter}
                    onChange={(e) => setClaimFilter(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-slate-200 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* GRID/CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {claims
                  .filter(
                    (c) =>
                      c.holderName
                        .toLowerCase()
                        .includes(claimFilter.toLowerCase()) ||
                      c.policyNumber
                        .toLowerCase()
                        .includes(claimFilter.toLowerCase()) ||
                      c.description
                        .toLowerCase()
                        .includes(claimFilter.toLowerCase()),
                  )
                  .map((c) => (
                    <div
                      key={c.id}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                              {c.policyNumber}
                            </span>
                            <h3 className="font-semibold text-slate-800 mt-2 text-base">
                              {c.holderName}
                            </h3>
                          </div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.status === "Approved" ? "bg-emerald-50 text-emerald-700" : c.status === "Rejected" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                          {c.description}
                        </p>
                      </div>

                      <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                        <div>
                          <p className="text-xs text-slate-400">Claim Amount</p>
                          <p className="text-lg font-bold text-slate-800">
                            ${c.claimAmount.toLocaleString()}
                          </p>
                        </div>
                        {c.status === "Pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateClaimStatus(c.id, "Approved")
                              }
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                updateClaimStatus(c.id, "Rejected")
                              }
                              className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs px-3 py-1.5 rounded font-medium transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Filed on {c.dateFiled}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* VIEW 4: CUSTOMERS */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
                <p className="text-slate-500">
                  Contact information and policy volume directory.
                </p>
              </div>

              {/* TABLE */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Policies Held
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                    {customers.map((cus) => (
                      <tr
                        key={cus.id}
                        className="hover:bg-slate-50/75 transition-colors"
                      >
                        <td className="p-4 font-semibold text-slate-800">
                          {cus.name}
                        </td>
                        <td className="p-4 text-slate-600">{cus.email}</td>
                        <td className="p-4 text-slate-500">{cus.phone}</td>
                        <td className="p-4">
                          <span className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold">
                            {cus.policyCount}{" "}
                            {cus.policyCount === 1 ? "Policy" : "Policies"}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-8 text-center text-slate-400"
                        >
                          No customers listed. Add a policy to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SureGuard Systems. Frontend-only
          simulation dashboard.
        </div>
      </footer>

      {/* POLICY MODAL */}
      {showPolicyModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 text-lg">
                Add New Policy
              </h2>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddPolicy} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Holder Name
                  </label>
                  <input
                    required
                    type="text"
                    value={newPolicy.holderName}
                    onChange={(e) =>
                      setNewPolicy({ ...newPolicy, holderName: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. Liam Sterling"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Holder Email
                  </label>
                  <input
                    required
                    type="email"
                    value={newPolicy.holderEmail}
                    onChange={(e) =>
                      setNewPolicy({
                        ...newPolicy,
                        holderEmail: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. liam@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Type
                  </label>
                  <select
                    value={newPolicy.type}
                    onChange={(e) =>
                      setNewPolicy({
                        ...newPolicy,
                        type: e.target.value as Policy["type"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 bg-white outline-none"
                  >
                    <option value="Health">Health</option>
                    <option value="Auto">Auto</option>
                    <option value="Home">Home</option>
                    <option value="Life">Life</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Premium ($ / mo)
                  </label>
                  <input
                    required
                    type="number"
                    value={newPolicy.premium || ""}
                    onChange={(e) =>
                      setNewPolicy({
                        ...newPolicy,
                        premium: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Coverage Limit ($)
                  </label>
                  <input
                    required
                    type="number"
                    value={newPolicy.coverageAmount || ""}
                    onChange={(e) =>
                      setNewPolicy({
                        ...newPolicy,
                        coverageAmount: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 100000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Start Date
                  </label>
                  <input
                    required
                    type="date"
                    value={newPolicy.startDate}
                    onChange={(e) =>
                      setNewPolicy({ ...newPolicy, startDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    End Date
                  </label>
                  <input
                    required
                    type="date"
                    value={newPolicy.endDate}
                    onChange={(e) =>
                      setNewPolicy({ ...newPolicy, endDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPolicyModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm px-4 py-2 rounded-lg font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium"
                >
                  Create Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLAIM MODAL */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 text-lg">
                File Incident Claim
              </h2>
              <button
                onClick={() => setShowClaimModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddClaim} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Policy Number
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. POL-1001"
                  value={newClaim.policyNumber}
                  onChange={(e) =>
                    setNewClaim({ ...newClaim, policyNumber: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Make sure this matches an existing policy ID to correctly link
                  the claim.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Claim Value ($)
                </label>
                <input
                  required
                  type="number"
                  placeholder="Estimated payout cost"
                  value={newClaim.claimAmount || ""}
                  onChange={(e) =>
                    setNewClaim({
                      ...newClaim,
                      claimAmount: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Incident Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the nature of the claim..."
                  value={newClaim.description}
                  onChange={(e) =>
                    setNewClaim({ ...newClaim, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowClaimModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm px-4 py-2 rounded-lg font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium"
                >
                  File Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
