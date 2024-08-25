const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

// POST /bfhl endpoint
app.post('/post/bfhl', (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    const response = {
        is_success: true,
        user_id: "aditya_jain_26012003",
        email: "adityajain2021@vitbhopal.ac.in",
        roll_number: "21BCY10190", 
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.json(response);
});

app.get('/get/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
