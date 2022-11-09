// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
// Components
import { Link } from "react-router-dom";
// Redux
// import { login, reset } from "../../redux/slices/authSlice";
import { setCredentials } from "../../redux/RTK/newAuthSlice";
import { useLoginMutation } from "../../redux/RTK/authApiSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { loading, error } = useSelector((state) => state.auth);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const { data: userId } = await login(user);
    if (userId) {
      dispatch(setCredentials(userId));
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card bg-white text-black"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body pb-5 px-5 text-center">
              <div className="mb-md-3 mt-md-2 pb-4">
                <h2>Login</h2>
                <div className="text-black-75 mb-5">
                  Por favor insira seus dados para fazer o login!
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3 text-start">
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

                  <div className="form-floating mb-3 text-start">
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
                  {!isLoading && (
                    <button
                      className="btn btn-primary btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  )}
                  {isLoading && <p>Carregando...</p>}
                </form>
              </div>
              {error && <p className="text-bg-danger p-3">{error}</p>}
              <div>
                <p className="mb-0">
                  Já não possui conta? <Link to="/register">Cadastre-se</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
