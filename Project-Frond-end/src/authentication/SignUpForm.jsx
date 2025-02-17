import axios from "axios"//;
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "tailwindcss/tailwind.css"; 
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { endpoint } from "../api/endpoints";
import { toast } from "react-toastify";

function Signupdup() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  };

  const navigate = useNavigate()
  
  const onSubmit = async (values) => {
    
    try{
      const response = await axiosInstance.post(endpoint.AUTH.REGISTER , values);
      
      toast.success(response.data.message)
      navigate('/login')
      
    }
    catch(error){
      console.log(error)
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Signup</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                <Field type="text" name="username" className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your name" />
                <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field type="email" name="email" className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field type="password" name="password" className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <Field type="password" name="confirmPassword" className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Confirm your password" />
                <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="mt-6">
                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Submit
                </button>
              </div>
              <p className="mt-4 text-center text-gray-700">
                Have an Account? <Link className="text-blue-500 hover:underline" to={"/login"}>Please Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signupdup;