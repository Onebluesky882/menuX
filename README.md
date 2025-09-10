# 🧑‍🍳 MenuX – Real-Time Restaurant Management Platform

**MenuX** is a fullstack web application that streamlines restaurant operations and enhances the dine-in experience. It empowers restaurant owners with real-time insights into orders, income, and table status, while giving customers a smooth, mobile-first ordering process via QR code.

---

## 🚀 Live Features

### 👨‍💼 For Restaurant Owners:

- Monitor **live orders**, **table status**, and **total income**
- Manage menus with images, pricing, and availability
- Oversee staff profiles and customer interactions

### 🍽️ For Customers:

- Scan a **QR code at the table** to view and order from the menu
- Place orders directly from their smartphone
- Track the **status of their food** in real-time

---

## 🛠 Tech Stack

| Layer        | Tech Details                                                               |
| ------------ | -------------------------------------------------------------------------- |
| **Frontend** | Vite, React, TypeScript, Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/) |
| **Backend**  | NestJS (Modular architecture with REST + WebSocket APIs)                   |
| **Database** | PostgreSQL (Neon), Drizzle ORM (type-safe SQL queries and migrations)      |
| **Realtime** | WebSocket (NestJS Gateway) for order + table sync                          |
| **Auth**     | Supabase-style role-based access (Owner, Employee, Customer)               |

---

## 🔑 Core Features

- ✅ Real-time **order + table status updates** via WebSocket
- ✅ Dynamic **QR code ordering** from table
- ✅ Menu management with images and price control
- ✅ Order lifecycle: pending → cooking → ready → served
- ✅ Live dashboards for staff to manage tables and orders
- ✅ Role-based access and authentication
- ✅ Scalable and modular backend with **NestJS + Drizzle ORM**

---

## 📁 Project Structure (Simplified)
