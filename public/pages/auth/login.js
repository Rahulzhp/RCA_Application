AUTH.requireGuest();

document.getElementById('sso-btn').addEventListener('click', () => {
  AUTH.toast('SSO login is not configured yet. Contact your administrator.', 'info', 3500);
});

document.getElementById('eye-toggle').addEventListener('click', function togglePassword() {
  const input = document.getElementById('password');
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  this.innerHTML = show ? AUTH.eyeOffIcon() : AUTH.eyeIcon();
  this.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

document.getElementById('login-form').addEventListener('submit', async event => {
  event.preventDefault();
  AUTH.hideAlert('alert');

  const email      = document.getElementById('email').value.trim();
  const password   = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember-me').checked;
  const button     = document.getElementById('submit-btn');

  if (!email || !password) {
    AUTH.showAlert('alert', 'Please enter your email and password.');
    return;
  }

  AUTH.setLoading(button, true);
  try {
    const data = await AUTH.api('POST', '/auth/login', { email, password, rememberMe });
    AUTH.setToken(data.token);
    AUTH.setUser(data.user);
    AUTH.toast(`Welcome back, ${data.user.name}!`, 'success', 1500);
    setTimeout(() => window.location.replace('/'), 900);
  } catch (err) {
    AUTH.showAlert('alert', err.message);
    AUTH.setLoading(button, false);
  }
});
