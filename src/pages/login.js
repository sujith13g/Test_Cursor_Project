// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginBtn = document.querySelector('.login-btn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const rememberCheckbox = document.getElementById('remember');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const signupLink = document.getElementById('signupLink');
    const googleBtn = document.querySelector('.google-btn');
    const microsoftBtn = document.querySelector('.microsoft-btn');
    const dashboardModal = document.getElementById('dashboardModal');
    const closeModal = document.getElementById('closeModal');

    // State management
    let isLoading = false;

    // Initialize demo account info
    initializeDemoInfo();

    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    passwordToggle.addEventListener('click', togglePasswordVisibility);
    emailInput.addEventListener('input', clearEmailError);
    passwordInput.addEventListener('input', clearPasswordError);
    forgotPasswordLink.addEventListener('click', handleForgotPassword);
    signupLink.addEventListener('click', handleSignupClick);
    googleBtn.addEventListener('click', handleGoogleLogin);
    microsoftBtn.addEventListener('click', handleMicrosoftLogin);
    closeModal.addEventListener('click', closeModalHandler);
    dashboardModal.addEventListener('click', handleModalBackdropClick);

    // Handle form submission
    async function handleLogin(e) {
        e.preventDefault();
        
        if (isLoading) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;

        // Clear previous errors
        clearAllErrors();

        // Basic client-side validation
        if (!email) {
            showError('email', 'Email is required');
            return;
        }

        if (!password) {
            showError('password', 'Password is required');
            return;
        }

        // Start loading state
        setLoadingState(true);

        try {
            // Attempt login using auth service
            const result = await window.authService.login(email, password);
            
            if (result.success) {
                // Handle remember me
                if (remember) {
                    localStorage.setItem('educraft_remember', 'true');
                } else {
                    localStorage.removeItem('educraft_remember');
                }

                // Show success feedback
                showSuccessMessage('Login successful! Welcome back, ' + result.user.name);
                
                // Show dashboard preview modal
                setTimeout(() => {
                    showDashboardModal();
                }, 1000);
            }
        } catch (error) {
            // Handle login errors
            if (error.field && error.field !== 'general') {
                showError(error.field, error.message);
            } else {
                showError('general', error.message || 'Login failed. Please try again.');
            }
        } finally {
            setLoadingState(false);
        }
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.className = isPassword ? 'fas fa-eye-slash password-toggle' : 'fas fa-eye password-toggle';
    }

    // Handle Google login
    async function handleGoogleLogin() {
        if (isLoading) return;
        
        setLoadingState(true);
        
        try {
            const result = await window.authService.loginWithGoogle();
            if (result.success) {
                showSuccessMessage('Login successful! Welcome, ' + result.user.name);
                setTimeout(() => {
                    showDashboardModal();
                }, 1000);
            }
        } catch (error) {
            showError('general', 'Google login failed. Please try again.');
        } finally {
            setLoadingState(false);
        }
    }

    // Handle Microsoft login
    async function handleMicrosoftLogin() {
        if (isLoading) return;
        
        setLoadingState(true);
        
        try {
            const result = await window.authService.loginWithMicrosoft();
            if (result.success) {
                showSuccessMessage('Login successful! Welcome, ' + result.user.name);
                setTimeout(() => {
                    showDashboardModal();
                }, 1000);
            }
        } catch (error) {
            showError('general', 'Microsoft login failed. Please try again.');
        } finally {
            setLoadingState(false);
        }
    }

    // Handle forgot password
    function handleForgotPassword(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showError('email', 'Please enter your email address first');
            return;
        }

        // Show loading state
        setLoadingState(true);
        
        window.authService.requestPasswordReset(email)
            .then(result => {
                showSuccessMessage(result.message);
            })
            .catch(error => {
                showError('general', error.message || 'Failed to send reset email');
            })
            .finally(() => {
                setLoadingState(false);
            });
    }

    // Handle signup link click
    function handleSignupClick(e) {
        e.preventDefault();
        showNotImplementedMessage('Sign up functionality will be available soon!');
    }

    // Show dashboard modal
    function showDashboardModal() {
        dashboardModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close modal handler
    function closeModalHandler() {
        dashboardModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Simulate redirect to dashboard
        setTimeout(() => {
            showNotImplementedMessage('Dashboard functionality is coming soon! For now, you can explore the login features.');
        }, 300);
    }

    // Handle modal backdrop click
    function handleModalBackdropClick(e) {
        if (e.target === dashboardModal) {
            closeModalHandler();
        }
    }

    // Loading state management
    function setLoadingState(loading) {
        isLoading = loading;
        loginBtn.disabled = loading;
        
        if (loading) {
            loginBtn.classList.add('loading');
            loadingSpinner.style.display = 'inline-block';
        } else {
            loginBtn.classList.remove('loading');
            loadingSpinner.style.display = 'none';
        }
    }

    // Error handling
    function showError(field, message) {
        if (field === 'email') {
            emailError.textContent = message;
            emailInput.style.borderColor = 'var(--error)';
        } else if (field === 'password') {
            passwordError.textContent = message;
            passwordInput.style.borderColor = 'var(--error)';
        } else {
            // General error - show as toast
            showToast(message, 'error');
        }
    }

    function clearEmailError() {
        emailError.textContent = '';
        emailInput.style.borderColor = '';
    }

    function clearPasswordError() {
        passwordError.textContent = '';
        passwordInput.style.borderColor = '';
    }

    function clearAllErrors() {
        clearEmailError();
        clearPasswordError();
    }

    // Success message
    function showSuccessMessage(message) {
        showToast(message, 'success');
    }

    // Not implemented message
    function showNotImplementedMessage(message) {
        showToast(message, 'info');
    }

    // Toast notification system
    function showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add toast styles if not already added
        addToastStyles();

        // Add to DOM
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    function getToastIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    // Add toast styles dynamically
    function addToastStyles() {
        if (document.getElementById('toast-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                padding: var(--spacing-4);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 400px;
                border-left: 4px solid var(--primary-600);
            }

            .toast.show {
                transform: translateX(0);
            }

            .toast-success {
                border-left-color: var(--success);
            }

            .toast-error {
                border-left-color: var(--error);
            }

            .toast-warning {
                border-left-color: var(--warning);
            }

            .toast-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-3);
                color: var(--gray-800);
                font-weight: 500;
            }

            .toast-success .toast-content i {
                color: var(--success);
            }

            .toast-error .toast-content i {
                color: var(--error);
            }

            .toast-warning .toast-content i {
                color: var(--warning);
            }

            .toast-info .toast-content i {
                color: var(--primary-600);
            }

            @media (max-width: 768px) {
                .toast {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize demo account information
    function initializeDemoInfo() {
        // Check if user wants to see demo info
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === 'true') {
            setTimeout(() => {
                showDemoAccountsInfo();
            }, 1000);
        }

        // Add demo info to the page
        addDemoAccountsButton();
    }

    function addDemoAccountsButton() {
        const demoButton = document.createElement('button');
        demoButton.type = 'button';
        demoButton.className = 'demo-accounts-btn';
        demoButton.innerHTML = '<i class="fas fa-info-circle"></i> Demo Accounts';
        demoButton.onclick = showDemoAccountsInfo;

        // Add styles for demo button
        const styles = document.createElement('style');
        styles.textContent = `
            .demo-accounts-btn {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: var(--primary-600);
                color: white;
                border: none;
                border-radius: var(--radius-lg);
                padding: var(--spacing-3) var(--spacing-4);
                font-size: var(--font-size-sm);
                font-weight: 500;
                cursor: pointer;
                box-shadow: var(--shadow-lg);
                transition: all 0.2s ease;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: var(--spacing-2);
            }

            .demo-accounts-btn:hover {
                background: var(--primary-700);
                transform: translateY(-2px);
            }

            .demo-info-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
            }

            .demo-info-content {
                background: white;
                border-radius: var(--radius-xl);
                padding: var(--spacing-6);
                max-width: 500px;
                width: 100%;
                box-shadow: var(--shadow-xl);
            }

            .demo-info-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--spacing-4);
            }

            .demo-info-header h3 {
                color: var(--gray-900);
                font-size: var(--font-size-xl);
                font-weight: 600;
                margin: 0;
            }

            .demo-accounts-list {
                list-style: none;
                padding: 0;
                margin: var(--spacing-4) 0;
            }

            .demo-account-item {
                background: var(--gray-50);
                border-radius: var(--radius-lg);
                padding: var(--spacing-4);
                margin-bottom: var(--spacing-3);
                cursor: pointer;
                transition: all 0.2s ease;
                border: 2px solid transparent;
            }

            .demo-account-item:hover {
                background: var(--primary-50);
                border-color: var(--primary-200);
            }

            .demo-account-item strong {
                color: var(--gray-900);
                display: block;
                margin-bottom: var(--spacing-1);
            }

            .demo-account-item small {
                color: var(--gray-600);
                font-size: var(--font-size-sm);
            }

            .demo-account-item .credentials {
                margin-top: var(--spacing-2);
                font-family: monospace;
                font-size: var(--font-size-sm);
                color: var(--gray-700);
            }
        `;
        document.head.appendChild(styles);

        document.body.appendChild(demoButton);
    }

    function showDemoAccountsInfo() {
        const demoAccounts = window.authService.getDemoAccounts();
        
        const modal = document.createElement('div');
        modal.className = 'demo-info-modal';
        modal.innerHTML = `
            <div class="demo-info-content">
                <div class="demo-info-header">
                    <h3>Demo Accounts</h3>
                    <span class="close" style="cursor: pointer; font-size: 24px; color: var(--gray-400);">&times;</span>
                </div>
                <p style="color: var(--gray-600); margin-bottom: var(--spacing-4);">
                    Click on any account below to auto-fill the login form:
                </p>
                <ul class="demo-accounts-list">
                    ${demoAccounts.map(account => `
                        <li class="demo-account-item" data-email="${account.email}" data-password="${account.password}">
                            <strong>${account.role}</strong>
                            <div class="credentials">
                                Email: ${account.email}<br>
                                Password: ${account.password}
                            </div>
                        </li>
                    `).join('')}
                </ul>
                <p style="color: var(--gray-500); font-size: var(--font-size-sm); margin-top: var(--spacing-4);">
                    <i class="fas fa-info-circle"></i> These are demo accounts for testing purposes only.
                </p>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.close').onclick = () => {
            modal.remove();
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };

        // Handle demo account selection
        modal.querySelectorAll('.demo-account-item').forEach(item => {
            item.onclick = () => {
                const email = item.dataset.email;
                const password = item.dataset.password;
                
                emailInput.value = email;
                passwordInput.value = password;
                
                modal.remove();
                showToast('Demo account credentials filled! Click "Sign In" to login.', 'info');
            };
        });

        document.body.appendChild(modal);
    }

    // Auto-fill remember me if previously selected
    if (localStorage.getItem('educraft_remember') === 'true') {
        rememberCheckbox.checked = true;
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!isLoading) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            if (dashboardModal.classList.contains('show')) {
                closeModalHandler();
            }
            
            // Close demo info modal if open
            const demoModal = document.querySelector('.demo-info-modal');
            if (demoModal) {
                demoModal.remove();
            }
        }
    });

    console.log('✅ EduCraft Login Page Initialized');
    console.log('💡 Tip: Click the "Demo Accounts" button to see available test accounts');
}); 