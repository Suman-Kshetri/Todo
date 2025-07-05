# 📦 MERN Stack: Frontend ⇄ Backend Data Transfer Guide

This guide explains how to transfer data between the frontend (React) and backend (Express/Node.js) in a MERN stack app using REST APIs, handling various data types.

---

## 📤 Frontend to Backend

### 1. ✅ Sending JSON Data (POST Request)

**Frontend (React):**

```ts
await fetch('/api/user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', age: 25 }),
});
```

**Backend (Express):**

```ts
app.post('/api/user', (req, res) => {
  const { name, age } = req.body;
  res.json({ success: true });
});
```

---

### 2. ✅ Sending Query Parameters (GET Request)

**Frontend:**

```ts
await fetch('/api/search?keyword=react');
```

**Backend:**

```ts
app.get('/api/search', (req, res) => {
  const keyword = req.query.keyword;
  res.json({ results: [] });
});
```

---

### 3. ✅ Sending URL Parameters

**Frontend:**

```ts
await fetch('/api/user/123');
```

**Backend:**

```ts
app.get('/api/user/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id });
});
```

---

### 4. ✅ Uploading Files (Images, etc.)

**Frontend:**

```ts
const formData = new FormData();
formData.append('image', file);

await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});
```

**Backend:**

```ts
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ filename: req.file.filename });
});
```

---

## 📥 Backend to Frontend

**Backend:**

```ts
app.get('/api/user/:id', (req, res) => {
  const user = { id: req.params.id, name: 'Alice', age: 25 };
  res.json(user);
});
```

**Frontend:**

```ts
const response = await fetch('/api/user/123');
const data = await response.json();
console.log(data); // { id: '123', name: 'Alice', age: 25 }
```

---

## 📄 JSON-Supported Data Types

| Type    | Supported        | Example                   |
| ------- | ---------------- | ------------------------- |
| String  | ✅                | "Hello"                   |
| Number  | ✅                | 42                        |
| Boolean | ✅                | true                      |
| Array   | ✅                | \[1, 2]                   |
| Object  | ✅                | {a: 1}                    |
| Null    | ✅                | null                      |
| Date    | ❌ (use string)   | new Date().toISOString()  |
| File    | ❌ (use FormData) | via `FormData` and multer |

---

## 🔐 Best Practices

* Use `Content-Type: application/json` for JSON data
* Use `FormData` for uploading files
* Sanitize and validate input using tools like Joi or express-validator
* Send proper HTTP status codes (e.g., 200, 400, 500)
* Protect sensitive routes with authentication (e.g., JWT)

---

## 📌 Quick Summary

| Task        | Frontend                | Backend                         |
| ----------- | ----------------------- | ------------------------------- |
| Send JSON   | fetch + JSON.stringify  | req.body                        |
| Upload file | FormData                | multer (req.file)               |
| Query param | /api?val=1              | req.query.val                   |
| URL param   | /api/\:id               | req.params.id                   |
| Get data    | res.json() → res.json() | fetch().then(res => res.json()) |
---


----
| Action             | Frontend Does                    | Backend Does                                        | Notes                            |
| ------------------ | -------------------------------- | --------------------------------------------------- | -------------------------------- |
| Get data           | `axios.get('/something')`        | `app.get('/something', (req, res))` → `res.send()`  | ✅ You ask, backend replies       |
| Send data          | `axios.post('/something', data)` | `app.post('/something', (req, res))` → `res.send()` | ✅ You send, backend replies      |
| Backend sends data | Only *after* frontend requests   | `res.send(data)`                                    | ✅ Backend doesn’t push by itself |

---

