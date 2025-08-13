# Next.js + MongoDB + Google OAuth - CRUD Notes

Минималистичный full-stack шаблон: Next.js App Router, TailwindCSS, MongoDB через Mongoose, вход через Google (SSO на основе next-auth). Есть защищенные API маршруты и простой CRUD по заметкам, привязанный к пользователю.

## Стек
- Next.js 14 - App Router
- React 18
- TailwindCSS 3
- next-auth v4 - Google OAuth
- MongoDB - Mongoose
- TypeScript
- Без точек с запятой и с отступом 2 пробела

## Функционал
- Регистрация и вход через Google
- Защищенные API маршруты с проверкой сессии
- CRUD по заметкам - каждая заметка привязана к пользователю
- Минималистичный UI на TailwindCSS

## Быстрый старт
1. Скопируй `.env.example` в `.env.local` и заполни значения:
   - `NEXTAUTH_SECRET` - любая длинная случайная строка
   - `NEXTAUTH_URL` - `http://localhost:3000` в локальной разработке
   - `GOOGLE_CLIENT_ID` и `GOOGLE_CLIENT_SECRET` - из Google Cloud Console
   - `MONGODB_URI` - строка подключения к MongoDB (например, Atlas)

2. Установи зависимости и запусти dev сервер:
   ```bash
   npm install
   npm run dev
   ```

3. Открой `http://localhost:3000`

### Настройка Google OAuth
- Зайди в Google Cloud Console - APIs & Services - Credentials
- Создай OAuth client: Application type - Web application
- Добавь Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- Скопируй Client ID и Client Secret в `.env.local`

### База данных
- Подойдет любой кластер MongoDB Atlas
- Пример строки подключения в `.env.example`
- Коллекции для заметок создаются автоматически Mongoose при первом сохранении

## Архитектура и решения
- Auth - next-auth с JWT стратегией. Адаптер БД не обязателен, поэтому для простоты не используется. Идентификатор пользователя берется из `token.sub`, который стабилен для аккаунта Google
- Данные приложения - в MongoDB через Mongoose. Модель `Note` хранит `userId`, `title`, `content`, `timestamps`
- API - обработчики в `app/api/notes` с проверкой сессии через `getServerSession`
- UI - App Router страницы. `app/notes/page.tsx` защищена на сервере и рендерит клиентский компонент с формой и списком

### Опционально: хранить пользователей авторизации в MongoDB
Если хочешь, чтобы next-auth писал пользователей и аккаунты в MongoDB, добавь адаптер:
1. Установи пакет:
   ```bash
   npm i @next-auth/mongodb-adapter
   ```
2. Создай `lib/mongodbClient.ts`:
   ```ts
   import { MongoClient } from 'mongodb'

   const uri = process.env.MONGODB_URI || ''
   if (!uri) throw new Error('MONGODB_URI is not set')

   let client: MongoClient
   let clientPromise: Promise<MongoClient>

   declare global {
     var _mongoClientPromise: Promise<MongoClient> | undefined
   }

   if (process.env.NODE_ENV === 'development') {
     if (!global._mongoClientPromise) {
       client = new MongoClient(uri)
       global._mongoClientPromise = client.connect()
     }
     clientPromise = global._mongoClientPromise
   } else {
     client = new MongoClient(uri)
     clientPromise = client.connect()
   }

   export default clientPromise
   ```
3. В `lib/authOptions.ts` раскомментируй адаптер и импорт:
   ```ts
   import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
   import clientPromise from '@/lib/mongodbClient'

   export const authOptions: NextAuthOptions = {
     adapter: MongoDBAdapter(clientPromise),
     providers: [/* ... */],
     session: { strategy: 'jwt' },
     callbacks: { /* ... */ }
   }
   ```

## Скрипты
- `npm run dev` - локальный сервер разработки
- `npm run build` - сборка
- `npm start` - запуск собранного приложения
- `npm run lint` - линтер

## Деплой
- Vercel - самое простое. Добавь переменные окружения из `.env.local` в проект на Vercel
- Убедись, что в консоли Google добавлен продовый redirect URI: `https://YOUR_DOMAIN/api/auth/callback/google`

## Публикация в GitHub
```bash
git init
git add .
git commit -m "init: nextjs + mongo + google oauth + crud notes"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## Стиль кода
- 2 пробела, без точек с запятой
- Prettier и ESLint настроены соответствующим образом
