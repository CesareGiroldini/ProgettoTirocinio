export const validateUsername = (username) => {
    if (username.length < 3) return "Username must be at least 3 characters long";
    if (!/^[a-zA-Z0-9]+$/.test(username)) return "Username can only contain letters and numbers";
    return null;
};

export const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
};

export const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword !== password) return "Passwords do not match";
    return null;
};
