# Vukazine Authentication System

A comprehensive authentication system for Vukazine with modern glassmorphism design, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication Pages
- **Login Page** (`/login`) - Split-screen login with glassmorphism cards
- **Signup Page** (`/signup`) - User registration with password strength validation
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password`) - Password reset form (token-based)

### 🎨 Design Features
- **Split-screen layout** (50/50 on desktop, stacked on mobile)
- **Glassmorphism design** with backdrop blur and transparency effects
- **Floating animations** on left-side cards
- **Emerald color scheme** for brand consistency
- **Dark theme** optimized for medical professionals
- **Responsive design** with mobile-first approach

### 🛡️ Security Features
- **Email validation** with real-time feedback
- **Password strength meter** with visual indicators
- **Password requirements** (8+ chars, numbers, special characters)
- **Form validation** with inline error messages
- **Loading states** for better UX
- **HIPAA/POPIA compliance** messaging

### 📱 User Experience
- **Smooth transitions** and hover effects
- **Show/hide password** toggles
- **Remember me** functionality
- **Success/error states** with animations
- **Accessibility** considerations

## Page Descriptions

### Login Page (`/login`)
**Left Side:**
- Medical professional background image
- Floating glassmorphism cards:
  - "98.7% Precision" with pulse animation
  - "Zero Denials" with checkmark
  - "🔒 HIPAA Compliant" badge
- "Trusted by leading clinics across South Africa"

**Right Side:**
- Vukazine logo
- "Welcome back" heading
- Email and password inputs
- Remember me checkbox
- "Forgot password?" link
- Sign in button with loading state
- "Sign up" link for new users

### Signup Page (`/signup`)
**Left Side:**
- Different medical background image
- Floating cards:
  - "Setup in Days" with clock icon
  - "Free 14-day trial" with gift icon
  - "No credit card required"
- "Join 200+ clinics reducing billing denials"

**Right Side:**
- Registration form with fields:
  - Full Name
  - Email Address (with validation indicator)
  - Clinic/Hospital Name
  - Password (with strength meter)
  - Confirm Password (with match validation)
- Terms and conditions checkbox
- Create account button
- Sign in link for existing users

### Forgot Password (`/forgot-password`)
**Features:**
- Back to sign in navigation
- Email input with validation
- Send reset link functionality
- Success state with email confirmation
- Resend email option

### Reset Password (`/reset-password`)
**Features:**
- Token validation from URL parameters
- New password input with strength meter
- Confirm password with match validation
- Password requirements checklist
- Success state with redirect to login

## Technical Implementation

### Dependencies
```json
{
  "lucide-react": "^latest", // Icons
  "next": "15.4.6",          // Framework
  "react": "19.1.0",         // Library
  "tailwindcss": "^4"        // Styling
}
```

### File Structure
```
src/
├── app/
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   ├── forgot-password/page.tsx # Forgot password page
│   ├── reset-password/page.tsx  # Reset password page
│   ├── terms/page.tsx           # Terms of service
│   ├── privacy/page.tsx         # Privacy policy
│   └── auth/page.tsx            # Auth navigation (development)
├── components/
│   └── auth/
│       ├── AuthLogo.tsx         # Reusable logo component
│       ├── SecurityBadges.tsx   # Security compliance badges
│       ├── FormDivider.tsx      # OR divider component
│       └── PasswordInput.tsx    # Password input with toggle
└── globals.css                  # Custom animations
```

### Custom Animations
```css
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Form Validation

### Email Validation
- Required field validation
- Email format validation using regex
- Real-time validation feedback

### Password Validation
- Minimum 8 characters
- At least one number
- At least one special character
- Visual strength meter (Weak/Medium/Strong)
- Password confirmation matching

### Error Handling
- Inline error messages
- Field-specific validation
- Form submission prevention on errors
- Loading states during API calls

## Styling Guidelines

### Color Scheme
- **Primary**: Emerald (emerald-400, emerald-500)
- **Background**: Dark gray (gray-900)
- **Text**: White primary, gray-400 secondary
- **Glassmorphism**: bg-white/5 with backdrop-blur-lg

### Responsive Breakpoints
- **Mobile**: Stack layout vertically
- **Desktop**: 50/50 split-screen layout
- **Large**: Max content width with centering

### Accessibility
- Proper ARIA labels
- Focus states with emerald ring
- High contrast ratios
- Keyboard navigation support

## Environment Variables

```env
# Required for email functionality (if implementing)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template
```

## Usage Instructions

1. **Development**:
   ```bash
   npm install
   npm run dev
   ```

2. **Testing Pages**:
   - Visit `/auth` for navigation between pages
   - Visit `/login` for login functionality
   - Visit `/signup` for registration
   - Visit `/forgot-password` for password reset

3. **Integration**:
   - Replace console.log statements with actual API calls
   - Implement authentication logic
   - Add backend integration for user management

## Security Considerations

- All forms include CSRF protection considerations
- Password inputs use proper input types
- Sensitive data handling for medical compliance
- HIPAA and POPIA compliance messaging
- Secure token handling for password resets

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for background images
- Efficient re-renders with proper state management
- Optimized animations for smooth performance

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Future Enhancements

- [ ] Multi-factor authentication (MFA)
- [ ] Social login integration
- [ ] Biometric authentication
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics and monitoring
- [ ] Internationalization (i18n)

## Contributing

1. Follow the existing code structure
2. Maintain glassmorphism design consistency
3. Ensure responsive design across all breakpoints
4. Add proper TypeScript types
5. Include error handling for all user interactions

## Support

For questions or issues, contact the development team or refer to the main Vukazine documentation.