import React from "react";

const Login = () => {
  return (
    <main>
      <section className="container py-12 flex justify-center ">
        <div class="w-full md:w-10/12 lg:w-1/2 p-8 sm:p-12 bg-primary bg-opacity-10 rounded">
          <h2 className=" text-2xl md:text-3xl font-semibold">
            Log in to your account
          </h2>
          <form className="mt-8">
            {/* email */}
            <div className="">
              <label htmlFor="email" className="block text-[#595D69] text-15">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="E-mail"
              ></input>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
