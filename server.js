const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    if (num < 0) return false; // Armstrong numbers are defined only for positive integers
    const digits = Math.abs(num).toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === Math.abs(num);
};

// Function to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
};

// Function to calculate the sum of digits
// Function to calculate the sum of digits
const digitSum = (num) => {
    const isNegative = num < 0;
    const sum = num.toString().replace('-', '').split('').reduce((acc, digit) => acc + Number(digit), 0);
    return isNegative ? -sum : sum; // Return negative sum if the number is negative
};


// API endpoint to classify the number
app.get('/api/classify-number', async (req, res) => {
    const input = req.query.number?.trim(); // Trim whitespace

    // Check for empty input
    if (!input) {
        return res.status(400).json({
            number: "alphabet",
            error: true,
        });
    }

    // Check for valid integer input, not a floating-point number, and not alphanumeric
    if (!/^-?\d+$/.test(input)) {
        return res.status(400).json({
            number: "alphabet",
            error: true,
            message: "Invalid number. Please provide an integer."
        });
    }

    const number = parseFloat(input);

    // Check for reasonable limits
    if (number < -Number.MAX_SAFE_INTEGER || number > Number.MAX_SAFE_INTEGER) {
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
        res.status(200).json({ 
            number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            properties: properties,
            digit_sum: digitSum(number),
            fun_fact: "No fun fact available.",
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
