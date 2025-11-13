# Finance App Backend API

Backend для приложения учёта доходов и расходов на NestJS, TypeScript, Prisma ORM и SQLite.

## Технологии

- **NestJS** - фреймворк для Node.js
- **TypeScript** - типизированный JavaScript
- **Prisma ORM** - современный ORM для работы с базой данных
- **SQLite** - встроенная база данных
- **JWT** - аутентификация через токены
- **bcrypt** - хеширование паролей

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Применить миграции
npm run prisma:migrate

# Заполнить БД базовыми категориями
npm run prisma:seed

# Запуск в режиме разработки
npm run start:dev

# Просмотр БД через Prisma Studio
npm run prisma:studio
```

Сервер запустится на `http://localhost:3001`

## API Endpoints

### Аутентификация

#### POST `/auth/register`
Регистрация нового пользователя

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Имя Пользователя"
}
```

**Response:**
```json
{
  "access_token": "jwt_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Имя Пользователя"
  }
}
```

#### POST `/auth/login`
Вход в систему

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "jwt_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Имя Пользователя"
  }
}
```

---

### Категории (требуется авторизация)

**Headers:** `Authorization: Bearer {access_token}`

#### GET `/categories`
Получить все категории (базовые + пользовательские)

**Query params:**
- `type` (optional): `income` или `expense`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Зарплата",
    "type": "income",
    "isDefault": true,
    "userId": null
  },
  {
    "id": 2,
    "name": "Моя категория",
    "type": "expense",
    "isDefault": false,
    "userId": 1
  }
]
```

#### POST `/categories`
Создать свою категорию

**Body:**
```json
{
  "name": "Моя категория",
  "type": "income"
}
```

#### PUT `/categories/:id`
Обновить свою категорию (только не базовые)

**Body:**
```json
{
  "name": "Новое название"
}
```

#### DELETE `/categories/:id`
Удалить свою категорию (только не базовые)

---

### Транзакции (требуется авторизация)

**Headers:** `Authorization: Bearer {access_token}`

#### GET `/transactions`
Получить все транзакции пользователя

**Query params:**
- `type` (optional): `income` или `expense`

**Response:**
```json
[
  {
    "id": 1,
    "amount": 50000,
    "description": "Зарплата за октябрь",
    "type": "income",
    "date": "2024-10-31T00:00:00.000Z",
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Зарплата",
      "type": "income"
    }
  }
]
```

#### GET `/transactions/statistics`
Получить статистику по доходам и расходам

**Response:**
```json
{
  "totalIncome": 50000,
  "totalExpense": 15000,
  "balance": 35000
}
```

#### GET `/transactions/:id`
Получить одну транзакцию

#### POST `/transactions`
Создать транзакцию (доход или расход)

**Body:**
```json
{
  "amount": 1500,
  "description": "Покупка продуктов",
  "type": "expense",
  "categoryId": 5,
  "date": "2024-11-13T10:00:00.000Z"
}
```

**Поля:**
- `amount` (обязательно): сумма
- `description` (опционально): описание
- `type` (обязательно): `income` или `expense`
- `categoryId` (обязательно): ID категории
- `date` (опционально): дата транзакции (по умолчанию - текущая)

#### PUT `/transactions/:id`
Обновить транзакцию

**Body:**
```json
{
  "amount": 2000,
  "description": "Обновлённое описание",
  "categoryId": 6,
  "date": "2024-11-14T10:00:00.000Z"
}
```

#### DELETE `/transactions/:id`
Удалить транзакцию

---

## Базовые категории

### Расходы:
- Жильё (аренда/ипотека, коммунальные, ремонт, мебель)
- Питание (продукты, рестораны, доставка, кафе)
- Транспорт (топливо, обслуживание, общественный транспорт, парковка)
- Связь и интернет (мобильная связь, интернет, подписки)
- Одежда и обувь (покупка, аксессуары, стирка/химчистка)
- Здоровье (лекарства, врачи, страховка, спортзал)
- Образование (курсы, книги, обучение детей)
- Развлечения (кино, путешествия, игры, подписки)
- Подарки и праздники
- Налоги и сборы
- Финансовые обязательства (кредиты, страховки)

### Доходы:
- Зарплата
- Доп. доход
- Дивиденды

## База данных

SQLite база данных находится в `prisma/dev.db`

### Схема:

- **User** - пользователи
- **Category** - категории (базовые и пользовательские)
- **Transaction** - транзакции (доходы/расходы)

## Структура проекта

```
backend/
├── prisma/
│   ├── schema.prisma      # Схема БД
│   ├── seed.ts           # Наполнение базовыми категориями
│   └── dev.db            # SQLite database
├── src/
│   ├── auth/             # Модуль аутентификации
│   ├── categories/       # Модуль категорий
│   ├── transactions/     # Модуль транзакций
│   ├── app.module.ts     # Главный модуль
│   ├── prisma.service.ts # Prisma сервис
│   └── main.ts           # Точка входа
└── package.json
```
