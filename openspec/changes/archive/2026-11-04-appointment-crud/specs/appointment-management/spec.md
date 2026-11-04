# Spec Delta

## Purpose

The appointment-management capability defines the observable web behavior for managing appointments and enforcing the scheduling rules required by the Scenario B application.

## ADDED Requirements

### Requirement: RN-001 client name is required
The system MUST trim `clientName` and reject it when absent or empty after trimming.

#### Scenario: Client name is blank
- **WHEN** a create or update form submits an empty or whitespace-only `clientName`
- **THEN** the system MUST reject the operation as a validation error and MUST NOT save the appointment

### Requirement: RN-002 service is required
The system MUST trim `service` and reject it when absent or empty after trimming.

#### Scenario: Service is blank
- **WHEN** a create or update form submits an empty or whitespace-only `service`
- **THEN** the system MUST reject the operation as a validation error and MUST NOT save the appointment

### Requirement: RN-003 appointment date is required
The system MUST require `appointmentDate` for every appointment creation or update.

#### Scenario: Date is omitted
- **WHEN** a create or update form is submitted without `appointmentDate`
- **THEN** the system MUST reject the operation as a validation error

### Requirement: RN-004 appointment time is required
The system MUST require `appointmentTime` for every appointment creation or update.

#### Scenario: Time is omitted
- **WHEN** a create or update form is submitted without `appointmentTime`
- **THEN** the system MUST reject the operation as a validation error

### Requirement: RN-005 dates are real calendar dates in the required format
The system MUST accept appointment dates only in `YYYY-MM-DD` form when they represent a real Gregorian calendar date.

#### Scenario: Impossible calendar date is submitted
- **WHEN** a create or update form submits `2026-02-30`
- **THEN** the system MUST reject the operation as a validation error

### Requirement: RN-006 times use valid 24-hour notation
The system MUST accept appointment times only in `HH:mm` form from `00:00` through `23:59`.

#### Scenario: Out-of-range time is submitted
- **WHEN** a create or update form submits `24:05` or `12:60`
- **THEN** the system MUST reject the operation as a validation error

### Requirement: RN-007 new and updated appointments cannot be in the past
The system MUST reject appointment creation or updates whose local date and time precede the current time in `America/Sao_Paulo`.

#### Scenario: Past appointment is submitted
- **WHEN** the current local time is `2026-06-01 14:00` and a create or update form submits `2026-06-01 13:59`
- **THEN** the system MUST reject the operation as a validation error

#### Scenario: Historical appointment remains viewable
- **WHEN** an appointment is in the past and a user opens its details or requests its deletion
- **THEN** the system MUST allow the read or delete operation without rewriting its historical date

### Requirement: RN-008 and RN-009 appointment slots cannot conflict
The system MUST prevent appointments from sharing the same date and time and MUST exclude the appointment being edited from its own conflict check.

#### Scenario: Another appointment owns the requested slot
- **WHEN** a create or update form requests a date and time already used by a different appointment
- **THEN** the system MUST reject the operation with an appointment conflict

#### Scenario: Appointment keeps its own slot
- **WHEN** an existing appointment is updated without changing its date and time
- **THEN** the system MUST allow the update without reporting a conflict with itself

### Requirement: RN-010 notes are optional and limited
The system MUST allow notes to be omitted and MUST reject supplied notes longer than 500 characters.

#### Scenario: Notes exceed the limit
- **WHEN** a create or update form submits more than 500 characters in `notes`
- **THEN** the system MUST reject the operation as a validation error

### Requirement: Users can create and list appointments
The web application MUST provide appointment list and create flows at the specified routes.

#### Scenario: User opens the appointment list
- **WHEN** a user requests `GET /` or `GET /appointments`
- **THEN** the system MUST render the appointment list

#### Scenario: User opens the create form
- **WHEN** a user requests `GET /appointments/new`
- **THEN** the system MUST render a form for creating an appointment

#### Scenario: User submits a valid appointment
- **WHEN** a user submits valid appointment fields to `POST /appointments`
- **THEN** the system MUST persist the appointment and return a successful web response

### Requirement: Users can view and update appointments
The web application MUST provide appointment detail and edit flows at the specified routes.

#### Scenario: User opens appointment details
- **WHEN** a user requests `GET /appointments/:id` for an existing appointment
- **THEN** the system MUST render that appointment's details

#### Scenario: User opens the edit form
- **WHEN** a user requests `GET /appointments/:id/edit` for an existing appointment
- **THEN** the system MUST render an edit form populated with that appointment

#### Scenario: User submits an update
- **WHEN** a user submits valid fields to `POST /appointments/:id/update`
- **THEN** the system MUST update the appointment subject to all validation and conflict requirements

### Requirement: Users can permanently delete appointments
The web application MUST permanently delete an appointment when the user requests its delete route; this does not authorize removal or rewriting of experimental baseline evidence.

#### Scenario: Existing appointment is deleted
- **WHEN** a user submits `POST /appointments/:id/delete` for an existing appointment
- **THEN** the system MUST remove that appointment from application storage

### Requirement: Appointment identity and timestamps are stable
The system MUST assign each appointment a UUID and ISO 8601 `createdAt` and `updatedAt` timestamps.

#### Scenario: Appointment is created
- **WHEN** a valid appointment is created
- **THEN** the system MUST assign a UUID and valid ISO 8601 `createdAt` and `updatedAt` timestamps

#### Scenario: Appointment is updated
- **WHEN** an existing appointment is edited
- **THEN** the system MUST preserve its UUID and original `createdAt` and MUST refresh `updatedAt`

### Requirement: Web errors use the defined status mapping
The system MUST report validation, missing appointment, conflict, and unexpected failures using the specified HTTP status codes.

#### Scenario: Validation or missing-record failure occurs
- **WHEN** a request fails validation or references a missing appointment
- **THEN** the system MUST return HTTP 400 for validation or HTTP 404 for the missing appointment

#### Scenario: Conflict or unexpected failure occurs
- **WHEN** a request conflicts with another appointment or fails unexpectedly
- **THEN** the system MUST return HTTP 409 for conflict or HTTP 500 for the unexpected failure
