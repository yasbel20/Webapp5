import { useState } from 'react';
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth, db, ref, set } from '../service/firebase'; // Firebase Config y funciones
import { useNavigate } from 'react-router-dom';
import Foto from '../assets/camilolo.png';


function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Validación básica
    if (!email || !contraseña || !nombre) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      // Crear usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;

      // Guardar datos adicionales en Realtime Database (sin la contraseña)
      const userRef = ref(db, 'users/' + user.uid);
      await set(userRef, {
        nombre: nombre,      // Guardamos solo el nombre
        email: email,        // Guardamos solo el email
        diamantes: 0         // Inicializamos los diamantes en 0
      });

      // Si el registro es exitoso, redirigir a la página de login
      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      // Manejo de errores (por ejemplo, usuario ya existe o error de red)
      setError(error.message);
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="left-column">
        <h2>
          <img src={Foto}>
          </img>
        </h2>
        <div className="eslogan-container">
        <p className="eslogan">
          Bienvenido al mundo de Camilo, cuidalo para obtener recompensas y poder hacer de él
          una vida mejor
        </p>
      </div>
      </div>
      <div className="right-column">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Crear cuenta</h2>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre Completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">Crear cuenta</button>

          <div className="footer-links">
            <p>
              <a href="/login" className="login-link">¿Ya tienes cuenta? Inicia sesión</a>
            </p>
          </div>
        </form>
      </div>


    </div>
  );
}

export default Register;
