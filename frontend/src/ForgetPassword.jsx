import React, { useState } from 'react';

const ForgetPassword = () => {
    console.log("ForgetPassword component rendered");

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isValidated, setIsValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error on submit
        setSuccessMessage(''); // Reset success message on submit

        try {
            const response = await fetch('/api/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                }),
            });

            if (response.ok) {
                setIsValidated(true);
                setSuccessMessage('Username validated. Proceed with password reset.');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid username.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError(''); // Reset error on submit
        setSuccessMessage(''); // Reset success message on submit

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    newPassword,
                }),
            });

            if (response.ok) {
                setSuccessMessage('Password reset successful.');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: 'auto' }}>
            <h2>Forgot Password</h2>
            {!isValidated ? (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <form onSubmit={handlePasswordReset}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Reset Password
                    </button>
                </form>
            )}
            {error && (
                <div style={{ color: 'red', marginTop: '15px' }}>
                    <strong>{error}</strong>
                </div>
            )}
            {successMessage && (
                <div style={{ color: 'green', marginTop: '15px' }}>
                    <strong>{successMessage}</strong>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;

