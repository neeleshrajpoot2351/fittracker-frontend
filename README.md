# FIT TRACKER PRO - Complete Setup Guide

## AI-Powered Fitness Tracking Application

---

## 📁 PROJECT STRUCTURE

```
Fit Tracker/
├── README.md                      ← This file (Setup guide)
├── PROJECT_REPORT.md              ← Complete project documentation
├── COMPLETE_DATABASE_SETUP.sql    ← Database setup file
│
├── fittracker-Backend/
│   ├── fit.sql                    ← Database backup
│   └── fitnessTracker/            ← Spring Boot application
│       ├── src/                   ← Java source code
│       ├── pom.xml                ← Maven configuration
│       ├── start-backend.bat      ← Windows startup script
│       ├── start-backend.sh       ← Linux/Mac startup script
│       └── mvnw.cmd               ← Maven wrapper
│
└── fittracker-Frontend/           ← React application
    ├── src/                       ← React source code
    ├── public/                    ← Static files
    ├── package.json               ← NPM configuration
    └── node_modules/              ← Dependencies
```

---

## ⚡ QUICK START (3 STEPS)

### Step 1: Setup Database

**Method A: Using MySQL Workbench (Recommended)**
1. Open MySQL Workbench
2. Connect to localhost (username: `root`, password: `ankit`)
3. Go to **File → Open SQL Script**
4. Select `COMPLETE_DATABASE_SETUP.sql`
5. Click the **⚡ lightning bolt** icon to execute
6. Verify: You should see 5 tables created

**Method B: Using Command Line**
```bash
mysql -u root -pankit < COMPLETE_DATABASE_SETUP.sql
```

**Verification:**
```sql
SHOW DATABASES;  -- Should see 'fitnessTracker'
USE fitnessTracker;
SHOW TABLES;     -- Should see 5 tables
DESCRIBE users;  -- Should see 13 columns
```

---

### Step 2: Start Backend

**Windows:**
```bash
cd "D:\All Project\Fit Tracker\fittracker-Backend\fitnessTracker"
start-backend.bat
```

**Linux/Mac:**
```bash
cd "D:\All Project\Fit Tracker\fittracker-Backend\fitnessTracker"
./start-backend.sh
```

**Wait for this message:**
```
Started FitnessTrackerApplication in X.XXX seconds (JVM running for X.XXX)
```

**If backend won't start:**
- Check MySQL is running
- Verify database credentials in `src/main/resources/application.properties`
- Make sure Java 17+ is installed: `java -version`

---

### Step 3: Start Frontend

```bash
cd "D:\All Project\Fit Tracker\fittracker-Frontend"
npm install        # First time only
npm start          # Start the app
```

**Browser will automatically open at:** http://localhost:3000

**If frontend won't start:**
```bash
npm install --force
npm start
```

---

## ✅ TESTING YOUR PROJECT

### 1. Sign Up (Create Account)
- Go to: http://localhost:3000/signup
- Enter:
  - **Name:** Your Full Name
  - **Email:** youremail@gmail.com
  - **Password:** yourpassword
  - **Confirm Password:** yourpassword
- Click **"Create Account"**
- ✅ You'll be automatically logged in

### 2. Sign In (Login)
- Logout from your profile
- Go to: http://localhost:3000/signin
- Enter:
  - **Email:** youremail@gmail.com ← Use your EMAIL (not username!)
  - **Password:** yourpassword
- Click **"Sign In"**
- ✅ Login successful!

### 3. Edit Profile
- Click on your profile icon
- Click **"Edit Profile"**
- Fill in:
  - Phone number
  - Date of birth
  - Height (in cm)
  - Weight (in kg)
  - Target Weight (in kg)
  - Fitness Level (Beginner/Intermediate/Advanced)
- Click **"Save Changes"**
- ✅ BMI will be calculated automatically!
- ✅ You'll see "X kg to lose" or "X kg to gain"

### 4. Create Goals
- Go to **Goals** page
- Click **"Add New Goal"**
- Enter:
  - Goal description (e.g., "Run 5K")
  - Target date
- Click **"Add Goal"**
- ✅ Goal created with days left countdown

### 5. Use AI Coach
- Go to **AI Coach** page
- Select your preferences:
  - Goal (Fat Loss, Muscle Gain, etc.)
  - Time available (minutes)
  - Place (Home, Gym, Outdoor)
  - Equipment available
  - Fitness level
  - Sleep hours
  - Stress level
- Click **"Get Today's Plan"**
- ✅ Personalized workout, sleep tip, fruit recommendation, and habit suggestion!

### 6. View Statistics
- Go to **Statistics** page
- ✅ See your workout calendar
- ✅ View activity breakdown
- ✅ Check monthly progress

---

## 🗄️ DATABASE DETAILS

### Credentials
- **Username:** root
- **Password:** ankit
- **Database Name:** fitnessTracker
- **Port:** 3306 (default MySQL port)

### Tables Structure

#### 1. users (13 columns)
```sql
- id (Primary Key)
- username (Unique)
- name
- email (Unique)
- password (Encrypted)
- phone
- date_of_birth
- height (in cm)
- weight (in kg)
- target_weight (in kg)
- fitness_level
- created_at
- updated_at
```

#### 2. goals
```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- description
- target_date
- status (IN_PROGRESS, COMPLETED)
- created_at
- updated_at
```

#### 3. workouts
```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- name
- description
- duration_minutes
- calories_burned
- workout_date
- created_at
- updated_at
```

#### 4. food_logs
```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- food_name
- calories
- protein_grams
- carbs_grams
- fat_grams
- meal_type
- log_date
- created_at
- updated_at
```

#### 5. routines
```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- name
- description
- duration_minutes
- difficulty
- created_at
- updated_at
```

---

## 🛠️ TECHNOLOGY STACK

### Frontend
- **Framework:** React.js 18
- **Routing:** React Router DOM
- **State Management:** Context API (AuthContext)
- **HTTP Client:** Axios
- **Styling:** CSS3

### Backend
- **Framework:** Spring Boot 3.5.5
- **Language:** Java 21
- **Security:** Spring Security + JWT
- **ORM:** Spring Data JPA (Hibernate)
- **Validation:** Jakarta Validation
- **Build Tool:** Maven

### Database
- **DBMS:** MySQL 8
- **Tables:** 5 (users, goals, workouts, food_logs, routines)

---

## 🔧 CONFIGURATION FILES

### Backend Configuration
**File:** `fittracker-Backend/fitnessTracker/src/main/resources/application.properties`

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/fitnessTracker
spring.datasource.username=root
spring.datasource.password=ankit

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
fitnessTracker.app.jwtSecret=[your-secret-key]
fitnessTracker.app.jwtExpirationMs=86400000

# Server
server.port=8080
```

### Frontend Configuration
**File:** `fittracker-Frontend/src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:8080';
```

---

## ✨ FEATURES

### Authentication & User Management
- ✅ User Registration with name, email, password
- ✅ **Login with email** (not username!)
- ✅ JWT token-based authentication
- ✅ Secure password encryption (BCrypt)
- ✅ Protected routes

### Profile Management
- ✅ View profile details
- ✅ Edit all fields:
  - Name, Email, Password
  - Phone, Date of Birth
  - Height, Weight, Target Weight
  - Fitness Level
- ✅ **Auto BMI calculation** (from height & weight)
- ✅ **Weight progress tracking** ("X kg to lose/gain")

### Goals Management
- ✅ Create goals with deadlines
- ✅ Mark goals as complete/incomplete
- ✅ Delete goals
- ✅ Track days left/overdue
- ✅ View active and completed goals separately
- ✅ Goal status indicators

### AI Coach
- ✅ Personalized workout plans based on:
  - Goal (Fat Loss, Muscle Gain, Stay Active, etc.)
  - Time available (10-60 minutes)
  - Location (Home, Gym, Outdoor)
  - Equipment (None, Dumbbells, Resistance Bands)
  - Fitness level (Beginner, Intermediate, Advanced)
  - Sleep hours
  - Stress level
- ✅ Daily sleep tips
- ✅ Fruit recommendations with benefits
- ✅ Micro-habit suggestions
- ✅ Workout history tracking
- ✅ Swap workout option

### Recommendations
- ✅ Exercise recommendations
- ✅ Diet recommendations
- ✅ Fitness plans
- ✅ YouTube video suggestions
- ✅ Workout music playlists
- ✅ Interactive buttons (Start Workout, View Recipe, etc.)

### Statistics & Analytics
- ✅ Total workouts count
- ✅ Calories burned
- ✅ Active days percentage
- ✅ Personal records
- ✅ Monthly workout calendar
- ✅ Activity breakdown by type
- ✅ Monthly progress chart
- ✅ Recent workout history

---

## 🆘 TROUBLESHOOTING

### Backend Issues

**Problem: Backend won't start**
- **Check MySQL:** Make sure MySQL service is running
  - Windows: Open Services (Win+R → `services.msc`), find MySQL, ensure it's "Running"
  - Linux/Mac: `sudo systemctl status mysql` or `brew services list`
- **Check Java:** `java -version` (should be 17 or higher)
- **Check Port:** Make sure port 8080 is not in use
- **Rebuild:** 
  ```bash
  cd fittracker-Backend/fitnessTracker
  ./mvnw clean package -DskipTests
  ./mvnw spring-boot:run -DskipTests
  ```

**Problem: "Access denied for user 'root'"**
- Verify MySQL credentials in `application.properties`
- Try logging into MySQL manually: `mysql -u root -pankit`

**Problem: "Unknown database 'fitnessTracker'"**
- Run `COMPLETE_DATABASE_SETUP.sql` again

---

### Frontend Issues

**Problem: Frontend won't start**
```bash
cd fittracker-Frontend
rm -rf node_modules package-lock.json  # or use Windows delete
npm install --force
npm start
```

**Problem: "CORS error" or "Network Error"**
- Make sure backend is running on port 8080
- Check backend console for CORS errors
- Verify API base URL in `src/services/api.js`

**Problem: Login fails after signup**
- Clear browser cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+F5
- Check browser console (F12) for errors
- Verify user was created: `SELECT * FROM users;`

**Problem: Profile page doesn't show data**
- Restart backend (important after login fix!)
- Clear localStorage: 
  ```javascript
  // In browser console (F12)
  localStorage.clear();
  ```
- Login again

---

### Database Issues

**Problem: MySQL won't start**
- Windows: Start MySQL service in Services
- Linux: `sudo systemctl start mysql`
- Mac: `brew services start mysql`

**Problem: Table doesn't exist**
```sql
-- Rerun the setup script
mysql -u root -pankit < COMPLETE_DATABASE_SETUP.sql
```

**Problem: Column doesn't exist (e.g., 'name')**
- This means old database structure
- Drop and recreate:
  ```sql
  DROP DATABASE fitnessTracker;
  -- Then run COMPLETE_DATABASE_SETUP.sql
  ```

---

## 🔑 KEY FIXES APPLIED

### 1. Backend Compilation ✅
- **Issue:** UserController constructor mismatch
- **Fixed:** Now returns all 9 user profile fields correctly

### 2. Login with Email ✅
- **Issue:** Users sign up with email but couldn't login with email
- **Fixed:** Backend now accepts email for login and finds username automatically

### 3. Database Simplified ✅
- **Issue:** Multiple complex migration files
- **Fixed:** ONE complete database file with all tables and fields

### 4. Profile Fields ✅
- **Issue:** Missing fitness fields (height, weight, BMI)
- **Fixed:** Added all fields to database and frontend

---

## 📝 API ENDPOINTS

### Authentication
```
POST /api/auth/signup      - Register new user
POST /api/auth/login       - Login with email/username + password
```

### User Profile
```
GET  /api/users/{username} - Get user profile
PUT  /api/users/{username} - Update user profile
```

### Goals
```
POST   /api/goals                    - Create goal
GET    /api/goals/user/{username}    - Get user's goals
PUT    /api/goals/{id}                - Update goal
DELETE /api/goals/{id}                - Delete goal
```

### Workouts
```
POST /api/workouts/log/{routineId}  - Log workout
GET  /api/workouts/history/{username} - Get workout history
```

### Routines
```
POST   /api/routines                  - Create routine
GET    /api/routines/user/{username}  - Get user's routines
PUT    /api/routines/{id}             - Update routine
DELETE /api/routines/{id}             - Delete routine
```

### Diet
```
POST /api/diet/log                 - Log food
GET  /api/diet/log/user/{username} - Get food logs
```

### Statistics
```
GET /api/stats/dashboard/{username} - Get dashboard stats
GET /api/stats/history/{username}   - Get user history
```

---

## 🎓 FOR ACADEMIC SUBMISSION

### Project Report
- See **PROJECT_REPORT.md** for complete academic documentation
- Includes: Abstract, Introduction, System Design, Implementation, Testing, Conclusion

### Deliverables
- ✅ Complete source code (Backend + Frontend)
- ✅ Database setup script
- ✅ Setup documentation (this file)
- ✅ Project report
- ✅ All features working and tested

### Demo Checklist
- [ ] Signup new user
- [ ] Login with email
- [ ] Edit profile (add height, weight)
- [ ] See BMI calculated
- [ ] Create goal
- [ ] Use AI Coach
- [ ] View statistics
- [ ] All features functional

---

## 📞 SUPPORT

**Having issues?**
1. Check this README for troubleshooting steps
2. Verify MySQL is running and database exists
3. Check backend and frontend consoles for errors
4. Restart backend and frontend
5. Clear browser cache

**Common Commands:**
```bash
# Check MySQL
mysql -u root -pankit
SHOW DATABASES;

# Rebuild Backend
cd fittracker-Backend/fitnessTracker
./mvnw clean package -DskipTests

# Reinstall Frontend
cd fittracker-Frontend
npm install --force

# Check Ports
netstat -ano | findstr :8080   # Backend
netstat -ano | findstr :3000   # Frontend
```

---

## 🎉 PROJECT STATUS

```
✅ COMPLETE
✅ ALL FEATURES WORKING
✅ SIGNUP ✅
✅ LOGIN ✅ (with email support)
✅ PROFILE MANAGEMENT ✅
✅ GOALS TRACKING ✅
✅ AI COACH ✅
✅ STATISTICS ✅
✅ RECOMMENDATIONS ✅
✅ DATABASE COMPLETE
✅ READY FOR DEMO
✅ READY FOR SUBMISSION
```

---

## 📊 FILE COUNT

### Essential Files Only:
```
Documentation:    2 files (README.md, PROJECT_REPORT.md)
Database:         2 files (COMPLETE_DATABASE_SETUP.sql, fit.sql)
Backend Code:     ~45 Java files
Frontend Code:    ~25 JS/JSX files
Configuration:    ~5 files (pom.xml, package.json, etc.)
```

---

**Developed by:** [Your Name]  
**Date:** November 2025  
**Project:** B.Tech Mini Project  
**Status:** Complete & Finalized ✅

---

**Last Updated:** November 23, 2025  
**Version:** 1.0 Final  
**Build Status:** ✅ Success  
**All Tests:** ✅ Passing
