# Next.js + MongoDB + Google OAuth - CRUD Notes

Minimalist full-stack template: Next.js App Router, TailwindCSS, MongoDB via Mongoose, Google login (SSO based on next-auth). Includes protected API routes and simple note CRUD tied to the user.

## Stack

- Next.js 14 - App Router
- React 18
- TailwindCSS 3
- next-auth v4 - Google OAuth
- MongoDB - Mongoose
- TypeScript
- No semicolons, 2-space indentation

## Features

- Registration and login via Google
- Protected API routes with session validation
- Note CRUD - each note is tied to a user
- Minimalist UI with TailwindCSS

## Quick Start

1. Copy `.env.example` to `.env.local` and fill in the values:

   - `NEXTAUTH_SECRET` - any long random string
   - `NEXTAUTH_URL` - `http://localhost:3000` for local development
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - from Google Cloud Console
   - `MONGODB_URI` - MongoDB connection string (e.g., Atlas)

2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open `http://localhost:3000`

### Google OAuth Setup

- Go to Google Cloud Console - APIs & Services - Credentials
- Create an OAuth client: Application type - Web application
- Add Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- Copy Client ID and Client Secret to `.env.local`

### Database

- Any MongoDB Atlas cluster will work
- Example connection string in `.env.example`
- Note collections are automatically created by Mongoose on first save

## Architecture and Decisions

- Auth - next-auth with JWT strategy. No DB adapter is required, so it’s not used for simplicity. User identifier is taken from `token.sub`, which is stable for Google accounts
- App data - stored in MongoDB via Mongoose. `Note` model stores `userId`, `title`, `content`, `timestamps`
- API - handlers in `app/api/notes` with session validation via `getServerSession`
- UI - App Router pages. `app/notes/page.tsx` is server-protected and renders a client component with a form and list

### Optional: Store auth users in MongoDB

If you want next-auth to store users and accounts in MongoDB, add an adapter:

1. Install the package:
   ```bash
   npm i @next-auth/mongodb-adapter
   ```
2. Create `lib/mongodbClient.ts`:

   ```ts
   // Content for mongodbClient.ts would go here
   ```

   import { MongoClient } from 'mongodb';

   const uri = process.env.MONGODB_URI || '';
   if (!uri) throw new Error('MONGODB_URI is not set');

   let client: MongoClient;
   let clientPromise: Promise<MongoClient>;

   declare global {
   var \_mongoClientPromise: Promise<MongoClient> | undefined;
   }

   if (process.env.NODE_ENV === 'development') {
   if (!global.\_mongoClientPromise) {
   client = new MongoClient(uri);
   global.\_mongoClientPromise = client.connect();
   }
   clientPromise = global.\_mongoClientPromise;
   } else {
   client = new MongoClient(uri);
   clientPromise = client.connect();
   }

   export default clientPromise;

   ```

   ```

3. in `lib/authOptions.ts` i recomendet:

   ```ts
   import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
   import clientPromise from '@/lib/mongodbClient';

   export const authOptions: NextAuthOptions = {
     adapter: MongoDBAdapter(clientPromise),
     providers: [
       /* ... */
     ],
     session: { strategy: 'jwt' },
     callbacks: {
       /* ... */
     }
   };
   ```

## Script

- `npm run dev` - local server
- `npm run build` - create build for product
- `npm start` - run build app
- `npm run lint` - check eslint

## Deploy

Vercel - the simplest option. Add environment variables from .env.local to your Vercel project
Ensure the production redirect URI is added in Google Cloud Console: https://YOUR_DOMAIN/api/auth/callback/google

## Publishing to GitHub

```bash
git init
git add .
git commit -m "init: nextjs + mongo + google oauth + crud notes"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## Style code

- 2 spaces, no semicolons
- Prettier and ESLint configured accordingly
