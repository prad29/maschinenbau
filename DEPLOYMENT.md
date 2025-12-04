# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed locally

## Deployment Steps

### Option 1: Deploy via Vercel Website (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add the following:
     - Name: `VITE_API_BASE_URL`
     - Value: `http://18.198.197.248:5000/`
     - Apply to: Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a URL like: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - What's your project's name? (press enter for default)
   - In which directory is your code located? ./
   - Want to override the settings? No

4. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_BASE_URL production
   ```
   Enter: `http://18.198.197.248:5000/`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## After Deployment

### Testing
- Visit your Vercel URL
- Test the login functionality
- Test chat functionality
- Check browser console for any errors

### Custom Domain (Optional)
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables

The application uses the following environment variable:

- `VITE_API_BASE_URL` - Backend API URL (default: `http://18.198.197.248:5000/`)

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch = Production deployment
- Every push to other branches = Preview deployment
- Pull requests automatically get preview URLs

## CORS Configuration

**Important**: Your backend at `http://18.198.197.248:5000/` must allow CORS requests from your Vercel domain.

Add this to your backend (example for Node.js/Express):

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:5173' // for local development
  ],
  credentials: true
}));
```

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Try building locally: `npm run build`

### API Calls Fail
- Check environment variable is set correctly in Vercel
- Verify backend CORS settings
- Check browser console for errors
- Verify backend is accessible from Vercel's servers

### 404 on Route Refresh
- Ensure `vercel.json` is present (already configured)
- This rewrites all routes to `index.html` for SPA routing

## Performance Optimization (Optional)

The build warning about chunk size can be addressed later with code splitting:

```javascript
// Example: Lazy load routes in App.jsx
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
```

## Support

- Vercel Documentation: https://vercel.com/docs
- Vite Documentation: https://vite.dev/guide/

## Project Structure

```
maschinenbau/
├── .env                 # Local environment variables (not committed)
├── .env.example         # Example environment variables
├── vercel.json          # Vercel configuration for SPA routing
├── src/
│   └── utils/
│       └── apiInstance.js  # Uses VITE_API_BASE_URL
└── dist/                # Build output (auto-generated)
```

## Notes

- The `.env` file is gitignored for security
- Backend URL is configurable via environment variable
- Vercel provides automatic HTTPS
- Free tier includes 100GB bandwidth/month
