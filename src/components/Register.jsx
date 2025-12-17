import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get isAuthenticated

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-mesa-orange mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">Únete a Mesa Libre y reserva fácil</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-1">Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl border-2 border-transparent bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-mesa-orange focus:border-transparent transition-all"
              placeholder="Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl border-2 border-transparent bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-mesa-orange focus:border-transparent transition-all"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-5 py-3 rounded-xl border-2 border-transparent bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-mesa-orange focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm font-medium text-center">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-white bg-mesa-orange rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-bold text-mesa-orange hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
