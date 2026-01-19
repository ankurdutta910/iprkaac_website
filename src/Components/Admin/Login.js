import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuth } from "./Auth/UserAuthContext";
import GoToTop from "../../GoToTop";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [successmsg, setSuccessMsg] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      setSuccessMsg("Credentials verified. Redirecting...");

      setTimeout(() => {
        setSuccessMsg("");
        setLoading(false);
        navigate("/user-dashboard", { replace: true });
      }, 3000);
    } catch (err) {
      setError("Alert! You are not authorized");
      setLoading(false);
      setTimeout(() => {
        setError("");
        setLoading(false);
      }, 3000);
    }
  };
  return (
    <>
      <>
        <GoToTop />
        <div className="login-body">
          <div className="login-div">
            <form onSubmit={handleSubmit}>
              <h1 className="login-header mb-0 text-center">LOGIN</h1>
              <p className="text-center">
                <i style={{ color: "grey" }}>(For Office Use Only)</i>
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              {successmsg && (
                <Alert
                  variant="success"
                  style={{ fontSize: "12px", textAlign: "center" }}
                >
                  {successmsg}
                </Alert>
              )}
              {/* <!-- NAME FIELD --> */}
              <div className="loginform-field my-3">
                <label for="field" className="label--required">
                  Email ID
                </label>
                <section>
                  {/* <svg className="icon icon-person">
                  <use xlink:href="#icon-person"></use>
                </svg> */}
                  <input
                    className="form-control"
                    id="field"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="xyz@gmail.com"
                  />
                </section>
              </div>

              {/* <!-- EMAIL FIELD --> */}
              <div className="form-field my-2">
                <label for="password" className="label--required">
                  Password
                </label>
                <section>
                  {/* <svg className="icon icon-mail_outline">
                  <use xlink:href="#icon-mail_outline"></use>
                </svg> */}
                  <input
                    className="form-control"
                    id="password"
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                  />
                </section>
              </div>

              {loading === true ? (
                <>
                  <button disabled className="btn btn-primary w-100 my-4">
                    Loading...
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className="btn btn-primary w-100 my-4">
                    Log in
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default Login;
