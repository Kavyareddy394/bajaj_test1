const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Your personal details - UPDATE THESE
const USER_DETAILS = {
    full_name: "john_doe", // Replace with your actual name in lowercase
    birth_date: "17091999", // Replace with your birth date (ddmmyyyy)
    email: "john@xyz.com", // Replace with your email
    roll_number: "ABCD123" // Replace with your college roll number
};

// Helper function to check if a string is numeric
const isNumeric = (str) => {
    return !isNaN(str) && !isNaN(parseFloat(str));
};

// Helper function to check if a string is alphabetic
const isAlphabetic = (str) => {
    return /^[a-zA-Z]+$/.test(str);
};

// Helper function to check if a string contains special characters
const isSpecialCharacter = (str) => {
    return !/^[a-zA-Z0-9]+$/.test(str);
};

// Helper function to create alternating caps concatenation
const createAlternatingCapsConcat = (alphabets) => {
    // Extract all characters from alphabets and flatten
    const allChars = alphabets.join('').split('');
    
    // Reverse the array
    const reversed = allChars.reverse();
    
    // Apply alternating caps (start with lowercase)
    const result = reversed.map((char, index) => {
        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
    });
    
    return result.join('');
};

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: 'data' must be an array"
            });
        }

        // Initialize arrays
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;

        // Process each element in the data array
        data.forEach(item => {
            const str = String(item);
            
            if (isNumeric(str)) {
                const num = parseInt(str);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
            } else if (isAlphabetic(str)) {
                alphabets.push(str.toUpperCase());
            } else if (isSpecialCharacter(str)) {
                specialCharacters.push(str);
            }
        });

        // Create user_id
        const user_id = `${USER_DETAILS.full_name}_${USER_DETAILS.birth_date}`;

        // Create concatenation string with alternating caps
        const concatString = createAlternatingCapsConcat(alphabets);

        // Prepare response
        const response = {
            is_success: true,
            user_id: user_id,
            email: USER_DETAILS.email,
            roll_number: USER_DETAILS.roll_number,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(), // Return sum as string
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

// GET /bfhl endpoint (optional, for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: "BFHL API is running",
        endpoints: {
            POST: "/bfhl - Main processing endpoint",
            GET: "/bfhl - Operation code endpoint"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        message: "Something went wrong!"
    });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
