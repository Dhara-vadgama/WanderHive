# WanderHive 🐝

**WanderHive** is a full-stack travel listing web application where users can explore travel destinations, share their experiences, and review places visited by others.  
It allows travelers to **discover, create, and review listings** with an interactive map and secure authentication system.

---

## 🌐 Live Demo
🔗 **Website:**  
https://wanderhive-kdx4.onrender.com/listings

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Express-session

### APIs & Tools
- Mapbox (Location Maps)
- EJS-Mate (Templating Engine)

### Deployment
- Render

---

## ✨ Features

- 🗺️ **Explore Travel Listings** with interactive location maps  
- ✍️ **User Authentication** (Register & Login)  
- 🧳 **Add New Travel Listings** with location details  
- ⭐ **Post Reviews & Ratings** for destinations  
- 🔐 **Secure Authentication & Session Management**  
- 🗑️ **Delete Your Own Listings and Reviews**  
- 💾 **Flash Messages** for user feedback and notifications  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Dhara-vadgama/WanderHive.git
cd WanderHive
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create environment variables

Create a **.env** file and add:

```
ATLASDB_URL=your_mongodb_connection_string
MAPBOX_TOKEN=your_mapbox_token
SECRET=your_session_secret
```

### 4️⃣ Run the application

```bash
node app.js
```

Then open:

```
http://localhost:8080
```

---

## 📂 Project Structure

```
WanderHive
│
├── models
├── routes
├── views
├── public
├── controllers
├── utils
└── app.js
```


## 👩‍💻 Author

**Dhara Vadgama**

GitHub:  
https://github.com/Dhara-vadgama
