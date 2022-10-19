// Hooks
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { Link } from "react-router-dom";
// Redux
import { register } from "../../redux/slices/userSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, email, password, confirmPassword };
    dispatch(register(newUser));
  };

  return (
    <div className="container py-3 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-10 col-lg-8 col-xl-8">
          <div
            className="card bg-white text-black"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body pb-5 px-5 text-center">
              <div className="mb-md-3 mt-md-2 pb-4">
                <h2>Cadastro</h2>
                <div className="text-black-75 mb-5">
                  Por favor insira seus dados para fazer o cadastro!
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-floating text-start">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Nome Completo"
                          value={name || ""}
                          onChange={(e) => setName(e.target.value)}
                          id="floatingName"
                          required
                        />
                        <label className="form-label" htmlFor="floatingName">
                          Nome Completo
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-floating text-start">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="E-mail"
                          value={email || ""}
                          onChange={(e) => setEmail(e.target.value)}
                          id="floatingEmail"
                          required
                        />
                        <label className="form-label" htmlFor="floatingEmail">
                          E-mail
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-floating text-start">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Senha"
                          value={password || ""}
                          onChange={(e) => setPassword(e.target.value)}
                          id="floatingPsetPassword"
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="floatingPsetPassword"
                        >
                          Senha
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-floating text-start">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Confirme a senha"
                          value={confirmPassword || ""}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          id="floatingConfirmPassword"
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="floatingConfirmPassword"
                        >
                          Confirme a senha
                        </label>
                      </div>
                    </div>
                  </div>
                  {!loading && (
                    <button
                      className="btn btn-primary btn-lg px-5"
                      type="submit"
                    >
                      Cadastrar
                    </button>
                  )}
                  {loading && <p>Carregando...</p>}
                </form>
              </div>
              {error && <p className="text-bg-danger p-3">{error}</p>}
              <div>
                <p className="mb-0">
                  Já possui conta? <Link to="/login">Faça login</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
