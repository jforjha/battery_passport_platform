# Battery Passport Platform 

This project implements a microservices backend system for managing **battery passports**, including authentication, document handling, and real-time notifications using **Kafka** and **Docker**.

---

## Services Implemented

 
1. **Auth Service**

Handles user login, registration

Issues JWT tokens

Supports role-based access (e.g., admin vs user)

2. **Battery Passport Service**

Handles CRUD operations on battery passport data

Produces Kafka messages for any event (like passport creation)

3. **Document Service**

Users can upload and download battery-related documents (PDFs, reports, etc.)

Stores files in AWS S3 

Metadata stored in MongoDB

4. **Notification Service**

Consumes Kafka events from other services (e.g., new battery passport created)

Logs them or triggers further actions 

---

## API Usage

### Auth Service (`http://localhost:4000/api/auth`)

- `POST /register`  
  ```json
  { "username": "test3", "email": "test3@example.com","password": "test3",  "role": "admin" }

### Battery Passport Service (http://localhost:4001/api/passport)
POST /
Creates passport (admin only). Requires JWT in Authorization header.

json
{
  "batteryId": "BATT-001",
  "manufacturer": "Tesla",
  "capacity": "100kWh",
  "warrantyYears": 5
}

 ### Document Service (http://localhost:4002/api/documents)
POST /upload
Upload a file (form-data with key file). JWT required.

GET /:docId
Retrieve uploaded document by ID. JWT required.

### Notification Service (http://localhost:4003)
Kafka-based, no direct REST API.

Logs messages received on topic battery-passport-events.

### Setup Instructions

**Prerequisites**
Docker & Docker Compose installed

Node.js (for development mode)

Kafka (containerized via Docker)

1. Create .env files for each services
Each service requires a .env file. Example for documentService:

.env

PORT=4002
MONGO_URI=mongodb://mongo:27017/documentService
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_BUCKET_NAME=your-bucket
AWS_REGION=your-region
KAFKA_BROKER=kafka:9092
KAFKA_TOPIC=battery-passport-events

2. Docker Setup
bash
# From the root project directory
docker-compose up --build

 Kafka Topics & Payloads
Topic: battery-passport-events
Producer: batteryPassportService
Consumer: notificationService

Sample Payload
json

{
  "event": "BatteryPassportCreated",
  "timestamp": "2025-07-20T12:00:00Z",
  "data": {
    "batteryId": "BATT-001",
    "manufacturer": "Tesla",
    "createdBy": "admin"
  }
}

 ### Kafka Topics & Payloads
Topic: battery-passport-events
Producer: batteryPassportService
Consumer: notificationService

### Tech Stack
Node.js, Express.js , KafkaJS, MongoDB, AWS S3, Docker, Docker Compose, JWT Authentication

### Directory Structure 
battery_passport_platform/
├── authService/
├── batteryPassportService/
├── documentService/
├── notificationService/
├── docker-compose.yml
└── README.md

