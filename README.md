# Dumpling

Dumpling is an intuitive language learning app designed to better your vocabulary skills in Mandarin Chinese. Dumpling allows you to practise and broaden your vocabulary with lots of lessons, with getting XP in return after each lesson in the form of little dumplings.

## List of technologies

- Next.js
- React.js
- Typescript
- Tailwind
- ASP\.NET
- REST API

## Key features

- Learning and practising words
- Earning dumplings as XP
- Content divided into units
- Top 5 users on app overview
- Saving words to profile
- 11 API endpoints

## API

| Method | Endpoint                   | Action description              |
| ------ | -------------------------- | ------------------------------- |
| `POST` | `/api/accounts`            | Creates an account              |
| `POST` | `/api/sign-in`             | Verify if a user already exists |
| `GET`  | `/api/lessons`             | Get lessons                     |
| `GET`  | `/api/lesson/[lessonId]`   | Get a lesson by lesson id       |
| `GET`  | `/api/practise/[lessonId]` | Get a practise by lesson id     |
| `POST` | `/api/complete/[lessonId]` | Completes a lesson by lesson id |
| `GET`  | `/api/saved-words`         | Get user's saved words          |
| `POST` | `/api/save-word`           | Save/unsave a word              |
| `GET`  | `/api/is-word-saved`       | Get if word is saved            |
| `GET`  | `/api/xps/me`              | Get user's xp rank and level    |
| `GET`  | `/api/xps/list`            | Get top 5 users' levels         |

## 1. Creating an account

Users can create their new account, once they reach the website. They will be automatically redirected to a **Sign in** page. If a user does not have already an existing account, they can click on the **Register** link below the sign-in form. To register a new account, the user must fill in the username, password field, and also upload an avatar for their account profile picture.

<img width="1728" alt="Screenshot 2024-05-27 at 19 55 42" src="https://github.com/oskarpetr/reminders/assets/64423998/d88e5212-7d71-4ada-a30e-e13cd53f086c">

Once your account is created, you will be redirected to a **Sign in** page, where you need to fill out the username and password fields. If your password is incorrect, you will get prompted to fill in the correct password.

## 2. Dashboard

If you have logged in successfully to the application, you will arrive at a dashboard home page. Here you can find all the lessons that have been prepared for you. There is also a navigation bar in the top section that displays your account name, the number of lessons you have completed and the total number of XP you have reached.

<img width="1728" alt="Screenshot 2024-05-27 at 19 57 13" src="https://github.com/oskarpetr/reminders/assets/64423998/afc1fbc4-b64c-4b8b-ad89-d205cafa563e">

## 3. Lessons

Whenever you are prepared to start learning, you can click on any lesson and a popup will show up with the information about your past scores in a specific lesson. On the left you can see the best score you have reached in a 5 star form, and on the right how many times you hace completed the lesson. Once you are ready you can start the lesson with clicking on the **Start lesson** button.

<img width="1728" alt="Screenshot 2024-05-27 at 19 57 22" src="https://github.com/oskarpetr/reminders/assets/64423998/d6ff7923-6285-425a-81d5-1b8b2bc8cb39">

## 4. Learning mode

When you reach to lesson you will be first introduced with the learning mode. Learning mode is where you learn all the words of a certain lesson. You will be presented with a word and 4 different options, while one of them is correct. Do not worry as if you select the wrong option you can select again, until you select the correct one.

<img width="1728" alt="Screenshot 2024-05-27 at 19 58 15" src="https://github.com/oskarpetr/reminders/assets/64423998/111b8e5d-4fd1-4428-b338-0f2d464721db">

After learning all of the words provided, you will see a checkpoint with the words you have learned. Once you are ready, you can click on the **Practise** button and move on to the practise mode.

<img width="1728" alt="Screenshot 2024-05-27 at 20 01 31" src="https://github.com/oskarpetr/reminders/assets/64423998/d8f378e0-5a9c-4feb-ad87-909b176e8d61">

## 5. Practise mode

Now, you have reached the practise mode. Here you will have 4 different exercises of practising the words you have just learned. That is with multiple choice of meaning, multiple choice of pronunciation, writing the correct translation and matching words and meanings together. Whenever you are in the learning or practise mode you can save a word that will be saved to your profile's page.

<img width="1728" alt="Screenshot 2024-05-27 at 19 57 48" src="https://github.com/oskarpetr/reminders/assets/64423998/27f7d761-4063-4063-a7ed-bfed0f3e3d37">

Once you are all set and finished the learning and practise mode, you will see a recaputulation checkpoint of how well did you do in this lesson. You will also receive some amount of XP depending on many questions you have got correct.

<img width="1728" alt="Screenshot 2024-05-27 at 20 02 30" src="https://github.com/oskarpetr/reminders/assets/64423998/cbea2a4b-e88b-43bf-8d90-9f88445d16e0">

## 6. Profile

When you click on your name in the navigation bar, you will be redirected onto your profile's page. Where you can learn about your account. You will find there your account name, XP in total that you have earned and saved words. You can also remove a saved word by clicking on the it's star.

<img width="1728" alt="Screenshot 2024-05-27 at 19 58 43" src="https://github.com/oskarpetr/reminders/assets/64423998/ee97ccdc-fb64-41c5-b51c-6617f7351dc4">
