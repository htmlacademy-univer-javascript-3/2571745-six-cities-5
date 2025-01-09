import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useState } from 'react';
import { loginAction } from '../../action';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';

function LoginPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateInput = () => {
    if (!email.trim()) {
      setErrorMessage('Email cannot be empty.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!password.trim()) {
      setErrorMessage('Password cannot be empty.');
      return false;
    }
    if (password.trim().length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateInput()) {
      dispatch(loginAction({ email, password }));
    }
  };

  const navigate = useNavigate();
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus,
  );

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              
              {errorMessage && (
                <div className="login__error-message">
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                </div>
              )}

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
