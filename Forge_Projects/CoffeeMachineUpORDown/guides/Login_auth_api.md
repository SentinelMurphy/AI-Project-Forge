# Coffee Machine UI — Auth + Backend Integration Guide

**CoffeeMachineUpORDown** React UI to use the **Shared Forge FastAPI Backend** for login/signup/authentication using **JWT + refresh tokens + cookies**.

---

## ✅ Backend Assumptions

Backend is running at:

```
http://localhost:8000
```

Auth endpoints:

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /users/me` (protected, uses JWT)

---

# 🔧 Frontend Setup

## 1) Add API helper

Create a small API helper so your UI can call the backend.

**Create File:**  
`/CoffeeMachineUpORDown/src/app/utils/api.ts`

```ts
const API_BASE = "http://localhost:8000";

export async function signup(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // allow cookies
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function refresh(refresh_token: string) {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ refresh_token }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getMe(token: string) {
  const res = await fetch(`${API_BASE}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

---

# ✅ Update LoginSignup Flow

Replace the **fake login/signup flow** with real API calls.

### File:
`/CoffeeMachineUpORDown/src/app/components/LoginSignup.tsx`

```tsx

import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { login, signup, getMe } from '@/app/utils/api';

interface LoginSignupProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthenticate: (user: { name: string; email: string }) => void;
}

export function LoginSignup({ isOpen, onClose, onAuthenticate }: LoginSignupProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);

        if (!validateForm()) return;

        try {
            setLoading(true);

            if (!isLogin) {
                await signup(formData.email, formData.password);
            }

            const { access_token } = await login(formData.email, formData.password);
            localStorage.setItem('access_token', access_token);

            const me = await getMe(access_token);

            onAuthenticate({
                name: me.email || formData.name || formData.email.split('@')[0],
                email: me.email || formData.email,
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({});
            onClose();
        } catch (err: any) {
            setApiError(err?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setApiError(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="size-6" />
                </button>

                {/* Header */}
                <div className="bg-[#EE0000] text-white px-8 py-6 rounded-t-lg">
                    <h2 className="text-2xl">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-sm opacity-90 mt-1">
                        {isLogin
                            ? 'Sign in to access the coffee machine dashboard'
                            : 'Sign up to monitor the coffee machine'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE0000] ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE0000] ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE0000] ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {!isLogin && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE0000] ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}

                    {apiError && (
                        <p className="text-red-600 text-sm">{apiError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#EE0000] text-white py-3 rounded-lg hover:bg-[#CC0000] transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-sm text-gray-600 hover:text-[#EE0000] transition-colors"
                        >
                            {isLogin
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


```

✅ When user submits login:


#### const { access_token } = await login(email, password);
#### // store token (localStorage or state)
#### localStorage.setItem("access_token", access_token);
#### const me = await getMe(access_token);
#### onAuthenticate({ name: me.email, email: me.email });


✅ When user submits signup:

### await signup(email, password);
### const { access_token } = await login(email, password);
### localStorage.setItem("access_token", access_token);
### const me = await getMe(access_token);
### onAuthenticate({ name: me.email, email: me.email });


---

# ✅ Keep User Logged In on Refresh

Add this to `App.tsx`:

Add at the top of `App.tsx`
```tsx
import { useState, useEffect } from 'react';
import { getMe } from "@/app/utils/api";
```

Add code to line : 26
```ts
useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  getMe(token)
    .then((me) => {
      setUser({ name: me.email, email: me.email });
      setIsAuthenticated(true);
    })
    .catch(() => {
      setUser(null);
      setIsAuthenticated(false);
    });
}, []);
```

---

# ✅ Logout Flow

Update logout to clear token:

```ts
const handleLogout = () => {
  localStorage.removeItem("access_token");
  setUser(null);
  setIsAuthenticated(false);
};
```

---

# ✅ CORS + Cookies

Backend already supports:

```
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8080
```

And cookies are allowed via:

```ts
credentials: "include"
```

---

# ✅ File Summary

```
/CoffeeMachineUpORDown/
└── src/
    └── app/
        ├── App.tsx              (updated for token persistence)
        ├── utils/
        │   └── api.ts           (NEW: API helper)
        └── components/
            ├── LoginSignup.tsx  (updated to call API)
            ├── Header.tsx
            ├── Dashboard.tsx
            ├── RepairsPage.tsx
            └── StatusPage.tsx
```

---