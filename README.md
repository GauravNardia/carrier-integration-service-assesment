# Carrier Integration Service (UPS)

A backend service that integrates with shipping carriers to fetch shipping rate quotes and return them in a normalized format.

This project demonstrates how to design a **clean, extensible carrier-integration architecture** using TypeScript, with proper separation of concerns, error handling, and test coverage.

Currently supported carrier:
- **UPS**

The architecture is designed to easily support additional carriers (e.g. FedEx, DHL) with minimal changes.

---


## Problem Overview

Shipping platforms often need to query multiple carriers for rate quotes.  
Each carrier has:
- Different authentication mechanisms
- Different request/response formats
- Different error behaviors

This service abstracts those differences behind a common interface and returns **normalized rate quotes** to downstream consumers.

---

## Architecture Overview

The project follows a layered architecture:

–> RateService 
-> CarrierRegistry 
–> Carrie(UPSCarrier) 
–> UPSAuth + UPSClient 
–> External Carrier API (stubbed in tests)

### Key Design Principles

- **Separation of concerns**  
  Business logic, carrier logic, HTTP, and configuration are isolated.

- **Extensibility**  
  Adding a new carrier requires:
  - Implementing the `Carrier` interface
  - Registering it in `CarrierRegistry`

- **Testability**  
  External APIs are fully stubbed; no real credentials or network calls are required.

---


## Environment Variables

No real UPS credentials are required to run or test this project.

For completeness, the following variables are validated at runtime:

```env
UPS_CLIENT_ID=your_client_id
UPS_CLIENT_SECRET=your_client_secret
UPS_AUTH_URL=https://wwwcie.ups.com/security/v1/oauth/token
UPS_BASE_URL=https://wwwcie.ups.com/api
```

##  Running Tests
```
npm test
```


## Test Strategy

- Unit tests
  - HTTP client behavior
  - Authentication handling

- Carrier integration tests
  - UPS request/response normalization
  - Error handling
  - Validation logic

- Integration tests
  - Service orchestration
  - Carrier selection via registry

External carrier APIs are fully stubbed, ensuring fast and reliable test execution.

## Extending the System

To add a new carrier (e.g. FedEx):
 1. Implement the Carrier interface
 2. Add a new carrier module (e.g. fedex/)
3. Register the carrier in CarrierRegistry
4. Reuse RateService without modification