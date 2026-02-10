

# 🔐 Frontend-Only Authentication UI

A polished, animated authentication flow with dark purple gradient theme — purely UI, no backend.

---

## Screen 1: Login Page
- Email/Username input field
- Password input with **show/hide eye icon toggle**
- "Forgot Password?" link
- Login button with hover, active, and loading spinner animation
- "OR" divider
- Social login buttons (Google & Apple) — UI only
- Link to switch to Signup screen

## Screen 2: Signup Page
- Full Name, Email, Phone (with country code placeholder), Password, and Confirm Password fields
- Password show/hide toggles
- Signup button with loading animation
- Link to switch back to Login
- Smooth animated transition between Login ↔ Signup

## Screen 3: OTP Verification Page
- "Enter the 6-digit OTP sent to your email/phone" message
- Six separate OTP input boxes with auto-focus to next on typing
- Resend OTP button with a countdown timer (60s, UI only)
- Verify button with success checkmark animation

## Design & UX
- **Dark theme with purple gradient** background across all screens
- Card-based centered layout with glassmorphism/subtle blur effect
- Smooth CSS transitions between screens (fade + scale)
- Micro-interactions: input focus glow, button ripple effect, card entrance animation
- Responsive for mobile and desktop
- Keyboard accessible (tab navigation, enter to submit)
- Toast notifications for simulated success/error states

## Navigation Flow
- Login → click "Sign Up" → Signup screen
- Signup → click "Login" → Login screen
- Login or Signup → submit → OTP Verification screen
- OTP Verify → success animation → redirects to a simple welcome/dashboard placeholder

