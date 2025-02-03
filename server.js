const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle CORS
app.use(cors());

// Function to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is a perfect number
const isPerfect = (num) => {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    if (num < 0) return false; // Armstrong numbers are defined only for positive integers
    const digits = Math.abs(num).toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === Math.abs(num);
};

// Function to calculate the sum of digits with sign retention
const digitSum = (num) => {
    const sum = Math.abs(num)
        .toString()
        .split('')
        .reduce((acc, digit) => acc + Number(digit), 0);
    return num < 0 ? -sum : sum; // Retain the negative sign if the original number is negative
};

// API endpoint to classify the number
app.get('/api/classify-number', async (req, res) => {
    const number = parseFloat(req.query.number);

    // Check for valid integer input
    if (isNaN(number) || !Number.isInteger(number)) {
        return res.status(400).json({
            number: "alphabet",
            error: true,
        });
    }

    try {
        // Fetching fun fact from Numbers API
        const funFactResponse = await axios.get(`http://numbersapi.com/${number}/math`);
        const funFact = funFactResponse.data;

        // Determine properties
        const properties = [];
        if (isArmstrong(number)) properties.push("armstrong");
        properties.push(number % 2 === 0 ? "even" : "odd");

        // Prepare the response
        const response = {
            number: number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            properties: properties,
            digit_sum: digitSum(number),
            fun_fact: funFact,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
