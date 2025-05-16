import { useState } from 'react';
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from '../service/firebase'; 
import { useNavigate } from 'react-router-dom';
import { getDatosUsuario } from '../service/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga del formulario

    // Validación básica
    if (!email || !contraseña) {
      setError('Por favor ingresa todos los campos.');
      return;
    }

    try {
      // Iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;
      setSuccess(true);
      setError('');
      getDatosUsuario(user.uid);
      
      console.log('Login exitoso. ID de usuario:', user.uid);
      navigate('/camilo'); // Redirige a la página principal o dashboard
    } catch (error) {
      setSuccess(false);
      setError("Contraseña o Email incorrecto"); // Muestra el error (usuario no encontrado o contraseña incorrecta)
    }
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div className='footer-links'>
          <p>
            <a href="/resetpassword" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
        </p>

        </div>

        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="submit-button">Ingresar</button>

      </form>
    </div>
  );
}

export default Login;
