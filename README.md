# Paisa Ja Kaha Raha Hai Vai?

### *dekhlo vai paisa kaha ja raha*

Ever checked your bank balance and wondered...

**"Bhai, kal hi toh paise the. Gaye kahan?!"** 

Well, that's exactly why this project exists.

**Paisa Ja Kaha Raha Hai Vai?** is a personal expense tracker built to help you understand, track, and manage your money — before your money mysteriously disappears again.

---

## What's the vibe?

A modern, dark-themed expense tracking app with a warm orange aesthetic, designed to make managing money a little less boring.

### Features

- **User Authentication** — Sign up and log in using Amazon Cognito.
- **Email Verification** — Verify your account during registration.
- **Dashboard** — Your financial overview at a glance.
- **Add Expense** — Record your daily spending.
- **Categories** — Organise expenses into categories.
- **All Expenses** — Keep track of where your money goes.
- **Analytics** — Understand your spending habits.
- **Profile** — Your personal account space.

> The application is actively under development. Some screens are currently UI implementations, and backend functionality is being developed.

---

## Design Philosophy

- Dark backgrounds with orange gradients.
- Minimal and modern interface.
- Clean layouts and readable typography.
- Simple navigation.
- Less financial stress, more financial clarity.

Basically, finance management without looking like an Excel spreadsheet from 2007.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile application |
| Expo | Development environment |
| TypeScript | Type-safe development |
| AWS Amplify | AWS integration |
| Amazon Cognito | Authentication |
| Amazon DynamoDB | Planned expense storage |
| AWS Lambda | Planned backend logic |
| Amazon API Gateway | Planned API layer |

---

## Project Structure

```text
Paisa-ja-kaha-raha-haai-vai/
│
├── assets/              # Images, icons and media
├── components/          # Reusable UI components
├── config/              # Application configuration
├── graphql/              # GraphQL-related files
├── screens/              # Application screens
├── services/             # Service and integration logic
│
├── App.tsx               # Main application entry
├── index.ts              # Expo entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md
```

---

## Getting Started

Want to run this project locally? Let's go!

### Prerequisites

Make sure you have:

- Node.js
- npm
- Git
- Expo development environment
- An AWS account for Cognito integration

### 1. Clone the repository

```bash
git clone https://github.com/sussy-developer/Paisa-ja-kaha-raha-haai-vai.git
```

### 2. Enter the project directory

```bash
cd Paisa-ja-kaha-raha-haai-vai
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Expo development server

```bash
npx expo start
```

For a native Android development build:

```bash
npx expo run:android
```

**Note:** This project uses native React Native dependencies. Use an Expo development build rather than relying on Expo Go for the complete application.

---

## AWS Architecture

The planned backend architecture:

```text
       React Native App
              |
              v
        AWS Cognito
       (Authentication)
              |
              v
        API Gateway
              |
              v
         AWS Lambda
        (Business Logic)
              |
              v
         DynamoDB
       (Expense Data)
```

The idea is simple:

- Cognito manages user identity.
- API Gateway receives application requests.
- Lambda processes expense operations.
- DynamoDB stores expense records.

Each user's expenses should remain associated with their authenticated Cognito user account.
