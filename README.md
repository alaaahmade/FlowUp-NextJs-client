# 🏰 FlowUp Frontend - Sprint Overview

## 📌 Project Description

FlowUp's frontend is built using **Next.js**, providing a fast, scalable, and SEO-friendly interface for users. This sprint focuses on **setting up the project structure, implementing authentication pages, and automating CI/CD** to ensure a smooth development workflow.

---

## 🌟 Sprint Goals

- **Project Initialization:** Set up the Next.js project structure with a scalable layout.
- **Authentication Pages:** Implement login, registration, and password recovery pages.
- **CI/CD:** Automate linting, testing, and deployment.

---

## 📌 Key Issues in This Sprint

- [ ] **Create Frontend Skeleton** (Initialize project, folder structure, routing).
- [ ] **Implement Authentication Pages** (Login, Register, Forget Password).
- [ ] **Set Up CI/CD for Frontend** (GitHub Actions, Vercel deployment).

---

## 🌜 Frontend Routes

📌 **Base URL:** `https://FlowUp.com`  
📌 **Authentication Pages:**  
| Route | Description | Protected |
|----------------------|----------------------------------|------------|
| `/login` | User login page | ✅ Yes |
| `/register` | User registration page | ✅ Yes |
| `/forgot-password` | Password reset request page | ✅ Yes |
| `/dashboard` | User dashboard | ✅ Yes |
| `/profile` | User profile settings | ✅ Yes |

---

## ⚙️ Tech Stack

- **Next.js** (React framework for server-rendered apps)
- **MUI Styled Components** (Styling)
- **React Query** (State management)
- **Axios** (API calls)
- **GitHub Actions** (CI/CD automation)

---

## 🛠️ How to Run the Development Environment

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-repo/FlowUp-frontend.git
cd FlowUp-frontend
```

### **2️⃣ Set Up Environment Variables**

Create a `.env.local` file and configure API settings:

```ini
NEXT_PUBLIC_API_URL=https://api.FlowUp.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_APPLE_CLIENT_ID=your-apple-client-id
```

### **3️⃣ Install Dependencies**

```bash
npm install
```

### **4️⃣ Start the Development Server**

```bash
npm run dev
```

---

## 🚀 Expected Outcome

By the end of this sprint, the frontend will have:  
👉 **A structured Next.js project setup**  
👉 **A working authentication system**  
👉 **Automated CI/CD for deployment & testing**  
👉 **A scalable and optimized frontend ready for production**

Stay tuned for further updates! 💡🔥

### Deploy in one click

1. Fork this repo.
1. In your new repo, click the button below.

<a href="https://render.com/deploy" referrerpolicy="no-referrer-when-downgrade" rel="nofollow">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" />
</a>

Note: The button uses the `render.yaml` file in this repo to deploy your app. For more information about `render.yaml`, see [Render's guide](https://docs.render.com/infrastructure-as-code).

