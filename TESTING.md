# 🧪 Basic Manual Testing Guide

Before committing your code to the main branch or sharing it with the team, please run these basic manual tests to ensure everything works smoothly:

### 1. Backend Testing (Django)
- **Check Server Status**: Run `python manage.py runserver`. Ensure the console has no syntax errors, Tracebacks, or crashes on startup.
- **Test APIs**: If you created or modified an API endpoint, test it using **Postman** or your browser. Ensure it returns the expected data (`200 OK` or `201 Created`).
- **Verify Database**: Check the Django Admin Panel (`http://localhost:8000/admin/`) to confirm records are being saved properly.

### 2. Frontend Testing (React)
- **Check App Status**: Run `npm start`. Ensure there are no compilation errors or excessive warnings in the terminal.
- **Visual Inspection**: Open `http://localhost:3000/` and navigate to your changes. Verify that the UI looks correct and responsive.
- **Functionality Testing**: Click buttons, submit forms, and use the feature you just built.
- **Console Check**: Open your browser's Developer Tools (F12) -> **Console** tab. Ensure there are no red React errors. Check the **Network** tab to verify API calls are succeeding (`200 OK`).

### Expected Results Before Release
- **No Console Errors**: Neither the terminal nor the browser console should contain errors.
- **End-to-End Success**: The frontend correctly communicates with the backend without failing.
- **No Breakages**: Briefly test the main existing features of the site to ensure your new code didn't break them unexpectedly.
