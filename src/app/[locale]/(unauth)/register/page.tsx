import React from "react";
import { RegisterContainer } from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[480px]">
        <RegisterContainer />
      </div>
    </div>
  );
};

export default RegisterPage;
