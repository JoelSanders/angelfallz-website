# Admin Panel & Prelaunch Setup

## Overview
The admin panel allows you to control the prelaunch mode for the website. When prelaunch mode is enabled, all visitors will see an email signup page instead of the main website.

## Accessing the Admin Panel

1. Navigate to `/admin` in your browser (e.g., `https://yoursite.com/admin`)
2. No button or link is provided on the main site - the page is only accessible via direct URL

## Current Authentication

### Temporary Password
- **Password**: `admin123`
- This is a temporary hardcoded password for development
- The password is stored in `src/pages/AdminPage.tsx`

### Session Management
- Authentication uses `sessionStorage` - you'll stay logged in until you close the browser tab
- Logging out clears the session

## Features

### Prelaunch Mode Control
- **Enable**: Activates the prelaunch email signup page for all visitors
- **Disable**: Shows the normal website to all visitors
- The admin page (`/admin`) and prelaunch page (`/prelaunch`) remain accessible regardless of the mode

### Email Collection
- Emails are currently stored in `localStorage` as a temporary solution
- Format: Array of objects with `email` and `timestamp` fields
- Access collected emails via browser console: `localStorage.getItem('prelaunchEmails')`

## Future Supabase Integration

### Database Schema
You'll need to create the following tables in Supabase:

```sql
-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Prelaunch emails table
CREATE TABLE prelaunch_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### Required Changes

1. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Config**
   Create `src/config/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. **Update AdminPage.tsx**
   - Replace hardcoded password with Supabase authentication
   - Use `supabase.auth.signInWithPassword()` for login
   - Store prelaunch setting in `site_settings` table

4. **Update PrelaunchPage.tsx**
   - Replace localStorage with Supabase database insert
   - Use `supabase.from('prelaunch_emails').insert()` to save emails

### Environment Variables
Add to your `.env` file:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing

### Test Admin Access
1. Go to `/admin`
2. Enter password: `admin123`
3. You should see the admin dashboard

### Test Prelaunch Mode
1. Log in to admin panel
2. Click "Enable Prelaunch Mode"
3. Open a new incognito/private window
4. Navigate to your site homepage - you should see the prelaunch page
5. Test the email signup form
6. Return to admin panel and disable prelaunch mode
7. Refresh homepage - normal site should appear

### View Collected Emails (Current Implementation)
Open browser console and run:
```javascript
JSON.parse(localStorage.getItem('prelaunchEmails'))
```

## Security Notes

### Current Implementation
⚠️ **Warning**: The current implementation is for development only:
- Password is hardcoded and visible in source code
- No rate limiting on login attempts
- Data stored in browser localStorage (not secure)

### Production Recommendations
- Use Supabase Row Level Security (RLS) policies
- Implement rate limiting for login attempts
- Use secure password hashing (bcrypt/argon2)
- Enable email verification for admin accounts
- Use HTTPS only in production
- Consider adding 2FA for admin accounts

## File Structure

```
src/
├── pages/
│   ├── AdminPage.tsx       # Admin dashboard with password protection
│   └── PrelaunchPage.tsx   # Email signup landing page
└── App.tsx                 # Main app with PrelaunchGuard component
```

## Troubleshooting

### Can't access admin page
- Clear browser cache and localStorage
- Ensure you're typing the exact URL: `/admin`
- Check browser console for errors

### Prelaunch mode not activating
- Check localStorage: `localStorage.getItem('prelaunchEnabled')`
- Clear browser cache
- Try in incognito mode

### Emails not saving
- Open browser console and check for errors
- Verify localStorage is not disabled in browser settings
- Check: `localStorage.getItem('prelaunchEmails')`

