import { useState } from 'react'
import PasswordField from './PasswordField'

const handleSubmit = async (e) => {
  e.preventDefault();
  // Handle form submission logic here
  try {
    const response = await fetch('http://localhost:5000/users/${e.target.email.value}', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();
    console.log('Form submission successful:', data);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="login-form">
      <label htmlFor="email">
        Email address
        <input
          id="email"
          name="email"
          type="email"
          placeholder="agent@company.com"
          autoComplete="email"
          required
        />
      </label>

      <PasswordField
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((current) => !current)}
      />

      <div className="form-row">
        <label className="checkbox-label">
          <input type="checkbox" name="remember" />
          Remember me
        </label>
        <a href="/forgot-password">Forgot password?</a>
      </div>

      <button className="primary-button" type="submit" onClick={handleSubmit}>
        Sign in
      </button>
    </form>
  )
}

export default LoginForm
