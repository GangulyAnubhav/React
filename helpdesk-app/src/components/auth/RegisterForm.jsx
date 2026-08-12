import { useState } from 'react'
import PasswordField from './PasswordField'

const handleRegister = async (e) => {
  e.preventDefault();
  // Handle form submission logic here
  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      }),
    });
    const data = await response.json();
    console.log('Form submission successful:', data);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form className="login-form">
      <label htmlFor="register-email">
        Office email address
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          required
        />
      </label>

      <PasswordField
        id="register-password"
        autoComplete="new-password"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((current) => !current)}
      />

      <PasswordField
        id="register-confirm-password"
        name="confirmPassword"
        label="Confirm password"
        placeholder="Re-enter your password"
        autoComplete="new-password"
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword((current) => !current)}
      />

      <p className="form-helper">
        Use your office email and create a password. We will verify your domain
        before activating the account.
      </p>

      <button className="primary-button" type="submit" onClick={handleRegister}>
        Register
      </button>
    </form>
  )
}

export default RegisterForm
