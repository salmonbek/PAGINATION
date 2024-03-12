import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { TOKEN } from "../constants";
import loginSchema from "./../schemas/loginSchema";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        let res = await axios.post("https://reqres.in/api/login", values);
        localStorage.setItem(TOKEN, res.data.token);
        setIsLogin(true);
        navigate("/");
      } catch (err) {
        toast.error(err.response.data.error);
      }
    },
  });

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form
        className="container mt-4 w-25"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  setIsLogin: PropTypes.func,
};

export default LoginPage;
