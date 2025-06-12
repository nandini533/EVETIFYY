const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT Secret Key
const JWT_SECRET = 'evntify-secret-key-change-in-production';

// Mock user database (in-memory)
const users = [];
const events = [];

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Register new user
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        
        // Create new user (with simplified ID)
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // Not hashed in this simple example
            role: 'user'
        };
        
        users.push(newUser);
        
        // Generate token
        const token = generateToken(newUser);
        
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Validate password (simplified)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Generate token
        const token = generateToken(user);
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Basic events endpoints
app.get('/api/events', (req, res) => {
    res.status(200).json(events);
});

app.post('/api/events', (req, res) => {
    const newEvent = {
        id: Date.now().toString(),
        ...req.body
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock server running on port ${PORT}`);
});