const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    const digits = num.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === num;
};

// Function to classify the number
const classifyNumber = async (number) => {
    const isArmstrongNum = isArmstrong(number);
    const isOdd = number % 2 !== 0;
    const properties = [];

    if (isArmstrongNum) properties.push('armstrong');
    if (isOdd) properties.push('odd');
    else properties.push('even');

    const digitSum = number
        .toString()
        .split('')
        .reduce((acc, digit) => acc + Number(digit), 0);

    // Fetching fun fact from Numbers API
    let funFact = '';
    try {
        const response = await axios.get(`http://numbersapi.com/${number}?json`);
        funFact = response.data.text;
    } catch (error) {
        funFact = 'No fun fact available.';
    }

    return {
        number,
        is_prime: false, 
        is_perfect: false, 
        properties,
        digit_sum: digitSum,
        fun_fact: funFact,
    };
};

// API endpoints
app.get('/', (req, res) => {
    res.send('Welcome to my Number Classifier API service! 🚀 - HNG Task 1');
});

app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;

    // Validate input
    const parsedNumber = parseInt(number);
    if (isNaN(parsedNumber) || !Number.isInteger(parsedNumber)) {
        return res.status(400).json({ number: number, error: true });
    }

    // Classify the number
    const result = await classifyNumber(parsedNumber);
    res.status(200).json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
