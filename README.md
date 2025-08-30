## how to run it

```bash
npm install
npm run dev:full
```

then go to `http://localhost:3000`

login with:

- email: rohitsingh@gmail.com
- password: password123

## what i used

- react + typescript
- tailwind for styling
- recharts chart library for the graphs
- express for the backend api

## adding a real backend later

right now it's using mock data and a simple express server. if you want to connect a real database/backend:

### quick steps:

1. **database setup** - connect to something like neon, supabase, or mongo
2. **update api endpoints** - replace the mock data in `server/index.js`
3. **auth stuff** - swap out the fake login with real jwt tokens
4. **environment vars** - add your db connection strings to `.env`

### what to change:

- `server/index.js` - replace all the mock data with real db calls
- `src/contexts/AuthContext.tsx` - connect to real auth service
- `src/services/api.ts` - update base url if needed

### if using external backend:

just change the api calls in `src/services/api.ts` to point to your backend url instead of localhost:5000

if something breaks, try restarting the server
