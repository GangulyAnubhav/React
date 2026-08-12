import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function LoginPanel() {
  const [isRegistering, setIsRegistering] = useState(false)

  return (
    <section className="form-panel" aria-label={isRegistering ? 'Register' : 'Sign in'}>
      <div className="login-card">
        <div className="form-heading">
          <p className="eyebrow">{isRegistering ? 'Create access' : 'Welcome back'}</p>
          <h2>
            {isRegistering ? 'Register with your office email' : 'Sign in to your account'}
          </h2>
          <p>
            {isRegistering
              ? 'Use your company email to request a helpdesk workspace account.'
              : 'Use your work email to access your helpdesk workspace.'}
          </p>
        </div>

        {isRegistering ? <RegisterForm /> : <LoginForm />}

        {isRegistering ? (
          <p className="signup-copy">
            Already have an account?{' '}
            <button type="button" onClick={() => setIsRegistering(false)}>
              Sign in
            </button>
          </p>
        ) : (
          <p className="signup-copy">
            New to Helpdesk?{' '}
            <button type="button" onClick={() => setIsRegistering(true)} >
              Register here
            </button>
          </p>
        )}
      </div>
    </section>
  )
}

export default LoginPanel
