import PasswordHiddenIcon from './icons/PasswordHiddenIcon'
import PasswordVisibleIcon from './icons/PasswordVisibleIcon'

function PasswordField({
  id = 'password',
  name = 'password',
  label = 'Password',
  placeholder = 'Enter your password',
  autoComplete = 'current-password',
  showPassword,
  onTogglePassword,
}) {
  return (
    <label htmlFor={id}>
      {label}
      <span className="password-field">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={onTogglePassword}
        >
          {showPassword ? <PasswordHiddenIcon /> : <PasswordVisibleIcon />}
        </button>
      </span>
    </label>
  )
}

export default PasswordField
