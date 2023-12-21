import React from 'react'
import CustomInput from '../Component/Custominput'
import { Link } from 'react-router-dom';

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#deedff", minHeight: "100vh" }}>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 className="text-center title">Forgot Password</h3>
      <p className="text-center">Enter email to get reset password code.</p>
      <form action="" >
        <CustomInput
          type="text"
          label="Email Address"
          id="email"
          name="email"
        /> 
        <div className="mb-3 text-end">

        </div>
        <button
          className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
          style={{ background: "#388EFF" }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
);
}

export default Forgotpassword