# Session Token System - Preventing Multiple Simultaneous Logins

## Overview

This system prevents users from being logged in on multiple devices/browsers simultaneously. When a user logs in from a new device, all previous sessions are automatically invalidated and logged out.

## How It Works

### 1. **Token Generation**
- When a user successfully logs in (via Google OAuth), a unique `deviceToken` is generated
- This token is stored in:
  - **Database**: In the `Session` table as `deviceToken` field
  - **Client**: In browser's `localStorage` as `auth_session_token`

### 2. **Session Invalidation**
- When a new login occurs:
  1. A new `deviceToken` is created for the new session
  2. All other sessions for that user (with different `deviceToken`) are deleted from the database
  3. The old sessions become invalid

### 3. **Continuous Validation**
- The `SessionGuard` component runs in the Dashboard
- It checks session validity every 30 seconds
- If the session is invalid (another login occurred), the user is automatically logged out

## Architecture

### Files Created/Modified

#### New Files:
1. **`lib/sessionToken.ts`** - Client-side localStorage management
   - Generate, store, retrieve, and clear tokens

2. **`lib/sessionValidator.ts`** - Server-side validation logic
   - Create and validate device tokens in database
   - Invalidate other sessions

3. **`app/api/session/device-token/route.ts`** - API endpoint
   - Creates device token after login
   - Invalidates other sessions

4. **`app/api/session/validate/route.ts`** - API endpoint
   - Validates if current device token is still active

5. **`components/SessionGuard.tsx`** - React component
   - Wraps Dashboard to protect routes
   - Continuously validates session
   - Auto-logs out on invalidation

#### Modified Files:
1. **`prisma/schema.prisma`** - Added `deviceToken` field to Session model
2. **`app/_actions/authAction.ts`** - Added session management functions
3. **`app/Dashboard/layout.tsx`** - Wrapped with SessionGuard
4. **`components/ui/signout-form.tsx`** - Clear token on logout

## Usage Flow

### User Login Flow:
```
1. User clicks "Get Started" (Google Sign-in)
   ↓
2. Google OAuth authentication
   ↓
3. Redirect to /Dashboard
   ↓
4. SessionGuard component mounts
   ↓
5. Checks if deviceToken exists in localStorage
   ↓
6. If not exists → calls /api/session/device-token
   ↓
7. Server creates unique deviceToken
   ↓
8. Server deletes all other sessions for this user
   ↓
9. deviceToken stored in localStorage
   ↓
10. Dashboard renders
```

### Session Validation Flow (Every 30 seconds):
```
1. SessionGuard reads deviceToken from localStorage
   ↓
2. Calls /api/session/validate with deviceToken
   ↓
3. Server checks if deviceToken matches database
   ↓
4. If valid → continue
   ↓
5. If invalid → automatic logout and redirect
```

### Logout Flow:
```
1. User clicks logout
   ↓
2. clearDeviceToken() removes token from localStorage
   ↓
3. authClient.signOut() invalidates session
   ↓
4. Redirect to homepage
```

## API Endpoints

### POST `/api/session/device-token`
Creates a device token for the current session and invalidates others.

**Authentication**: Required (Cookie-based session)

**Response**:
```json
{
  "success": true,
  "deviceToken": "session_1234567890_abc123def456"
}
```

### POST `/api/session/validate`
Validates if a device token is still active.

**Request Body**:
```json
{
  "deviceToken": "session_1234567890_abc123def456"
}
```

**Response** (Valid):
```json
{
  "valid": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Response** (Invalid):
```json
{
  "valid": false,
  "error": "Session invalidated by another login"
}
```

## Database Schema

### Session Table:
```prisma
model Session {
  id          String   @id
  expiresAt   DateTime
  token       String   @unique
  deviceToken String?  @unique  // NEW: Unique device identifier
  createdAt   DateTime
  updatedAt   DateTime
  ipAddress   String?
  userAgent   String?
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("session")
}
```

## Testing the Feature

### Test Scenario 1: Single Device Login
1. Open browser → Login with Google
2. Should see Dashboard
3. `localStorage` should contain `auth_session_token`

### Test Scenario 2: Multiple Device Prevention
1. Browser A → Login with Google (User A)
2. Browser B → Login with same Google account (User A)
3. Browser A should automatically logout after ~30 seconds
4. Browser A shows message: "Session invalidated by another login"

### Test Scenario 3: Logout
1. Login to Dashboard
2. Click logout button
3. `localStorage` should be cleared
4. Redirect to homepage

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage (not sessionStorage) so they persist across tabs but are cleared on explicit logout

2. **Token Uniqueness**: Each deviceToken is unique and contains:
   - Timestamp (prevents collision)
   - Random string (cryptographically secure)

3. **Server-Side Validation**: All validation happens server-side, client cannot forge tokens

4. **Automatic Cleanup**: When user logs in from new device, old sessions are automatically deleted from database

5. **Session Expiry**: Sessions still respect the 7-day expiry from Better Auth config

## Configuration

### Adjust Validation Interval:
In `components/SessionGuard.tsx`:
```typescript
// Check session every 30 seconds (30000ms)
intervalId = setInterval(checkSession, 30000);

// Change to 60 seconds:
intervalId = setInterval(checkSession, 60000);
```

### Adjust Session Expiry:
In `lib/auth.ts`:
```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7, // 7 days (in seconds)
}
```

## Troubleshooting

### Issue: User keeps getting logged out
**Cause**: Another session is active or token mismatch
**Solution**: Clear localStorage and login again

### Issue: Token not created after login
**Cause**: API endpoint not reachable
**Solution**: Check network tab, verify `/api/session/device-token` returns 200

### Issue: Migration failed
**Cause**: Existing duplicate deviceToken values
**Solution**: 
```bash
# Clear existing sessions
npx prisma studio
# Delete all sessions, then run migration again
```

## Future Enhancements

1. **Multi-Device Support**: Allow X number of simultaneous devices
2. **Device Management UI**: Show user all active devices with ability to revoke
3. **Login Notifications**: Email user when login from new device occurs
4. **Trusted Devices**: Remember trusted devices for certain period
5. **Geographic Restrictions**: Block logins from unexpected locations
