
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance";
import { endpoint } from "../api/endpoints";

function LoginForm() {
 
  const initialValues = {
    email: "",
    password: "",
  };


  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = async (values) => {
    try{
      const response = await axiosInstance.post(endpoint.AUTH.LOGIN , values)
      const userRole = await response.data.user.role 
      navigate(userRole === 'user' ? '/' : '/adminpage/dashboard')
      localStorage.setItem('username' , response.data.user.username)
      toast.success(response.data.message);
    }
    catch(error){
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    }
  }; 
  
  useEffect(() => {
    toast.info("Please login with your credentials", {
      position: "top-center",
      autoClose: 3000,
    });
  }, []);

  return (
    <div
  className="flex items-center justify-center min-h-screen">
      <div className="w-full sm:w-96">
        <div className="max-w-xs p-6 transition-transform duration-300 ease-in-out rounded-lg shadow-lg bg-gradient-to-r h-100 w-250 hover:scale-105">
          <ToastContainer />
          <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                {errors.login && (
                  <div className="mb-3 text-xs text-red-500">
                    {errors.login}
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full py-2 text-white bg-blue-500 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Submit"}
                  </button>
                </div>

                <p className="mt-3 text-sm text-center">
                  No Account?{" "}
                  <Link className="text-blue-500 hover:underline" to={"/signin"}>
                    Create Account
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;