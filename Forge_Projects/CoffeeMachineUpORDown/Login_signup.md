# Login/Sign-Up Component Implementation Guide

This guide walks through adding authentication functionality to the Coffee Machine Up or Down application.

## Overview

This implementation adds:
- Login and sign-up modal dialog
- User authentication state management
- Dynamic header that changes based on authentication status
- User profile display with logout functionality

## Files to Modify/Create

### 1. Create New Component: `LoginSignup.tsx`

**Location:** `/CoffeeMachineUpORDown/src/app/components/LoginSignup.tsx`

**Purpose:** A modal component that handles both login and sign-up functionality with form validation.

**Key Features:**
- Toggle between login and sign-up modes
- Form validation for email, password, and name fields
- Error messaging
- Responsive modal design

**Add this file** with the complete code provided in your new files section.

---

### 2. Update `App.tsx`

**Location:** `/CoffeeMachineUpORDown/src/app/App.tsx`

#### Changes Required:

#### **Step 1: Add New Import**
Add the LoginSignup component import at the top:

```typescript
import { LoginSignup } from '@/app/components/LoginSignup';
```

#### **Step 2: Add State Variables**
Add three new state variables after the existing `currentPage` state:

```typescript
const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState<{ name: string; email: string } | null>(null);
```

**Explanation:**
- `isLoginOpen`: Controls whether the login modal is visible
- `isAuthenticated`: Tracks if a user is logged in
- `user`: Stores the authenticated user's information (name and email)

#### **Step 3: Add Handler Functions**
Add these two handler functions before the `renderPage` function:

```typescript
const handleAuthenticate = (userData: { name: string; email: string }) => {
  setUser(userData);
  setIsAuthenticated(true);
};

const handleLogout = () => {
  setUser(null);
  setIsAuthenticated(false);
};
```

**Explanation:**
- `handleAuthenticate`: Called when user successfully logs in or signs up
- `handleLogout`: Clears user data and sets authenticated status to false

#### **Step 4: Update Header Component**
Replace the existing Header component call with:

```typescript
<Header 
  currentPage={currentPage} 
  onNavigate={setCurrentPage}
  isAuthenticated={isAuthenticated}
  user={user}
  onLoginClick={() => setIsLoginOpen(true)}
  onLogout={handleLogout}
/>
```

**New Props Added:**
- `isAuthenticated`: Passes authentication status to header
- `user`: Passes user data for display
- `onLoginClick`: Opens the login modal
- `onLogout`: Handles logout action

#### **Step 5: Add LoginSignup Component**
Add the LoginSignup component before the closing `</div>`:

```typescript
<LoginSignup 
  isOpen={isLoginOpen}
  onClose={() => setIsLoginOpen(false)}
  onAuthenticate={handleAuthenticate}
/>
```

**Complete Updated Return Statement:**
```typescript
return (
  <div className="min-h-screen bg-gray-100">
    <Header 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      isAuthenticated={isAuthenticated}
      user={user}
      onLoginClick={() => setIsLoginOpen(true)}
      onLogout={handleLogout}
    />
    {renderPage()}
    <LoginSignup 
      isOpen={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
      onAuthenticate={handleAuthenticate}
    />
  </div>
);
```

---

### 3. Update `Header.tsx`

**Location:** `/CoffeeMachineUpORDown/src/app/components/Header.tsx`

#### Changes Required:

#### **Step 1: Add New Imports**
Update the lucide-react import to include LogOut and User icons:

```typescript
import { Coffee, LogOut, User } from 'lucide-react';
```

#### **Step 2: Update HeaderProps Interface**
Replace the existing interface with:

```typescript
interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}
```

**New Props:**
- `isAuthenticated`: Boolean indicating if user is logged in
- `user`: User object with name and email (or null)
- `onLoginClick`: Function to open login modal
- `onLogout`: Function to handle logout

#### **Step 3: Update Function Parameters**
Update the function signature to destructure new props:

```typescript
export function Header({ 
  currentPage, 
  onNavigate, 
  isAuthenticated, 
  user, 
  onLoginClick, 
  onLogout 
}: HeaderProps) {
```

#### **Step 4: Update Header Background Color**
Replace the `<header>` tag to dynamically change color based on authentication:

**Before:**
```typescript
<header className="bg-[#EE0000] text-white shadow-lg">
```

**After:**
```typescript
<header className={`${isAuthenticated ? 'bg-[#0066CC]' : 'bg-[#EE0000]'} text-white shadow-lg transition-colors duration-300`}>
```

**Explanation:** Header is red (#EE0000) when not logged in, blue (#0066CC) when authenticated.

#### **Step 5: Update Navigation Button Styles**
Each navigation button needs to adapt its colors based on authentication status.

**Pattern for each button:**
```typescript
<button
  onClick={() => onNavigate('home')}
  className={`px-4 py-2 rounded transition-colors ${
    currentPage === 'home'
      ? `bg-white ${isAuthenticated ? 'text-[#0066CC]' : 'text-[#EE0000]'}`
      : `${isAuthenticated ? 'hover:bg-[#0052A3]' : 'hover:bg-[#CC0000]'}`
  }`}
>
  Home
</button>
```

Apply this pattern to all three navigation buttons (Home, Repairs, Status).

#### **Step 6: Add Authentication UI Section**
After the closing `</nav>` tag, add this new section:

```typescript
{isAuthenticated && user ? (
    <div className="flex items-center gap-4 border-l border-white/30 pl-6">
    <div className="flex items-center gap-2">
    <div className="bg-white/20 p-2 rounded-full">
    <User className="size-4" />
        </div>
        <span className="text-sm">{user.name}</span>
    </div>
    <button
    onClick={onLogout}
    className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
        isAuthenticated ? 'hover:bg-[#0052A3]' : 'hover:bg-[#CC0000]'
    }`}
>
    <LogOut className="size-4" />
        Logout
        </button>
        </div>
) : (
        <div className="border-l border-white/30 pl-6">
        <button
            onClick={onLoginClick}
    className="px-6 py-2 bg-white text-[#EE0000] rounded transition-colors hover:bg-gray-100"
        >
        Login / Sign Up
    </button>
    </div>
)}
```

**Explanation:**
- If authenticated: Shows user avatar, name, and logout button
- If not authenticated: Shows "Login / Sign Up" button

#### **Step 7: Update Container Structure**
Make sure the new authentication UI is inside the flex container. The complete structure should be:

```typescript
<div className="flex items-center gap-6">
  <nav className="flex gap-6">
    {/* Navigation buttons */}
  </nav>
  
  {/* Authentication UI from Step 6 */}
</div>
```

---

## Visual Changes

### Before Authentication:
- Header background: Red (#EE0000)
- Active navigation button: White background with red text
- Right side: "Login / Sign Up" button

### After Authentication:
- Header background: Blue (#0066CC)
- Active navigation button: White background with blue text
- Right side: User avatar, name, and logout button

---

## Form Validation Rules

The LoginSignup component includes the following validation:

### Email:
- Required field
- Must match email format (contains @ and domain)

### Password:
- Required field
- Minimum 6 characters

### Name (Sign-up only):
- Required field

### Confirm Password (Sign-up only):
- Required field
- Must match password field

---

## User Flow

### Login Flow:
1. User clicks "Login / Sign Up" button in header
2. Modal opens in login mode
3. User enters email and password
4. On submit: Validates form
5. If valid: Calls `onAuthenticate` with user data
6. Header turns blue and shows user info

### Sign-Up Flow:
1. User clicks "Login / Sign Up" button
2. Modal opens, user clicks "Don't have an account? Sign up"
3. Form switches to sign-up mode (shows name and confirm password fields)
4. User fills in all fields
5. On submit: Validates form
6. If valid: Calls `onAuthenticate` with user data
7. Header turns blue and shows user info

### Logout Flow:
1. User clicks "Logout" button in header
2. User state is cleared
3. Header returns to red color
4. "Login / Sign Up" button appears again

---

## File Structure Summary

```
/CoffeeMachineUpORDown/
└── src/
    └── app/
        ├── App.tsx (MODIFIED)
        └── components/
            ├── Header.tsx (MODIFIED)
            ├── LoginSignup.tsx (NEW)
            ├── Dashboard.tsx
            ├── RepairsPage.tsx
            └── StatusPage.tsx
```

---

## Color Reference

| State | Primary Color | Hex Code | Usage |
|-------|---------------|----------|-------|
| Unauthenticated | Red | #EE0000 | Header background, buttons |
| Unauthenticated Hover | Dark Red | #CC0000 | Button hover states |
| Authenticated | Blue | #0066CC | Header background, buttons |
| Authenticated Hover | Dark Blue | #0052A3 | Button hover states |

