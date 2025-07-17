// Authentication Utilities
class AuthService {
    constructor() {
        this.storageKey = 'educraft_user';
        this.tokenKey = 'educraft_token';
        this.currentUser = this.getCurrentUser();
    }

    // Mock user database (in a real app, this would be handled by a backend)
    mockUsers = [
        {
            id: 1,
            email: 'demo@educraft.com',
            password: 'password123',
            name: 'Demo User',
            role: 'instructor',
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=4f46e5&color=fff'
        },
        {
            id: 2,
            email: 'admin@educraft.com',
            password: 'admin123',
            name: 'Admin User',
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=059669&color=fff'
        },
        {
            id: 3,
            email: 'student@educraft.com',
            password: 'student123',
            name: 'Student User',
            role: 'student',
            avatar: 'https://ui-avatars.com/api/?name=Student+User&background=f59e0b&color=fff'
        }
    ];

    // Email validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation
    validatePassword(password) {
        const errors = [];
        
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        
        if (!/[A-Za-z]/.test(password)) {
            errors.push('Password must contain at least one letter');
        }
        
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Login method
    async login(email, password) {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                // Validate inputs
                if (!this.validateEmail(email)) {
                    reject({
                        field: 'email',
                        message: 'Please enter a valid email address'
                    });
                    return;
                }

                if (!password) {
                    reject({
                        field: 'password',
                        message: 'Password is required'
                    });
                    return;
                }

                // Find user in mock database
                const user = this.mockUsers.find(u => 
                    u.email.toLowerCase() === email.toLowerCase() && 
                    u.password === password
                );

                if (user) {
                    // Create session
                    const sessionData = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        avatar: user.avatar,
                        loginTime: new Date().toISOString()
                    };

                    // Generate mock token
                    const token = this.generateToken(user.id);

                    // Store in localStorage
                    localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
                    localStorage.setItem(this.tokenKey, token);

                    this.currentUser = sessionData;

                    resolve({
                        success: true,
                        user: sessionData,
                        token: token
                    });
                } else {
                    reject({
                        field: 'general',
                        message: 'Invalid email or password'
                    });
                }
            }, 1500); // Simulate network delay
        });
    }

    // Logout method
    logout() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.tokenKey);
        this.currentUser = null;
        
        // Redirect to login page
        window.location.href = '/';
    }

    // Get current user
    getCurrentUser() {
        const userData = localStorage.getItem(this.storageKey);
        return userData ? JSON.parse(userData) : null;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null && localStorage.getItem(this.tokenKey) !== null;
    }

    // Generate mock JWT token
    generateToken(userId) {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            sub: userId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        }));
        const signature = btoa('mock-signature-' + userId);
        
        return `${header}.${payload}.${signature}`;
    }

    // Verify token (mock implementation)
    verifyToken() {
        const token = localStorage.getItem(this.tokenKey);
        if (!token) return false;

        try {
            const parts = token.split('.');
            if (parts.length !== 3) return false;

            const payload = JSON.parse(atob(parts[1]));
            const now = Math.floor(Date.now() / 1000);

            return payload.exp > now;
        } catch (error) {
            return false;
        }
    }

    // Social login methods (mock implementations)
    async loginWithGoogle() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockGoogleUser = {
                    id: 999,
                    email: 'google.user@gmail.com',
                    name: 'Google User',
                    role: 'instructor',
                    avatar: 'https://ui-avatars.com/api/?name=Google+User&background=ea4335&color=fff',
                    provider: 'google'
                };

                const token = this.generateToken(mockGoogleUser.id);
                localStorage.setItem(this.storageKey, JSON.stringify(mockGoogleUser));
                localStorage.setItem(this.tokenKey, token);
                this.currentUser = mockGoogleUser;

                resolve({
                    success: true,
                    user: mockGoogleUser,
                    token: token
                });
            }, 1000);
        });
    }

    async loginWithMicrosoft() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockMicrosoftUser = {
                    id: 998,
                    email: 'microsoft.user@outlook.com',
                    name: 'Microsoft User',
                    role: 'instructor',
                    avatar: 'https://ui-avatars.com/api/?name=Microsoft+User&background=0078d4&color=fff',
                    provider: 'microsoft'
                };

                const token = this.generateToken(mockMicrosoftUser.id);
                localStorage.setItem(this.storageKey, JSON.stringify(mockMicrosoftUser));
                localStorage.setItem(this.tokenKey, token);
                this.currentUser = mockMicrosoftUser;

                resolve({
                    success: true,
                    user: mockMicrosoftUser,
                    token: token
                });
            }, 1000);
        });
    }

    // Password reset (mock)
    async requestPasswordReset(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.validateEmail(email)) {
                    reject({
                        message: 'Please enter a valid email address'
                    });
                    return;
                }

                const user = this.mockUsers.find(u => 
                    u.email.toLowerCase() === email.toLowerCase()
                );

                if (user) {
                    resolve({
                        success: true,
                        message: 'Password reset link sent to your email'
                    });
                } else {
                    reject({
                        message: 'No account found with this email address'
                    });
                }
            }, 1000);
        });
    }

    // User registration (mock)
    async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const { email, password, name } = userData;

                // Validate email
                if (!this.validateEmail(email)) {
                    reject({
                        field: 'email',
                        message: 'Please enter a valid email address'
                    });
                    return;
                }

                // Check if email exists
                const existingUser = this.mockUsers.find(u => 
                    u.email.toLowerCase() === email.toLowerCase()
                );

                if (existingUser) {
                    reject({
                        field: 'email',
                        message: 'An account with this email already exists'
                    });
                    return;
                }

                // Validate password
                const passwordValidation = this.validatePassword(password);
                if (!passwordValidation.isValid) {
                    reject({
                        field: 'password',
                        message: passwordValidation.errors[0]
                    });
                    return;
                }

                // Create new user
                const newUser = {
                    id: this.mockUsers.length + 1,
                    email: email,
                    password: password,
                    name: name,
                    role: 'instructor',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff`
                };

                this.mockUsers.push(newUser);

                // Auto-login the new user
                const sessionData = {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role,
                    avatar: newUser.avatar,
                    loginTime: new Date().toISOString()
                };

                const token = this.generateToken(newUser.id);
                localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
                localStorage.setItem(this.tokenKey, token);
                this.currentUser = sessionData;

                resolve({
                    success: true,
                    user: sessionData,
                    token: token
                });
            }, 1500);
        });
    }

    // Get demo accounts info
    getDemoAccounts() {
        return [
            {
                email: 'demo@educraft.com',
                password: 'password123',
                role: 'Instructor Demo'
            },
            {
                email: 'admin@educraft.com',
                password: 'admin123',
                role: 'Admin Demo'
            },
            {
                email: 'student@educraft.com',
                password: 'student123',
                role: 'Student Demo'
            }
        ];
    }
}

// Create global auth service instance
window.authService = new AuthService();

// Auto-redirect if already authenticated (except for logout)
if (window.authService.isAuthenticated() && window.authService.verifyToken()) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/index.html') {
        // User is authenticated and on login page, could redirect to dashboard
        console.log('User is already authenticated');
    }
} 