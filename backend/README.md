
# Volunteer Platform API

A role-based Volunteer Management Platform built with **Django** and **Django REST Framework**.

This platform allows:

* Volunteers to explore opportunities and apply
* Organizers to create opportunities and manage applications
* Secure role-based access control
* Profile management with image upload support

---

## 🚀 Tech Stack

* Python 3.11+
* Django
* Django REST Framework
* drf-yasg (Swagger documentation)
* SQLite / PostgreSQL (configurable)
* Session-based authentication

---

## 📌 Features

### 👤 Volunteer

* View profile
* Update profile (name, bio, image)
* Browse opportunities feed
* Apply for opportunities
* View application history (latest first)

### 🏢 Organizer

* View profile
* Update profile (name, bio, image)
* Create opportunities
* View received applications
* Update application status (accept/reject)
* View full application history (latest first)

---

## 🔐 Security Measures

* Role-based endpoint restriction
* Ownership validation (organizers cannot edit other organizers’ data)
* Duplicate application prevention
* Safe object fetching (no 500 crashes)
* Ordered history by latest submission
* Unique constraints where required

---

## 📂 Project Structure

```
volunteer_platform/
│
├── authentication/
├── users/
├── organizers/
├── manage.py
└── requirements.txt
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Nilayjoshi/volunteer_platform.git
cd volunteer_platform
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5️⃣ Run server

```bash
python manage.py runserver
```

---

## 📖 API Documentation

Swagger UI available at:

```
/swagger/
/redoc/
```

---

## 🔗 Main Endpoints

### Volunteer

```
GET    /users/profile/
PUT    /users/profile/
GET    /users/feed/
POST   /users/{id}/apply/
GET    /users/history/
GET    /users/{id}/opportunity_detail/
GET    /users/{id}/organization_detail/
PATCH  /users/{id}/withdraw_application/
POST   /users/{id}/add_feedback/
DELETE /users/delete_feedback/{id}/
```

### Organizer

```
POST   /organizers/create_opportunity/
PUT    /organizers/{id}/update_opportunity/
GET    /organizers/my_opportunities/
GET    /organizers/pending_applications/
PUT    /organizers/{id}/update_application/
GET    /organizers/profile/
PUT    /organizers/profile/
GET    /organizers/history/
GET    /organizers/{id}/view-volunteer/
GET    /organizers/{id}/opportunity_detail/
GET    /organizers/previous_opportunities/
PATCH  /organizers/{id}/deactivate_opportunity/
```

---

## 🗄️ Core Models

* AuthUser
* VolunteerProfile
* OrganizationProfile
* Opportunity
* Application

---

## 📌 Application Flow

1. Organizer creates opportunity
2. Volunteer applies
3. Organizer reviews application
4. Organizer updates status (accepted/rejected)
5. Both can track history

---

## 🛡️ Future Improvements

* JWT Authentication
* Pagination for feed & history
* Search & filtering
* Email notifications
* Admin dashboard
* Deployment setup (Docker / Render)

---
