# HealthFirst

## Key Features

### Core Functionalities:
1. **Multithreading for Concurrent Processing**: Efficiently handle incoming appointments using multithreading for concurrent processing.

2. **Patient History Tracking**:
   - Track patient medical history based on:
     - Previous medical records.
     - Test reports.
     - Image scanning and data extraction.
     - Medical prescriptions.

3. **Video Consultation**:
   - Enable seamless video consultations between patients and doctors.

4. **Appointment Scheduling**:
   - Book appointments based on available slots.

5. **Pre-Consultation Services**:
   - Provide pre-consultation support for specific diseases, including:
     - Diet recommendations.
     - Medication guidance.

6. **Routine Health Check-ups**:
   - Recommend routine health tests every three months.

---

## Post-Login Features

1. **Health Chatbot**:
   - Prompt-based chatbot for health assistance using Django Channels.

2. **Payment Gateway Integration**:
   - Facilitate payment during appointment scheduling:
     - Includes a fixed fee of ₹200 (service charge).
     - Doctor’s fees are added separately.
     - Service fee is credited to our account; doctor’s fee is credited to the doctor.

3. **Appointment Notifications**:
   - Notify users about upcoming appointments at:
     - 1 hour before.
     - 30 minutes before.
     - 15 minutes before.

4. **Post-Appointment Actions**:
   - Prescription upload by the doctor.
   - Recommendations for tests, if needed.
   - Chat functionality for patients to ask follow-up questions.

5. **Prescription Delivery**:
   - Deliver prescriptions to patients post-consultation.

6. **Test Result Upload and Feedback**:
   - Patients can upload test results.
   - Feedback and online follow-up options are available.

---

## 

---

## Additional Details

1. **Success Notifications**:
   - Display a success message if the appointment booking is successful.

2. **Doctor Filtering**:

- Filter doctors based on:
  - Ratings.
  - Experience.
  - Proximity to the patient’s location.

---

