# Bajaj Test1 REST API - Complete Project Overview

## Project Information

* **Developer:** Kavya Ramatatagari
* **Email:** [kavya.22bce9753@vitapstudent.ac.in](mailto:kavya.22bce9753@vitapstudent.ac.in)
* **Roll Number:** 22BCE9753
* **Birth Date:** 03/08/2005

## Live API Endpoint

Base URL: https://bajaj-test1-n75c3138w-kavya-ramatatagaris-projects.vercel.app/

Main Endpoint: /bfhl

GET → Returns operation code.

POST → Main processing endpoint.

Example full endpoint:
https://bajaj-test1-n75c3138w-kavya-ramatatagaris-projects.vercel.app/bfhl

## Project Description

A REST API that processes arrays of mixed data types and performs intelligent categorization and mathematical operations. The API separates numbers, alphabets, and special characters while performing additional computations like sum calculation and string manipulation.

## Core Features

* **Number Separation:** Categorizes numbers into odd and even arrays.
* **Alphabet Processing:** Extracts alphabetic characters and converts them to uppercase.
* **Special Character Detection:** Identifies non-alphanumeric characters.
* **Mathematical Operations:** Calculates sum of all numeric values.
* **String Manipulation:** Creates alternating-case concatenation in reverse order.
* **Input Validation:** Robust error handling and validation.
* **JSON Response:** All responses formatted as proper JSON.

## Technical Specifications

* **Endpoint:** `/bfhl`
* **HTTP Method:** `POST`
* **Content-Type:** `application/json`
* **Success Status Code:** `200`
* **CORS:** Enabled for cross-origin requests

### Request Schema

```json
{
  "data": ["array", "of", "mixed", "elements"]
}
```

### Response Schema

```json
{
  "is_success": boolean,
  "user_id": "kavya_ramatatagari_03082005",
  "email": "kavya.22bce9753@vitapstudent.ac.in",
  "roll_number": "22BCE9753",
  "odd_numbers": ["array of odd numbers as strings"],
  "even_numbers": ["array of even numbers as strings"],
  "alphabets": ["array of uppercase alphabets"],
  "special_characters": ["array of special characters"],
  "sum": "sum of all numbers as string",
  "concat_string": "processed alphabet concatenation"
}
```

## Response Fields Explanation

* `is_success` — Operation status indicator (boolean).
* `user_id` — Format: `{full_name_ddmmyyyy}` (full name in lowercase).
* `email` — Developer email address.
* `roll_number` — College roll number.
* `odd_numbers` — Array of odd numbers as strings.
* `even_numbers` — Array of even numbers as strings.
* `alphabets` — Uppercase alphabetic strings.
* `special_characters` — Non-alphanumeric characters.
* `sum` — Total of numeric values as a string.
* `concat_string` — Processed alphabets concatenation (reverse order with alternating case).

## Algorithm Logic

### Data Processing Pipeline

1. **Input Validation:** Verifies `data` exists and is a valid array.
2. **Element Classification:**

   * **Numbers:** Strings that represent integers are classified as odd or even and kept as strings in the response.
   * **Alphabets:** Strings containing alphabetic characters are normalized to uppercase and included in `alphabets` array.
   * **Special Characters:** Non-alphanumeric characters are recorded in `special_characters` array.
3. **Mathematical Operations:** Compute the sum of all numeric values found in the input and return the sum as a string.
4. **String Operations:** Extract alphabetical characters from the input, reverse their order, and apply an alternating-case pattern (starting with lowercase) to create `concat_string`.

### Concatenation Algorithm

* Extract all alphabetic characters from input items (preserve multi-character alphabetic items as single entries in `alphabets`).
* Reverse the order of characters across the concatenation step.
* Apply alternating case pattern across the reversed sequence (lowercase, uppercase, lowercase, ...).

## Test Examples

### Example 1: Mixed Data Types

**Request**

```json
{
  "data": ["a","1","334","4","R","$"]
}
```

**Response**

```json
{
  "is_success": true,
  "user_id": "kavya_ramatatagari_03082005",
  "email": "kavya.22bce9753@vitapstudent.ac.in",
  "roll_number": "22BCE9753",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "rA"
}
```

### Example 2: Numbers with Special Characters

**Request**

```json
{
  "data": ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
}
```

**Response**

```json
{
  "is_success": true,
  "user_id": "kavya_ramatatagari_03082005",
  "email": "kavya.22bce9753@vitapstudent.ac.in",
  "roll_number": "22BCE9753",
  "odd_numbers": ["5"],
  "even_numbers": ["2","4","92"],
  "alphabets": ["A","Y","B"],
  "special_characters": ["&","-","*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

### Example 3: Alphabets Only

**Request**

```json
{
  "data": ["A","ABcD","DOE"]
}
```

**Response**

```json
{
  "is_success": true,
  "user_id": "kavya_ramatatagari_03082005",
  "email": "kavya.22bce9753@vitapstudent.ac.in",
  "roll_number": "22BCE9753",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A","ABCD","DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
```

## Technology Stack

* **Backend Framework:** Node.js with Express.js
* **CORS:** Enabled
* **Hosting Platform:** Vercel
* **Version Control:** GitHub
* **CI/CD:** Automatic deployment from GitHub

## Local Development Setup

### Prerequisites

* Node.js (v14 or higher)
* npm

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/Kavyareddy394/bajaj_test1.git
cd bajaj_test1

# Install dependencies
npm install

# Start local development server
node index.js
```

### Local Testing

```bash
# Test the endpoint locally
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'

# Run test suite
node test.js
```

## Testing Instructions

### Using cURL

```bash
curl -X POST https://bajaj-test1-n75c3138w-kavya-ramatatagaris-projects.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

### Using Postman

* **Method:** POST
* **URL:** `https://bajaj-test1-n75c3138w-kavya-ramatatagaris-projects.vercel.app/bfhl`
* **Headers:** `Content-Type: application/json`
* **Body:** `{ "data": ["a","1","334","4","R","$"] }`

## Project Structure

```
bajaj_test1/
├── index.js          # Main API server file
├── package.json      # Project dependencies
├── test.js           # Testing script
├── vercel.json       # Vercel deployment configuration
└── README.md         # Project documentation
```

## Security Features

* Input validation and sanitization
* Graceful error handling for malformed requests
* CORS configured for cross-origin requests
* Exception handling for robustness

## Deployment Information

* **Platform:** Vercel
* **Deployment Type:** Automatic CI/CD from GitHub
* **Environment:** Production-ready (no environment variables required)

## Version History

* **v1.0.0:** Initial API implementation with all required features. Deployed on Vercel with public access.

## Contact Information

* **Email:** [kavya.22bce9753@vitapstudent.ac.in](mailto:kavya.22bce9753@vitapstudent.ac.in)
* **GitHub Username:** Kavyareddy394
* **Repository:** `bajaj_test1`

## License

This project is open source and available under the MIT License.

---
