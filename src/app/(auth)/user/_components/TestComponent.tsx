"use client";

import React, { useEffect } from "react";

const getUser = async () => {
  const response = await fetch("/api/user");
  return await response.json();
};

const TestComponent = () => {
  useEffect(() => {
    const data = getUser();
    console.log(data);
  });
  return <div>asdf</div>;
};

export default TestComponent;
