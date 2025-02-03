# Classify Number API

This API classifies a number based on its mathematical properties and provides a fun fact about it using the Numbers API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Example Request](#example-request)


## Features

- Classifies numbers as Armstrong, odd, or even.
- Calculates the sum of the digits of the number.
- Fetches a fun fact about the number from the Numbers API.

## Technologies Used

- Node.js
- Express.js
- Axios
- CORS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/classify-number-api.git
   cd classify-number-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will run on `http://localhost:3000`.

## Usage

To classify a number, make a GET request to the `/api/classify-number` endpoint with a query parameter `number`.

## API Endpoints

### `GET /api/classify-number`

**Query Parameters:**
- `number`: The number to classify (integer).

**Response:**
- Returns a JSON object with the classification of the number, properties, digit sum, and a fun fact.

## Example Request

Using Postman or any HTTP client, you can make a request like this:

```
GET http://localhost:3000/api/classify-number?number=371
```

### Example Response

```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is the sum of the cubes of its digits."
}
```

