# 🕰️ Chronos — Haute Horlogerie E-Commerce Platform

> A production-grade **three-tier web application** migrated from a single on-premises VM to a fully scalable, secure **Microsoft Azure** infrastructure.

![Azure](https://img.shields.io/badge/Cloud-Microsoft%20Azure-0078D4?style=flat&logo=microsoftazure)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?style=flat&logo=docker)
![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=flat&logo=nodedotjs)
![SQL Server](https://img.shields.io/badge/Database-SQL%20Server%202022-CC2927?style=flat&logo=microsoftsqlserver)

**🌐 Live:** http://4.155.107.206

---

## 📌 Project Overview

**Chronos** is a luxury watch e-commerce platform built as a real-world **cloud migration** project — moving a legacy monolithic application from a single on-premises VM into a modern, secure, three-tier architecture on **Microsoft Azure**.

The application is fully containerized with Docker for local development and deployed to Azure App Service in production, with the database isolated behind a Private Endpoint inside a Virtual Network.

---

## 🏗️ Azure Architecture

![Architecture Diagram](./azure_3tier_architecture.svg)
```
Internet
    ↓
Application Gateway WAF v2 (4.155.107.206)
    ├── / → Frontend App Service (wa-frontend-ecom)
    └── /api/* → Backend App Service (wa-backend-ecom)
                        ↓
            Azure SQL Server (Private Endpoint)
                  marcy.database.windows.net
```

| Component | Azure Resource | Subnet |
|-----------|---------------|--------|
| Traffic Entry | Application Gateway WAF v2 | `snet-agw` |
| Frontend | App Service `wa-frontend-ecom` | `snet-frontend` |
| Backend | App Service `wa-backend-ecom` | `snet-backend` |
| Database | Azure SQL — Private Endpoint | `snet-privateendpoints` |
| Monitoring | Azure Monitor + Log Analytics + App Insights | — |
| Security | NSG per subnet | All subnets |

**VNet:** `vnet-prod-west` — Region: `westus2` — Address space: `10.0.0.0/16`

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| Frontend | React 18 + TypeScript | Nginx, Chronos luxury dark theme |
| Backend | Node.js + Express + TypeScript | REST API, JWT authentication |
| Database | Microsoft SQL Server 2022 | Azure SQL via Private Endpoint |
| Containers | Docker + Docker Compose | Multi-stage builds, health checks |
| Cloud | Microsoft Azure | App Service, VNet, NSG, Private DNS, App Gateway WAF v2 |
| Monitoring | Azure Monitor + Log Analytics + App Insights | Alerts, diagnostics |

---

## ✅ Completed

### 🐳 Local Environment
- [x] SQL Server 2022 container with persistent volume
- [x] Node.js backend connected to SQL Server
- [x] `ecommercedb` database initialized with seed data (Chronos watch catalog)
- [x] React frontend fully built — Chronos luxury dark theme
- [x] All pages: `Home`, `Products`, `ProductDetail`, `Cart`, `Orders`, `Login`, `Register`, `Profile`
- [x] Docker Compose orchestration with health checks and dependency ordering

### ☁️ Azure Infrastructure
- [x] Resource Group: `rg-ecommerce-prod`
- [x] Virtual Network: `vnet-prod-west` (`10.0.0.0/16`, westus2)
- [x] Subnets: `snet-agw`, `snet-frontend`, `snet-backend`, `snet-privateendpoints`, `snet-data`
- [x] NSG `nsg-agw-west` — allows HTTP/HTTPS + GatewayManager traffic only
- [x] NSG `nsg-apps-west` — denies direct internet access to App Services
- [x] NSG `nsg-db-west` — allows port 1433 from backend subnet only
- [x] Azure SQL Server (`marcy`) — public access disabled
- [x] Private Endpoint + Private DNS Zone (`privatelink.database.windows.net`)
- [x] App Service Plans + Web Apps: `wa-frontend-ecom`, `wa-backend-ecom` (westus2, B2)
- [x] VNet Integration — `wa-backend-ecom` → `snet-backend`
- [x] VNet Integration — `wa-frontend-ecom` → `snet-frontend`
- [x] Backend environment variables configured (SQL connection string, JWT secret)
- [x] Frontend deployed to `wa-frontend-ecom`
- [x] Backend deployed to `wa-backend-ecom`
- [x] Application Gateway WAF v2 created and configured
- [x] AGW routing: `/api/*` → Backend, `/*` → Frontend
- [x] Health probes configured for both backend pools
- [x] Log Analytics Workspace + Application Insights enabled
- [x] Alert rules: 5xx errors, response latency, SQL DTU
- [x] End-to-end smoke test via public IP ✅

> ⚠️ **Note:** The Application Gateway subnet (`snet-agw`) does not use a restrictive NSG by design — Azure requires ports 65200–65535 open for AGW management traffic, and HTTP/HTTPS must be reachable from the internet as this is the sole public entry point.

---

## 🔐 Security Posture

| Control | Implementation |
|---------|---------------|
| No public app access | `publicNetworkAccess=Disabled` on both Web Apps and SQL Server |
| Single entry point | Only Application Gateway WAF v2 is publicly exposed |
| Inbound path | Internet → AGW → Private Endpoint → App Service |
| Backend → DB | VNet Integration → Private Endpoint → SQL (`snet-privateendpoints`) |
| DNS resolution | Private DNS Zone overrides public DNS for SQL inside VNet |
| Port control | NSG on `snet-data` allows TCP 1433 from `10.0.2.0/24` only |
| WAF | Application Gateway WAF v2 in Detection mode |

---

## 🚀 Run Locally

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) *(for cloud steps)*

### Quickstart
```bash
# 1. Clone
git clone https://github.com/turkanismayilzad/Devops-Project1.git
cd Devops-Project1

# 2. Start all containers
docker compose up --build -d

# 3. First time only — create the database
docker exec -it ecom-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P "YourStrong@Passw0rd" -No \
  -Q "CREATE DATABASE ecommercedb"

# 4. Restart backend so it initializes tables
docker compose restart backend

# 5. Verify
docker compose ps
curl http://localhost:3001/health
```

| URL | Description |
|-----|-------------|
| http://localhost | Chronos frontend |
| http://localhost:3001 | Backend API |
| http://localhost:3001/api/products | Products endpoint |

### Docker Services

| Service | Image | Port |
|---------|-------|------|
| `sqlserver` | `mcr.microsoft.com/mssql/server:2022-latest` | 1433 |
| `backend` | Custom Node.js build | 3001 |
| `frontend` | Custom React + Nginx build | 80 |

---

## 📁 Project Structure
```
Devops-Project1/
├── ecommerce-app-frontend/
│   ├── src/
│   │   ├── pages/          # Home, Products, ProductDetail, Cart, Orders, Login, Register, Profile
│   │   ├── components/     # Header, ProtectedRoute
│   │   ├── store/          # Zustand — auth & cart state
│   │   ├── services/       # Axios API client
│   │   └── types/          # TypeScript interfaces
│   ├── Dockerfile          # Multi-stage: Node build → Nginx serve
│   └── nginx.conf
├── ecommerce-app-backend/
│   ├── src/                # Express routes, controllers, middleware
│   ├── healthcheck.js
│   └── Dockerfile
├── docker-compose.yml
├── azure_3tier_architecture.svg
└── README.md
```

---

## 🔧 Azure Resource Reference

| Resource | Name | Region |
|----------|------|--------|
| Resource Group | `rg-ecommerce-prod` | westus2 |
| Virtual Network | `vnet-prod-west` | westus2 |
| SQL Server | `marcy.database.windows.net` | westus2 |
| SQL Database | `ecommercedb` | westus2 |
| Frontend App | `wa-frontend-ecom` | westus2 |
| Backend App | `wa-backend-ecom` | westus2 |
| App Gateway | `agw-ecommerce` | westus2 |
| Public IP | `pip-agw` — `4.155.107.206` | westus2 |
| Log Analytics | `law-ecommerce` | westus2 |
| App Insights | `ai-ecommerce` | westus2 |
| NSG — Gateway | `nsg-agw-west` | westus2 |
| NSG — Apps | `nsg-apps-west` | westus2 |
| NSG — Database | `nsg-db-west` | westus2 |

> ⚠️ Run `az login` before executing any Azure CLI commands.
