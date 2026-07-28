import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';

import '../auth.css';

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = 'Recuperar senha | LexControl';
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Informe seu e-mail.');
      return;
    }

    try {
      setSending(true);

      await resetPassword(email);

      setMessage(
        'Se existir uma conta com este e-mail, um link de recuperação foi enviado.',
      );
    } catch (error) {
      console.error(error);

      setError(
        'Não foi possível enviar o e-mail de recuperação.',
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-card">

        <div className="auth-logo">
          <h1>LexControl</h1>

          <p>
            Recuperação de senha
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

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {message && (
            <div className="auth-success">
              {message}
            </div>
          )}

          <button
            className="auth-button"
            disabled={sending}
          >
            {sending
              ? 'Enviando...'
              : 'Enviar link'}
          </button>

        </form>

        <div className="auth-links">

          <Link to="/login">
            Voltar ao login
          </Link>

        </div>

      </section>

    </main>
  );
}

export default ForgotPasswordPage;