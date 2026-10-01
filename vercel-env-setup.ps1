# Frontend variables
echo "AIzaSyAfz3G_uBQkDePEYWaQgfuLZtSAgaCJOag" | vercel env add VITE_FIREBASE_API_KEY production
echo "okurmen-3f257.firebaseapp.com" | vercel env add VITE_FIREBASE_AUTH_DOMAIN production
echo "okurmen-3f257" | vercel env add VITE_FIREBASE_PROJECT_ID production
echo "okurmen-3f257.firebasestorage.app" | vercel env add VITE_FIREBASE_STORAGE_BUCKET production
echo "83969201678" | vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
echo "1:83969201678:web:afc26bc49766e957138e5f" | vercel env add VITE_FIREBASE_APP_ID production
echo "G-MTW4H1734Y" | vercel env add VITE_FIREBASE_MEASUREMENT_ID production
echo "8868263184:AAFEST8EmAJnk_3tEiECZPcsPfLeU9dZZWI" | vercel env add VITE_TELEGRAM_BOT_TOKEN production
echo "8497011885" | vercel env add VITE_TELEGRAM_CHAT_ID production

# Backend variables
echo "postgresql://neondb_owner:npg_FTGunq7bhv1B@ep-restless-frog-b59m6g2l-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL production
echo "production" | vercel env add NODE_ENV production

Write-Host "✅ All environment variables added!"
