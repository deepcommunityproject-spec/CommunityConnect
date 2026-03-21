
# 🚀 Volunteer Platform API

A role-based Volunteer Management Platform built with **Django** and **Django REST Framework**.

This platform allows:

* Volunteers to explore opportunities and apply
* Organizers to create opportunities and manage applications
* Public blog publishing
* Email notifications for key actions
* Activity history tracking

---

## 🛠 Tech Stack

* Python 3.11+
* Django
* Django REST Framework
* drf-yasg (Swagger)
* SQLite
* JWT (JSON Web Token) authentication

---

## 📌 Features

### 👤 Volunteer

* View & update profile
* Browse opportunity feed
* Apply / withdraw applications
* View application history
* Add & delete feedback
* Forgot Password (OTP)

---

### 🏢 Organizer

* View & update profile
* Create & manage opportunities
* View applications
* Accept / reject applications
* View application history

---

### ✍️ Blogs

* Organizers can create blogs
* Public access (no login required)
* Cover image support
* Slug-based URLs
* Reading time calculation
* Pagination (blog list)

---

### 📬 Email Notifications (SendGrid)

* Sent on:

  * Registration
  * Application status update
  * Opportunity creation
  * Password Reset (OTP)

---

### 📜 History

* Volunteer: applied opportunities
* Organizer: received applications

---

## 🔐 Security Measures

* Role-based access control
* Ownership validation
* Duplicate application prevention
* Safe object handling

---

## 📂 Project Structure

```
volunteer_platform/
│
├── authentication/
├── users/
├── organizers/
├── blogs/
├── manage.py
└── requirements.txt
```

---

## ⚙️ Installation

```bash
git clone https://github.com/Nilayjoshi/volunteer_platform.git
cd volunteer_platform

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver
```

---

## 📖 API Documentation

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

---

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

### Blogs

```
GET    /blogs/list_blogs/
GET    /blogs/detail/{slug}/
POST   /blogs/create_blog/
PUT    /blogs/{id}/update_blog/
DELETE /blogs/{id}/delete_blog/
GET    /blogs/my_blogs/
```

Pagination:

```
/blogs/list_blogs/?page=2
```

---

## 🗄️ Core Models

* AuthUser
* VolunteerProfile
* OrganizationProfile
* Opportunity
* Application
* Blog

---

## 📌 Application Flow

1. Organizer creates opportunity
2. Volunteer applies
3. Organizer reviews
4. Status updated
5. History tracked

---

## 🛠 Admin Panel

```
/admin/
```

---

## 🚀 Future Improvements

* Search & filtering
* Blog categories / tags
* Comments on blogs

---
