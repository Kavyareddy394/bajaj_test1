const http = require('http');

// Test data from the examples
const testCases = [
    {
        name: "Example A",
        data: ["a", "1", "334", "4", "R", "$"]
    },
    {
        name: "Example B", 
        data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
    },
    {
        name: "Example C",
        data: ["A", "ABcD", "DOE"]
    }
];

// Function to make HTTP POST request
const makeRequest = (data, callback) => {
    const postData = JSON.stringify({ data });
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/bfhl',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        
        res.on('end', () => {
            try {
                const parsed = JSON.parse(responseData);
                callback(null, parsed, res.statusCode);
            } catch (error) {
                callback(error, null, res.statusCode);
            }
        });
    });

    req.on('error', (error) => {
        callback(error, null, null);
    });

    req.write(postData);
    req.end();
};

// Run tests
console.log('Starting API tests...\n');
console.log('Make sure your server is running on localhost:3000\n');

testCases.forEach((testCase, index) => {
    setTimeout(() => {
        console.log(`\n Testing ${testCase.name}:`);
        console.log(`Input: ${JSON.stringify(testCase.data)}`);
        
        makeRequest(testCase.data, (error, response, statusCode) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            
            console.log(`Status Code: ${statusCode}`);
            console.log(`Response:`);
            console.log(JSON.stringify(response, null, 2));
            
            if (index === testCases.length - 1) {
                console.log('\n All tests completed!');
            }
        });
    }, index * 1000); // Stagger requests by 1 second
});
