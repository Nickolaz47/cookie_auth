// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Redux
import { getUserData } from "../../redux/slices/userSlice";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // const { user, loading, error } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserData());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name);
  //     setEmail(user.email);
  //   }
  // }, [user]);

  return (
    <div className="container py-3 h-100">
      {/* <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-8 col-md-8 col-lg-8 col-xl-8">
          <div
            className="card bg-white text-black"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body pb-5 px-5 text-center">
              <div className="mb-md-3 mt-md-2">
                <h2 className="mb-5">Seus dados</h2>
                <form>
                  <div className="form-floating mb-3 text-start">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nome Completo"
                      value={name || ""}
                      id="floatingName"
                      readOnly
                    />
                    <label className="form-label" htmlFor="floatingName">
                      Nome Completo
                    </label>
                  </div>
                  <div className="form-floating mb-3 text-start">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="E-mail"
                      value={email || ""}
                      id="floatingEmail"
                      readOnly
                    />
                    <label className="form-label" htmlFor="floatingEmail">
                      E-mail
                    </label>
                  </div>
                  {loading && <p>Carregando...</p>}
                </form>
              </div>
              {error && <p className="text-bg-danger p-3">{error}</p>}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
