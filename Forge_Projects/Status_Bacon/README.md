# Status Bacon - Website Monitoring Dashboard

A real-time website monitoring dashboard built with React, TypeScript, and SCSS. This application simulates a status page monitoring system with API endpoints and user authentication.

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── components/           # React components
│   │   │   ├── Header.tsx        # Navigation header with auth
│   │   │   ├── AuthModal.tsx     # Login/Signup modal
│   │   │   ├── StatsOverview.tsx # Statistics cards
│   │   │   ├── TabNavigation.tsx # Tab navigation bar
│   │   │   ├── MonitoredWebsites.tsx # Website cards grid
│   │   │   └── UptimeOverview.tsx # 30-day uptime chart
│   │   ├── utils/                # Utility functions
│   │   │   ├── api.ts            # Fake API for website data
│   │   │   └── auth.ts           # Fake authentication API
│   │   └── App.tsx               # Main application component
│   └── styles/                   # SCSS stylesheets
│       ├── app.scss              # Main app styles
│       ├── header.scss           # Header styles
│       ├── authModal.scss        # Auth modal styles
│       ├── statsOverview.scss    # Stats styles
│       ├── tabNavigation.scss    # Tab styles
│       ├── monitoredWebsites.scss # Website cards styles
│       ├── uptimeOverview.scss   # Chart styles
│       ├── theme.css             # Tailwind theme tokens
│       └── fonts.css             # Font imports
│   ├── main.tsx                  # Load the App.tsx
├── package.json                  # Project dependencies
└── README.md                     # This file
```

---

## SCSS Architecture

### **Why SCSS?**
SCSS (Sassy CSS) provides several advantages over plain CSS:
- **Nesting:** Organize styles hierarchically
- **Variables:** Reusable color and size values
- **Modularity:** Each component has its own stylesheet
- **Maintainability:** Easier to read and update

### **Centralized Styles Directory**
All SCSS files are located in `/src/styles/` for better organization:
- Easy to find and manage all styles in one place
- Clear separation between component logic (TSX) and styles (SCSS)
- Consistent import paths across the project

### **File Naming Convention**
Each component has a corresponding SCSS file in the styles directory:
- Component: `/src/app/components/ComponentName.tsx`
- Styles: `/src/styles/componentName.scss`
- Import from component: `import '../../styles/componentName.scss'`
- Import from app: `import '../styles/componentName.scss'`

### **Class Naming Strategy**
BEM-like methodology (Block Element Modifier):
- `.block` - Top-level component class
- `.block-element` - Child element
- `.element.modifier` - State or variant

---

## Components Overview

### **App.tsx**
**Purpose:** Main application entry point that orchestrates all components.

**What it does:**
- Renders the header navigation
- Displays hero section with Status Bacon branding
- Shows action buttons (Refresh, Alerts, Add website)
- Organizes all child components in a logical layout

**SCSS:** `/src/styles/app.scss`
- `.app` - Main container with background
- `.main-container` - Content wrapper with max-width
- `.hero-section` - Hero area with logo and title
- `.action-buttons` - Button group styling

**Import Path:** `import '../styles/app.scss'`

---

### **Header.tsx**
**Purpose:** Top navigation bar with branding and user authentication.

**What it does:**
- Displays Status Bacon logo and brand name
- Provides navigation links (Dashboard, Reports)
- Shows Login/Sign Up buttons when not authenticated
- Shows user menu with name and logout when authenticated
- Manages authentication modal visibility
- Uses `getCurrentUser()` and `logout()` from auth utility

**State Management:**
- `user` - Current logged-in user or null
- `showAuthModal` - Controls auth modal visibility
- `authMode` - Switches between 'login' and 'signup'
- `showUserMenu` - Controls user dropdown menu

**SCSS:** `/src/styles/header.scss`
- `.header` - Header container with border
- `.brand` - Logo and brand name group
- `.header-left` - Left side navigation
- `.user-dropdown` - User menu dropdown
- `.auth-buttons` - Login/signup button group

**Import Path:** `import '../../styles/header.scss'`

---

### **AuthModal.tsx**
**Purpose:** Modal dialog for user login and signup.

**What it does:**
- Displays login or signup form based on mode
- Validates user input (email, password, name)
- Calls `login()` or `signup()` from auth utility
- Shows error messages for failed authentication
- Provides demo credentials for testing
- Switches between login and signup modes

**Props:**
- `isOpen` - Controls modal visibility
- `onClose` - Callback to close modal
- `onSuccess` - Callback after successful auth
- `mode` - 'login' or 'signup'

**State Management:**
- `email`, `password`, `name` - Form inputs
- `error` - Error message display
- `loading` - Loading state during API calls

**SCSS:** `/src/styles/authModal.scss`
- `.auth-modal-overlay` - Full-screen backdrop
- `.auth-modal` - Modal container
- `.auth-form` - Form styling
- `.error-message` - Error display
- `.demo-info` - Demo credentials box

**Import Path:** `import '../../styles/authModal.scss'`

---

### **StatsOverview.tsx**
**Purpose:** Display key statistics in card format.

**What it does:**
- Fetches statistics from `getStats()` API
- Updates stats every 5 seconds in real-time
- Displays 4 stat cards:
    - Total websites
    - Operational websites
    - Average uptime percentage
    - Active incidents
- Shows loading state while fetching data

**State Management:**
- `stats` - Object containing all statistics
- `loading` - Loading state indicator

**API Integration:**
- Calls `getStats()` on mount
- Sets interval to refresh every 5 seconds
- Cleans up interval on unmount

**SCSS:** `/src/styles/StatsOverview.scss`
- `.stats-overview` - Responsive grid (1/2/4 columns)
- `.stat-card` - Individual stat card
- `.stat-icon` - Icon container with color variants
- Media queries for responsive layout

**Import Path:** `import '../../styles/statsOverview.scss'`

---

### **TabNavigation.tsx**
**Purpose:** Navigation tabs for different dashboard views.

**What it does:**
- Displays 5 tabs: Overview, Warnings, Incidents, Platform Status, History
- Shows notification badges on Warnings (1) and Incidents (2)
- Highlights active tab (Overview)
- Renders icons from lucide-react for each tab

**Static Data:**
- Array of tab objects with label, icon, active state, and badge count

**SCSS:** `/src/styles/tabNavigation.scss`
- `.tab-navigation` - Tab container with border
- `.tab` - Individual tab styling
- `.tab.active` - Active tab highlight
- `.badge` - Notification badge

**Import Path:** `import '../../styles/tabNavigation.scss'`

---

### **MonitoredWebsites.tsx**
**Purpose:** Display grid of monitored websites with real-time status updates.

**What it does:**
- Fetches websites from `getWebsites()` API
- Updates website data every 5 seconds via `simulateRealtimeUpdate()`
- Displays website cards in responsive grid
- Shows status badges (Operational, Degraded, Down)
- Displays uptime percentage, response time, last checked time
- Renders monitoring icons for different platforms

**State Management:**
- `websites` - Array of website objects
- `loading` - Loading state indicator

**Real-time Updates:**
- Fetches initial data on mount
- Sets interval to update every 5 seconds
- Website status randomly changes (operational/degraded/down)
- Response times and uptime percentages fluctuate

**Helper Functions:**
- `formatTimeSince()` - Converts date to human-readable string
- `getStatusBadge()` - Returns status badge component based on status

**SCSS:** `/src/styles/monitoredWebsites.scss`
- `.websites-grid` - Responsive grid (1/2 columns)
- `.website-card` - Individual website card
- `.status-badge` - Colored status indicators
- `.website-metrics` - Uptime and response time display

**Import Path:** `import '../../styles/monitoredWebsites.scss'`

---

### **UptimeOverview.tsx**
**Purpose:** Visualize 30-day uptime history in a bar chart.

**What it does:**
- Generates 30 days of mock uptime data
- Displays uptime percentage as vertical bars
- Color-codes bars: Green (100%), Yellow (99-99.99%), Red (<99%)
- Shows tooltip on hover with exact percentage
- Displays legend explaining color meanings

**Data Generation:**
- Creates array of 30 data points
- 95% chance of 100% uptime
- 5% chance of degraded uptime (random < 99%)

**SCSS:** `/src/styles/uptimeOverview.scss`
- `.uptime-chart` - Bar chart container
- `.uptime-bar` - Individual bar with tooltip
- `.bar` - Bar element with color variants
- `.tooltip` - Hover tooltip styling
- `.legend` - Chart legend

**Import Path:** `import '../../styles/uptimeOverview.scss'`


---
## ./components/Header.tsx Code
```tsx
import { LayoutGrid, FileText, ChevronDown, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../utils/auth';
import { AuthModal } from './AuthModal';
import '../../styles/header.scss';

export function Header() {
  const [user, setUser] = useState(getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setShowUserMenu(false);
  };

  const handleAuthSuccess = () => {
    setUser(getCurrentUser());
  };

  const openLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <div className="brand">
              <div className="brand-logo">
                <div className="logo-inner">
                  <div className="logo-circle-outer"></div>
                  <div className="logo-circle-inner"></div>
                </div>
              </div>
              <span className="brand-name">Status Bacon</span>
            </div>
            
            <nav>
              <button>
                <LayoutGrid />
                Dashboard
              </button>
              <button>
                <FileText />
                Reports
              </button>
            </nav>
          </div>
          
          {user ? (
            <div className="header-right">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="user-menu-button"
              >
                <User />
                {user.name}
                <ChevronDown />
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="logout-button"
                  >
                    <LogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="header-right">
              <div className="auth-buttons">
                <button 
                  onClick={openLogin}
                  className="login-button"
                >
                  Login
                </button>
                <button 
                  onClick={openSignup}
                  className="signup-button"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode={authMode}
      />
    </header>
  );
}
```

---
## ./components/AuthModal.tsx Code
```tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { login, signup } from '../utils/auth';
import '../../styles/authModal.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, onSuccess, mode: initialMode }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        result = await signup(email, password, name);
      }

      if (result.success) {
        onSuccess();
        onClose();
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button
          onClick={onClose}
          className="close-button"
        >
          <X />
        </button>

        <h2>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={mode === 'signup' ? 6 : undefined}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-mode">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>

        {mode === 'login' && (
          <div className="demo-info">
            <strong>Demo credentials:</strong><br />
            Email: demo@example.com<br />
            Password: password123
          </div>
        )}
      </div>
    </div>
  );
}
```

---
## ./components/StatsOverview.tsx Code
```tsx
import { Globe, Activity, Clock, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getStats } from '../utils/api';
import '../../styles/statsOverview.scss';

export function StatsOverview() {
  const [stats, setStats] = useState({
    totalWebsites: 0,
    operational: 0,
    averageUptime: 0,
    incidents: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch stats and update in real-time
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats(data);
      setLoading(false);
    };
    
    fetchStats();

    // Refresh stats every 5 seconds
    const interval = setInterval(async () => {
      const data = await getStats();
      setStats(data);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    {
      icon: Globe,
      value: stats.totalWebsites.toString(),
      label: 'Total websites',
      colorClass: 'gray'
    },
    {
      icon: Activity,
      value: stats.operational.toString(),
      label: 'Operational',
      colorClass: 'green'
    },
    {
      icon: Clock,
      value: `${stats.averageUptime}%`,
      label: 'Average uptime',
      colorClass: 'blue'
    },
    {
      icon: AlertTriangle,
      value: stats.incidents.toString(),
      label: 'Action incidents',
      colorClass: 'yellow'
    }
  ];

  if (loading) {
    return <div className="loading">Loading stats...</div>;
  }

  return (
    <div className="stats-overview">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <div className={`stat-icon ${stat.colorClass}`}>
                <Icon />
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

---
## ./components/MonitoredWebsites.tsx Code
```tsx
import { Globe, Smartphone, Monitor, CheckCircle, Server, Smile, AlertTriangle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getWebsites, simulateRealtimeUpdate, type Website } from '../utils/api';
import '../../styles/monitoredWebsites.scss';

export function MonitoredWebsites() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    const fetchWebsites = async () => {
      const data = await getWebsites();
      setWebsites(data);
      setLoading(false);
    };
    
    fetchWebsites();
  }, []);

  // Real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedWebsites = simulateRealtimeUpdate();
      setWebsites([...updatedWebsites]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const getStatusBadge = (status: Website['status']) => {
    switch (status) {
      case 'operational':
        return (
          <span className="status-badge operational">
            <CheckCircle />
            Operational
          </span>
        );
      case 'degraded':
        return (
          <span className="status-badge degraded">
            <AlertTriangle />
            Degraded
          </span>
        );
      case 'down':
        return (
          <span className="status-badge down">
            <XCircle />
            Down
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="monitored-websites">
        <h2>Monitored websites</h2>
        <div className="loading">Loading websites...</div>
      </div>
    );
  }

  return (
    <div className="monitored-websites">
      <h2>Monitored websites</h2>
      
      <div className="websites-grid">
        {websites.map((website) => (
          <div key={website.id} className="website-card">
            <div className="website-header">
              <div className="website-info">
                <div className="website-icon">
                  <Globe />
                </div>
                <div className="website-details">
                  <h3>{website.name}</h3>
                  <p>{website.url}</p>
                </div>
              </div>
              {getStatusBadge(website.status)}
            </div>

            <div className="website-metrics">
              <div className="metrics-row">
                <span>Uptime {website.uptime}%</span>
                <span className="response-time">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Response: {website.responseTime}ms
                </span>
              </div>
            </div>

            <div className="website-icons">
              <Smartphone className="inactive" />
              <Monitor className="inactive" />
              <CheckCircle className={website.status === 'operational' ? 'active' : 'inactive'} />
              <Server className="inactive" />
              <Smile className="inactive" />
            </div>

            <p className="last-checked">Last checked: {formatTimeSince(website.lastChecked)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---
## ./components/TabNavigation.tsx Code
```tsx
import { BarChart3, ShieldAlert, AlertCircle, Cog, Clock } from 'lucide-react';
import '../../styles/tabNavigation.scss';

export function TabNavigation() {
  const tabs = [
    { label: 'Overview', icon: BarChart3, active: true, badge: null },
    { label: 'Warnings', icon: ShieldAlert, active: false, badge: 1 },
    { label: 'Incidents', icon: AlertCircle, active: false, badge: 2 },
    { label: 'Platform Status', icon: Cog, active: false, badge: null },
    { label: 'History', icon: Clock, active: false, badge: null }
  ];

  return (
    <div className="tab-navigation">
      <div className="tabs">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={index}
              className={tab.active ? 'tab active' : 'tab'}
            >
              <Icon />
              {tab.label}
              {tab.badge && (
                <span className="badge">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

```

---
## ./components/UptimeOverview.tsx Code
```tsx
import '../../styles/uptimeOverview.scss';

export function UptimeOverview() {
  // Generate 30 days of uptime data (mock data)
  const uptimeData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    uptime: Math.random() > 0.95 ? Math.random() * 99 : 100, // Occasional outages
  }));

  return (
    <div className="uptime-overview">
      <h2>30-Day uptime overview</h2>
      
      <div className="uptime-chart">
        {uptimeData.map((data, index) => {
          const height = `${data.uptime}%`;
          const colorClass = data.uptime === 100 
            ? 'green' 
            : data.uptime > 99 
            ? 'yellow' 
            : 'red';
          
          return (
            <div
              key={index}
              className="uptime-bar"
            >
              <div
                className={`bar ${colorClass}`}
                style={{ height }}
              />
              <div className="tooltip">
                Day {data.day}: {data.uptime.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="chart-labels">
        <span>30 days ago</span>
        <span>Today</span>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color green"></div>
          <span>100% uptime</span>
        </div>
        <div className="legend-item">
          <div className="legend-color yellow"></div>
          <span>99-99.99% uptime</span>
        </div>
        <div className="legend-item">
          <div className="legend-color red"></div>
          <span>&lt;99% uptime</span>
        </div>
      </div>
    </div>
  );
}
```

---
## ./utils/api.ts Code
```tsx
// Fake API for website monitoring data

export interface Website {
  id: string;
  name: string;
  url: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastChecked: Date;
}

export interface Stats {
  totalWebsites: number;
  operational: number;
  averageUptime: number;
  incidents: number;
}

// Simulate database of websites
let websitesDatabase: Website[] = [
  {
    id: '1',
    name: 'Tzone Networks',
    url: 'https://www.tzone.com',
    status: 'operational',
    uptime: 100.0,
    responseTime: 45,
    lastChecked: new Date()
  },
  {
    id: '2',
    name: 'Website',
    url: 'https://website.com',
    status: 'operational',
    uptime: 100.0,
    responseTime: 67,
    lastChecked: new Date()
  },
  {
    id: '3',
    name: 'E-commerce Platform',
    url: 'https://shop.example.com',
    status: 'operational',
    uptime: 99.98,
    responseTime: 124,
    lastChecked: new Date()
  },
  {
    id: '4',
    name: 'API Gateway',
    url: 'https://api.service.com',
    status: 'operational',
    uptime: 99.95,
    responseTime: 45,
    lastChecked: new Date()
  },
  {
    id: '5',
    name: 'Mobile App Backend',
    url: 'https://mobile.api.com',
    status: 'operational',
    uptime: 99.87,
    responseTime: 230,
    lastChecked: new Date()
  },
  {
    id: '6',
    name: 'CDN Service',
    url: 'https://cdn.example.com',
    status: 'operational',
    uptime: 99.99,
    responseTime: 12,
    lastChecked: new Date()
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all websites
export async function getWebsites(): Promise<Website[]> {
  await delay(300); // Simulate network delay
  return [...websitesDatabase];
}

// Get statistics
export async function getStats(): Promise<Stats> {
  await delay(200);
  
  const operational = websitesDatabase.filter(w => w.status === 'operational').length;
  const degraded = websitesDatabase.filter(w => w.status === 'degraded').length;
  const totalUptime = websitesDatabase.reduce((sum, w) => sum + w.uptime, 0);
  const averageUptime = totalUptime / websitesDatabase.length;
  
  return {
    totalWebsites: websitesDatabase.length,
    operational,
    averageUptime: parseFloat(averageUptime.toFixed(2)),
    incidents: websitesDatabase.filter(w => w.status === 'down').length + degraded
  };
}

// Simulate real-time updates
export function simulateRealtimeUpdate() {
  websitesDatabase = websitesDatabase.map(website => {
    const random = Math.random();
    
    // 5% chance of status change
    let newStatus = website.status;
    if (random < 0.02) {
      newStatus = 'degraded';
    } else if (random < 0.03) {
      newStatus = 'down';
    } else if (random > 0.97 && website.status !== 'operational') {
      newStatus = 'operational';
    }
    
    // Update response time (fluctuate within range)
    const responseTimeChange = (Math.random() - 0.5) * 50;
    const newResponseTime = Math.max(10, Math.min(500, website.responseTime + responseTimeChange));
    
    // Update uptime based on status
    let uptimeChange = 0;
    if (newStatus === 'down') {
      uptimeChange = -0.1;
    } else if (newStatus === 'degraded') {
      uptimeChange = -0.01;
    } else {
      uptimeChange = Math.random() * 0.01;
    }
    
    const newUptime = Math.max(95, Math.min(100, website.uptime + uptimeChange));
    
    return {
      ...website,
      status: newStatus,
      responseTime: Math.round(newResponseTime),
      uptime: parseFloat(newUptime.toFixed(2)),
      lastChecked: new Date()
    };
  });
  
  return websitesDatabase;
}

// Add new website
export async function addWebsite(name: string, url: string): Promise<Website> {
  await delay(500);
  
  const newWebsite: Website = {
    id: Date.now().toString(),
    name,
    url,
    status: 'operational',
    uptime: 100.0,
    responseTime: Math.floor(Math.random() * 200) + 20,
    lastChecked: new Date()
  };
  
  websitesDatabase.push(newWebsite);
  return newWebsite;
}

```

---
## ./utils/auth.ts Code
```tsx
// Fake authentication API

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Simulate user database
const usersDatabase: Map<string, { email: string; password: string; name: string; id: string; createdAt: Date }> = new Map([
  ['demo@example.com', {
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    id: '1',
    createdAt: new Date('2024-01-01')
  }]
]);

// Current session
let currentUser: User | null = null;

// Load user from localStorage on init
const storedUser = localStorage.getItem('currentUser');
if (storedUser) {
  try {
    currentUser = JSON.parse(storedUser);
  } catch (e) {
    localStorage.removeItem('currentUser');
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Login
export async function login(email: string, password: string): Promise<AuthResponse> {
  await delay(800); // Simulate network delay
  
  const user = usersDatabase.get(email.toLowerCase());
  
  if (!user) {
    return {
      success: false,
      error: 'User not found'
    };
  }
  
  if (user.password !== password) {
    return {
      success: false,
      error: 'Invalid password'
    };
  }
  
  currentUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  };
  
  // Store in localStorage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  return {
    success: true,
    user: currentUser
  };
}

// Signup
export async function signup(email: string, password: string, name: string): Promise<AuthResponse> {
  await delay(1000);
  
  if (usersDatabase.has(email.toLowerCase())) {
    return {
      success: false,
      error: 'Email already exists'
    };
  }
  
  if (password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters'
    };
  }
  
  const newUser = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password,
    name,
    createdAt: new Date()
  };
  
  usersDatabase.set(email.toLowerCase(), newUser);
  
  currentUser = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt
  };
  
  // Store in localStorage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  return {
    success: true,
    user: currentUser
  };
}

// Logout
export async function logout(): Promise<void> {
  await delay(300);
  currentUser = null;
  localStorage.removeItem('currentUser');
}

// Get current user
export function getCurrentUser(): User | null {
  return currentUser;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return currentUser !== null;
}

```

---
## ./App.tsx Code
```tsx
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { TabNavigation } from './components/TabNavigation';
import { MonitoredWebsites } from './components/MonitoredWebsites';
import { UptimeOverview } from './components/UptimeOverview';
import '../styles/App.scss';

export default function App() {
  return (
    <div className="app">
      <Header />
      
      <main className="main-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-header">
            <div className="logo">
              <div className="logo-inner">
                <div className="logo-circle-outer"></div>
                <div className="logo-circle-inner"></div>
              </div>
            </div>
            <div className="hero-text">
              <h1>Status Bacon</h1>
              <p>Realtime monitoring of website</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn-secondary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button className="btn-secondary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Alerts
            </button>
            <button className="btn-primary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add website
            </button>
          </div>
        </div>

        <StatsOverview />
        <TabNavigation />
        <MonitoredWebsites />
        <UptimeOverview />
      </main>
    </div>
  );
}
```

