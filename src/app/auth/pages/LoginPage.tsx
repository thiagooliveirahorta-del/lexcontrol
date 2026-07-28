import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { user, signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setErro('');
    setLoading(true);

    try {
      await signIn(email, password);
    } catch {
      setErro('E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <Scale size={46} />
          <h1>LexControl</h1>
          <p>
            Plataforma Inteligente para Correspondentes Jurídicos
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <label>
            E-mail
          </label>

          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>
            Senha
          </label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {erro && (
            <div className="login-error">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Entrando...'
              : 'Entrar'}
          </button>

        </form>

        <footer>
          © {new Date().getFullYear()} LexControl
        </footer>

      </div>
    </main>
  );
}