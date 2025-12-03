# CourseMaster - Full-Featured EdTech Platform

## Overview

CourseMaster is a MERN stack-based E-learning platform that allows students to browse, purchase, and consume courses, and allows admins to manage courses, enrollments, and assignments. This project demonstrates a production-ready architecture with role-based access control and scalable design.

---

## Student Side

* ✅ **Login / Register** (Including Google Login)
* ✅ **User data** saved in database with **hashed passwords**
* ✅ **Role system implemented** (Student/Admin)
* ✅ **Public Views**: Home page, All Courses, Course Details
* ✅ **Student Login Features**:

  * Course purchase available
  * **Enrollment system**: Submit transaction ID → Admin approval required
* ✅ **Dashboard**:

  * Total enrolled courses
  * Count of Pending / Approved / Blocked enrollments
* ✅ **Approved Courses**:

  * View course details
  * Watch videos
  * Mark lessons as complete → updates course progress
* ✅ **Assignments**:

  * Show total, pending, and completed counts
  * Submit pending assignment → Admin review → approve → student assignment marked complete

---

## Admin Side

* ✅ **Course Management**: Create / Update / Delete / View details
* ✅ **Enrollment Management**:

  * Approve / Block / Unblock students
  * View enrollment details
  * Approve transactions after checking Transaction ID
* ✅ **Assignment Review**:

  * View submitted assignments from students
  * Approve → updates student assignment status

---

## Student/Admin Requirement Coverage Summary

* **Authentication & Authorization**: ✅ Done
* **Student Features**: Dashboard, progress tracking, purchase, course consumption, assignment submission → ✅ Done
* **Admin Features**: Course CRUD → ✅ Done, Enrollment management → ✅ Done, Assignment review → ✅ Done
* **Database**: MongoDB + Mongoose with relationships → ✅ Done
* **Transaction Logic**: ✅ Done
* **Role-Based Access & Route Protection**: ✅ Done

---

## Technology Stack

* **Frontend**: React.js
* **Backend**: Node.js + Express.js
* **Database**: MongoDB + Mongoose
* **State Management**: Context API
* **Authentication**:bcrypt

---

## How to Run

1. Clone the repository
2. Install dependencies for both frontend and backend (`npm install`)
3. Set up `.env` variables (MongoDB URI, firebase , etc.)
4. Run backend: `npm run dev`
5. Run frontend: `npm start` or `npm run dev` 
6. Open the platform in your browser

---

## Notes

* Role-based routes ensure **students** and **admins** can only access permitted features.
* Admin approvals required for course enrollments and assignment submissions.
* Passwords are hashed using **bcrypt** for security.
