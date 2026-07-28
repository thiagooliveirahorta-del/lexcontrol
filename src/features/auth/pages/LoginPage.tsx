import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';

import '../auth.css';

export function LoginPage() {
  const {
    signIn,
    user,
    loading,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = 'Login | LexControl';
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');

    if (!email.trim()) {
      setError('Informe seu e-mail.');
      return;
    }

    if (!password.trim()) {
      setError('Informe sua senha.');
      return;
    }

    try {
      setSending(true);

      await signIn(email, password);

    } catch (error) {
      console.error(error);

      setError(
        'E-mail ou senha inválidos.',
      );
    } finally {
      setSending(false);
    }
  }

  if (!loading && user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <main className="auth-page">

      <section className="auth-card">

        <div className="auth-logo">
          <h1>LexControl</h1>

          <p>
            Controle Jurídico Inteligente
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <label>

            E-mail

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </label>

          <label>

            Senha

            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </label>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            className="auth-button"
            disabled={sending}
          >
            {sending
              ? 'Entrando...'
              : 'Entrar'}
          </button>

        </form>

        <div className="auth-links">
          <Link to="/forgot-password">
            Esqueci minha senha
          </Link>
        </div>

      </section>

    </main>
  );
}

export default LoginPage;