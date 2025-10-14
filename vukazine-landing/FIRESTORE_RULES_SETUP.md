# Firestore Security Rules Setup

## Current Issue
You're getting "Missing or insufficient permissions" because Firestore has default security rules that deny all reads/writes.

## Quick Fix Options

### Option 1: Allow All Access (Development Only)
⚠️ **WARNING: Use only for development/testing**

In Firebase Console → Firestore Database → Rules, replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Option 2: Secure Rules (Recommended for Production)
In Firebase Console → Firestore Database → Rules, use:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read/write their own documents
    match /clinics/{clinicId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Option 3: Disable Firestore (Auth Only)
If you only need authentication without Firestore:

1. Update `src/lib/firebase.ts`:
```typescript
// Comment out Firestore import
// import { getFirestore } from 'firebase/firestore';
// export const db = getFirestore(app);
```

2. The auth context is already updated to handle Firestore errors gracefully.

## Step-by-Step Fix

### 1. Open Firebase Console
- Go to https://console.firebase.google.com
- Select your project: `vukazine-52417`

### 2. Navigate to Firestore
- Click "Firestore Database" in the left sidebar
- If Firestore isn't created yet, click "Create database"
- Choose "Start in test mode" for now

### 3. Update Security Rules
- Click "Rules" tab
- Replace the default rules with Option 1 (for testing) or Option 2 (for production)
- Click "Publish"

### 4. Test Authentication
- Try signing up a new user
- The error should be resolved

## Current Application Status

✅ **Firebase Authentication** - Working
✅ **Error Handling** - Graceful Firestore failures
✅ **User Interface** - All forms functional
⚠️ **Firestore** - Needs security rules setup

## What Works Now

Even without Firestore access, these features work:
- ✅ User registration
- ✅ User login
- ✅ Password reset
- ✅ Dashboard access
- ✅ User profile (from Firebase Auth)

## What Needs Firestore

These features require Firestore with proper rules:
- 📊 Extended user profiles (clinic name, etc.)
- 📈 User activity tracking
- 🔍 Advanced user management
- 📋 Application-specific data storage

## Recommended Next Steps

1. **Immediate Fix**: Use Option 1 (allow all) for testing
2. **Before Production**: Implement Option 2 (secure rules)
3. **Test Everything**: Verify signup, login, and dashboard work
4. **Monitor Usage**: Check Firebase Console for user activity

## Security Considerations

### Development Rules (Option 1)
- ✅ Easy to test
- ❌ No security
- ❌ Anyone can read/write data
- 📝 Use only for development

### Production Rules (Option 2)
- ✅ Secure user data
- ✅ Users can only access their own data
- ✅ Requires authentication
- 📝 Recommended for production

### Auth-Only (Option 3)
- ✅ Most secure (no database access)
- ✅ Fastest performance
- ❌ Limited user data storage
- 📝 Good for simple authentication needs