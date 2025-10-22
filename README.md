# Feedback Collector App

A simple web application where users can submit feedback and view all feedback entries on the same page. Built with **Next.js** for the frontend, **Express.js** for the backend, and **MongoDB** for data storage.

---

## Project Overview

- Users can submit feedback via a form (name + message).
- Feedback entries are stored in MongoDB.
- All feedback entries are displayed below the form in real-time.
- Backend exposes APIs to save and fetch feedbacks.

---

## Technologies Used

### Frontend
- **Next.js** (preferred) / React
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Toastify** for notifications

### Backend
- **Node.js** with **Express.js**
- **Mongoose** for MongoDB data modeling
- REST APIs:
  - `POST /api/feedback` → Save new feedback
  - `GET /api/feedback` → Fetch all feedback entries

### Database
- **MongoDB Atlas** or local MongoDB
- Collection: `feedbacks`
- Schema:
```javascript
{
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
}
