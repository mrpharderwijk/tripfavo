# Magic Link Authentication Setup

This project uses AuthJS (NextAuth.js v5) with magic link authentication via Resend.

## Environment Variables

Add these to your `.env` file:

```env
# AuthJS Configuration
AUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Resend Configuration  
AUTH_RESEND_KEY=your-resend-api-key-here
AUTH_RESEND_FROM=onboarding@yourdomain.com

# Database
DATABASE_URL=your-database-url
```

## How to Get Your Resend API Key

1. Go to [Resend](https://resend.com) and create an account
2. Verify your domain or use the testing domain
3. Create an API key in your dashboard
4. Add it to your environment variables

## How It Works

1. User enters their email at `/auth/signin`
2. AuthJS sends a magic link email via Resend
3. User clicks the link in their email
4. AuthJS verifies the token and creates a session
5. User is signed in and redirected

## Testing

1. Start your development server: `yarn dev`
2. Navigate to `http://localhost:3000/auth/signin`
3. Enter your email address
4. Check your email for the magic link
5. Click the link to sign in

## Key Files

- `src/lib/auth/auth.config.ts` - AuthJS provider configuration
- `src/lib/auth/auth.ts` - Main AuthJS configuration
- `src/app/auth/signin/page.tsx` - Sign-in page
- `src/app/api/auth/[...nextauth]/route.ts` - AuthJS API routes
- `prisma/schema.prisma` - Database models

## Troubleshooting

### "Configuration" Error
- Check that `AUTH_SECRET` is set in your environment variables
- Make sure `AUTH_RESEND_KEY` and `AUTH_RESEND_FROM` are correctly configured

### Email Not Sending
- Verify your Resend API key is valid
- Check that the `from` email address is verified in Resend
- Look at the browser network tab for any error responses

### Token/Link Not Working
- Ensure your database is running and accessible
- Check that the Prisma schema is migrated: `yarn prisma migrate dev`
- Verify that the `NEXTAUTH_URL` matches your application URL

### Development Tips
- Use `debug: true` in your AuthJS config during development
- Check the browser console and network tab for detailed error messages
- Verify that all required environment variables are set

## Migration from Custom Implementation

If you're migrating from a custom token verification system:

1. Remove custom `sendVerificationRequest` functions
2. Delete custom token verification API routes
3. Use the standard AuthJS Resend provider configuration
4. Let AuthJS handle the entire flow automatically

This ensures compatibility with future AuthJS updates and reduces maintenance overhead. 