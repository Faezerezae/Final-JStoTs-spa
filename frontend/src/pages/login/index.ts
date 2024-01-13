import Navigo from "navigo"

export const LoginPage=(router:Navigo)=>{
  (window as any).goToSignupPage=()=>{
    router.navigate("signup")
}
    return`
    <div class="flex items-center justify-center p-24">
  <svg width="54" height="81" viewBox="0 0 54 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.23355 17.7415C22.2531 10.4389 33.6453 3.542 39.7482 0.499261C44.834 -2.54348 47.1042 9.00132 42.7997 16.7273C38.4952 24.4532 26.5252 28.8982 26.5252 28.8982C26.5252 28.8982 52.9712 22.8128 53.9884 46.1404C54.2537 52.2259 49.9198 59.3256 46.8683 61.3541C43.8168 63.3826 17.3708 79.1034 14.3194 80.6248C10.7425 82.4081 9.23359 77.582 9.23359 71.4965C9.23359 57.2971 25.5081 52.2259 25.5081 52.2259C11.2679 54.2544 2.1135 49.1832 0.0791923 33.9695C-0.598903 28.8982 3.13068 21.1646 9.23355 17.7415Z" fill="black"/>
</svg>
</div>
    <div class="w-full p-4 bg-white">
  <form class="space-y-6" id="loginForm">
    <h5 class="font-semibold text-3xl text-gray-900 text-center">
      Login to Your Account
    </h5>
    <div
      class="relative mb-6 text-gray-500 hover:border-black hover:text-black"
    >
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
      >
        <i class="bi bi-person-bounding-box"></i>
      </div>
      <input
        type="text"
        name="username"
        id="username"
        class="bg-gray-50 border border-transparent text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5"
        placeholder="Username"
        required
      />
    </div>

    <div
      class="relative mb-6 text-gray-500 hover:border-black hover:text-black flex justify-center items-center"
    >
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
      >
        <i class="bi bi-lock-fill"></i>
      </div>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
        class="bg-gray-50 border border-transparent text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5"
      />
      <button
        type="button"
        class="show-password absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer z-40"
        id="show-password"
      >
      <i class="bi bi-eye-slash" id="eye"></i>
      </button>
    </div>
    <button onclick="goToSignupPage()" class="absolute left-48 font-bold text-center flex justify-center items-center cursor-pointer hover:underline"
    >
    Sign Up
    </button>
    <button
      type="submit"
      class="absolute z-30 flex justify-center items-center -translate-x-1/2 rtl:space-x-reverse left-1/2 w-[380px] top-[800px] h-12 rounded-full bg-slate-600 hover:bg-black text-white whitespace-nowrap p-4 font-medium text-sm"
    >
      Sing In
    </button>
  </form>
  <div
    class="p-4 mt-6 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-800 dark:text-red-400 hidden"
    role="alert"
    id="loginFormError"
  ></div>
</div>

    `
}