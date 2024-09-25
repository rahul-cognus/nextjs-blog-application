//  User Model (models/User.js)
// The User schema will only define the structure of the user, without any hooks or methods like hashing or comparing passwords.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


// Auth Controller (controllers/authController.js)
// All functionality (password hashing, matching, token generation) will be handled here.

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail');

// Generate JWT token
// const generateToken = (user) => {
//     return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
// };

// // Register new user
// exports.register = async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         // Hash password before saving user
//         const hashedPassword = await bcrypt.hash(password, 12);

//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,  // Save hashed password
//             role,
//         });

//         await user.save();

//         // Generate JWT token for the user
//         const token = generateToken(user);

//         res.status(201).json({ success: true, token });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// // Login user
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Compare the provided password with the hashed password in the DB
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token for the user
//         const token = generateToken(user);

//         res.status(200).json({ success: true, token });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Logout user
// exports.logout = (req, res) => {
//     // Handle session/cookie-based logout if necessary
//     res.status(200).json({ success: true, message: 'Logged out successfully' });
// };

// Forget password
// exports.forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Generate reset token
//         const resetToken = crypto.randomBytes(20).toString('hex');

//         user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//         user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
//         await user.save();

//         const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
//         const message = `You requested a password reset. Please click the following link: ${resetUrl}`;

//         // Send email with reset URL
//         await sendEmail({
//             email: user.email,
//             subject: 'Password Reset',
//             message,
//         });

//         res.status(200).json({ success: true, message: 'Reset password email sent' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// Reset password
exports.resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        const token = generateToken(user);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Authentication Middleware (middleware/authMiddleware.js)
// Middleware to protect routes and restrict access based on roles (admin vs. client)

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes (for authenticated users)
exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Admin only middleware
exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
};

// Auth Routes (routes/authRoutes.js)
// Define the routes for authentication-related operations.

const express = require('express');
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;


// Email Utility (utils/sendEmail.js)
// Utility function for sending emails, e.g., password reset emails.

const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: 'Admin <admin@example.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

// .env
MONGO_URI = mongodb://localhost:27017/blog-app
JWT_SECRET = your_jwt_secret
SMTP_HOST = smtp.mailtrap.io
SMTP_PORT = 2525
SMTP_USER = your_smtp_username
SMTP_PASS = your_smtp_password


If you want to remove all functionality from the schema file and keep it purely for defining the database structure, we can move any password hashing, token generation, and related logic to the controller.Below is the complete backend code where no functionality(like password hashing, token generation, or matching passwords) is implemented in the schema.Everything is handled in the controllers.

1. Folder Structure
bash
Copy code
    / config
    - db.js
    / controllers
    - authController.js
    / middleware
    - authMiddleware.js
    / models
    - User.js
    / routes
    - authRoutes.js
    / utils
    - sendEmail.js
server.js
    .env
2. User Model(models / User.js)
The User schema will only define the structure of the user, without any hooks or methods like hashing or comparing passwords.

    js
Copy code
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
3. Auth Controller(controllers / authController.js)
All functionality(password hashing, matching, token generation) will be handled here.

    js
Copy code
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register new user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Hash password before saving user
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            email,
            password: hashedPassword,  // Save hashed password
            role,
        });

        await user.save();

        // Generate JWT token for the user
        const token = generateToken(user);

        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token for the user
        const token = generateToken(user);

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout user
exports.logout = (req, res) => {
    // Handle session/cookie-based logout if necessary
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// Forget password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
        const message = `You requested a password reset. Please click the following link: ${resetUrl}`;

        // Send email with reset URL
        await sendEmail({
            email: user.email,
            subject: 'Password Reset',
            message,
        });

        res.status(200).json({ success: true, message: 'Reset password email sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        const token = generateToken(user);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
4. Authentication Middleware(middleware / authMiddleware.js)
Middleware to protect routes and restrict access based on roles(admin vs.client).

    js
Copy code
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes (for authenticated users)
exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Admin only middleware
exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
};
5. Auth Routes(routes / authRoutes.js)
Define the routes for authentication - related operations.

    js
Copy code
const express = require('express');
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
6. Email Utility(utils / sendEmail.js)
Utility function for sending emails, e.g., password reset emails.

    js
Copy code
const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {

    // gmail

    // create an email instance
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PW
        }
    });
    // data to be sent to the client
    const data = {
        to: email,
        subject: "Reset Account Password Link",
        html: `
    <h3>Please click the link below to reset your password</h3>
    <p>${process.env.CLIENT_URL}/reset?token=${token}</p>
    `
    };
    // gmail end
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: 'Admin <admin@example.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};
7. Database Connection(config / db.js)
Database connection logic.

    js
Copy code
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;
// 8. Main Server File(server.js)
// Main server setup.


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// 9. Environment Variables (.env)
// Set up environment variables for sensitive information.

MONGO_URI = mongodb://localhost:27017/blog-app
JWT_SECRET = your_jwt_secret
SMTP_HOST = smtp.mailtrap.io
SMTP_PORT = 2525
SMTP_USER = your_smtp_username
SMTP_PASS = your_smtp_password
// Usage
// Register: POST /api/auth/register

// Body: { "name": "John", "email": "john@example.com", "password": "123456", "role": "admin" }
// Login: POST /api/auth/login

// Body: { "email": "john@example.com", "password": "123456" }
// Forgot Password: POST /api/auth/forgot-password

// Body: { "email": "john@example.com" }
// Reset Password: PUT /api/auth/reset-password/:token

// Body: { "password": "newpassword" }
// Logout: POST /api/auth/logout

// This way, all business logic (hashing, comparing, token generation) is moved out of the schema, and the schema only handles the structure. Let me know if you'd like further improvements!