# 🔐 Secure IAM Cloud File Management System

A Secure Identity Access Management (IAM) based cloud file management system with file versioning, backup, and replication using AWS services.

---

## 📌 Project Overview

This project implements a secure cloud-based file management system that allows authenticated users to upload, download, and manage files with version control. The system also supports automatic backup and replication using AWS S3.

The solution demonstrates practical implementation of:

- **Infrastructure as a Service (IaaS)** → AWS EC2
- **Platform as a Service (PaaS)** → Node.js APIs
- **Software as a Service (SaaS)** → Web-based file dashboard

---

## 🏗 System Architecture

The system follows a 3-tier cloud architecture:

### 1️⃣ Presentation Layer
- React (Vite) + TailwindCSS
- JWT-based authentication
- Role-based UI (Admin/User)
- Version dropdown interface

### 2️⃣ Application Layer
- Node.js + Express
- RESTful APIs
- JWT authentication middleware
- Role-based authorization
- AWS SDK integration

### 3️⃣ Data Layer
- MongoDB (File metadata storage)
- AWS S3 (File storage with versioning enabled)
- S3 Replication (Automatic backup bucket)

---

## 🔄 System Workflow

1. User logs in via frontend.
2. Backend verifies credentials and generates JWT.
3. JWT is stored in localStorage and attached to protected API requests.
4. File upload request is sent to backend.
5. Backend uploads file to AWS S3 using AWS SDK.
6. S3 automatically:
   - Stores version (if file already exists)
   - Replicates object to backup bucket
7. File metadata (filename, S3 key, uploadedBy, timestamps) is stored in MongoDB.
8. Files and versions are displayed in dashboard.

---

## ☁️ AWS Services Used

- **Amazon EC2** – Application hosting (Backend + Frontend)
- **Amazon S3** – Primary file storage
- **S3 Versioning** – Multiple file versions (V1, V2, V3…)
- **S3 Replication** – Automatic backup to secondary bucket

---

## 📂 File Storage Strategy

Files are stored in S3 using a structured key format:

userId/filename.ext


### Example:
699584e517e8bf4151b21148/image-3.png


### Why this structure?

- Logical separation of user files
- Prevents filename conflicts
- Ensures secure multi-user storage
- Easy identification of file ownership

Metadata stored in MongoDB includes:

- filename
- s3Key
- uploadedBy
- createdAt
- updatedAt

---

## 🔐 Identity & Access Management (IAM)

### Authentication

- User Signup
- User Login
- JWT token generation
- Protected routes
- Change password functionality

### Authorization (Role-Based Access Control)

- **User Role**
  - Can view and manage only their own files

- **Admin Role**
  - Can view all uploaded files
  - Sees “Uploaded By” column
  - Has full visibility over system data

Authorization is enforced using middleware that verifies JWT and checks user roles.

---

## 🔄 File Versioning

- S3 Versioning enabled on bucket
- Each upload of same file creates new version
- Versions displayed as:
  - V1
  - V2
  - V3 (Latest)
- Users can download specific versions using VersionId

---

## 💾 Backup & Replication

- S3 native replication configured
- Primary bucket → Secondary backup bucket
- Ensures:
  - High availability
  - Disaster recovery
  - Data redundancy

Replication happens automatically at AWS level.

---

## 🚀 Features Implemented

- File upload (multipart/form-data)
- Download latest version
- Download specific version
- File deletion
- Version dropdown UI
- Upload progress bar
- Toast notifications
- Profile dropdown
- Change password modal
- Admin badge
- Role-based UI rendering
- EC2 deployment

---

## 🧪 Testing

- API endpoints tested via Postman
- Authentication validation tested
- Versioning tested by uploading same file multiple times
- Replication verified in secondary bucket
- Role-based access tested for Admin/User
- Deployment verified using EC2 Public DNS

---

## 🖥 Deployment

- Backend running on AWS EC2 (Port 8000)
- Frontend built using Vite
- Express serving frontend build
- Accessible via EC2 public IP

> Note: HTTPS not configured due to AWS Academy temporary lab environment (Public DNS changes after lab shutdown).

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- AWS SDK (S3)
- JWT Authentication

---

## 📁 Project Structure

Ec2-S3-cloudLab-Project/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx
│
└── README.md


---

## 🎯 Academic Objectives Achieved

✔ Secure IAM implementation  
✔ Cloud storage with versioning  
✔ Backup & replication  
✔ Role-based access control  
✔ Web-based interface  
✔ Deployment on EC2  

---

## 🔮 Future Improvements

- HTTPS with Nginx + SSL
- Multi-factor authentication (MFA)
- Audit logging system
- Admin user management panel
- Storage usage analytics
- Elastic IP for persistent deployment

---

## 👨‍💻 Author

Gurkirat Singh 
Cloud Computing Project  
AWS Academy