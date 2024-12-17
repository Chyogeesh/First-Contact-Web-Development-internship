// Frontend Code for User Signup Form
import wixUsers from 'wix-users';
import wixWindow from 'wix-window';
import wixData from 'wix-data';

$w.onReady(function () {
    // Handle form submission
    $w("#signupButton").onClick(async () => {
        const email = $w("#emailInput").value;
        const password = $w("#passwordInput").value;
        const username = $w("#usernameInput").value;
        
        // Client-side validation for required fields
        if (!email || !password || !username) {
            wixWindow.openLightbox("Error", { message: "All fields are required." });
            return;
        }

        if (!isValidEmail(email)) {
            wixWindow.openLightbox("Error", { message: "Please enter a valid email address." });
            return;
        }

        // Submit to backend for further validation and account creation
        try {
            const user = await createUser(email, password, username);
            wixWindow.openLightbox("Success", { message: "Registration successful! Please check your email for verification." });
        } catch (error) {
            wixWindow.openLightbox("Error", { message: error.message });
        }
    });
});

// Simple email validation function
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

// Call backend function to create user
async function createUser(email, password, username) {
    return await wixUsers.register(email, password, { contactInfo: { "username": username } });
}
