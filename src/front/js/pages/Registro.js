import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const Registro = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    });

    const changeForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm)
        };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/registro`, requestOptions);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error en el registro, vuelve a intentarlo');
            }

            const data = await response.json();
            alert('Registro exitoso, bienvenid@');
            navigate('/login');
        } catch (error) {
            alert(`Error en la llamada a la API: ${error.message}`);
        }
    };



	return (
		<div className="container mt-5 d-flex justify-content-center align-items-center vh-100">
			<div className="col-md-6">
				<div className="card">
					<div className="card-header">
						<h4 className="card-title text-center">Registro de usuario</h4>
					</div>
					<div className="card-body">
						<form onSubmit={submitForm}>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email</label>
								<input type="email" className="form-control" id="email" name="email" onChange={changeForm} required/>
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">Contraseña</label>
								<input type="password" className="form-control" id="password" name="password" onChange={changeForm} required/>
							</div>

							<button type="submit" className="btn btn-primary w-100">Registrarse Ahora</button>
						</form>
					</div>
					<div className="card-footer text-center">
						<p className="mb-0"> ¿Ya tienes cuenta? <a href="/login">Ingresa aquí</a></p>
					</div>
				</div>
			</div>
		</div>
);
};

export default Registro;