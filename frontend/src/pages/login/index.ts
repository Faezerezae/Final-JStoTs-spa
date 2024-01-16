import { AxiosError } from "axios";
import { ISignupBody, loginApi } from "../../apis/auth.apis";
import { ErrorToast } from "../../components/toast/error-toast";
import { Session } from "../../utils/session";
import { render } from "../../router";

declare global {
  interface Window {
    handleLogin: () => Promise<void>;
    loginNotificationClose: () => void;
    togglePasswordVisibilityLogin: () => void;
  }
}

window.togglePasswordVisibilityLogin = () => {
  const passwordInput = document.getElementById(
    "login-form-password",
  ) as HTMLInputElement;
  const eye = document.getElementById("eye");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eye?.classList.remove("bi-eye-slash");
    eye?.classList.add("bi-eye");
  } else {
    passwordInput.type = "password";
    eye?.classList.remove("bi-eye");
    eye?.classList.add("bi-eye-slash");
  }
};

window.handleLogin = async () => {
  const usernameInput = <HTMLInputElement>(
    document.getElementById("login-form-username")
  );
  const passwordInput = <HTMLInputElement>(
    document.getElementById("login-form-password")
  );

  const body: ISignupBody = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await loginApi(body);
    const sesssion = new Session();
    sesssion.setAccessToken(response.token);
    window.navigate("/sneakers");
  } catch (error) {
    const err = <AxiosError>error;
    render(
      LoginPage(
        ErrorToast({
          errorsList: (<any>err.response?.data).message || [],
          closeFunctionName: "loginNotificationClose",
        }),
      ),
    );
  }
};

window.loginNotificationClose = () => {
  render(LoginPage());
};

export const LoginPage = (notifElement?: string) => {
  return `
    ${notifElement || ""}
    <div class="w-5 p-4">
  <button onclick="navigate('/signup')">
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.9998 16.0003C23.9998 16.2655 23.8945 16.5199 23.7069 16.7074C23.5194 16.8949 23.2651 17.0003 22.9998 17.0003H11.4138L15.7078 21.2923C15.8008 21.3853 15.8746 21.4956 15.9249 21.6171C15.9752 21.7386 16.0011 21.8688 16.0011 22.0003C16.0011 22.1318 15.9752 22.262 15.9249 22.3835C15.8746 22.5049 15.8008 22.6153 15.7078 22.7083C15.6149 22.8013 15.5045 22.875 15.383 22.9253C15.2615 22.9757 15.1313 23.0015 14.9998 23.0015C14.8683 23.0015 14.7381 22.9757 14.6167 22.9253C14.4952 22.875 14.3848 22.8013 14.2918 22.7083L8.29183 16.7083C8.19871 16.6154 8.12482 16.505 8.07441 16.3836C8.024 16.2621 7.99805 16.1318 7.99805 16.0003C7.99805 15.8688 8.024 15.7385 8.07441 15.617C8.12482 15.4955 8.19871 15.3852 8.29183 15.2923L14.2918 9.29229C14.4796 9.10451 14.7343 8.99902 14.9998 8.99902C15.2654 8.99902 15.5201 9.10451 15.7078 9.29229C15.8956 9.48006 16.0011 9.73474 16.0011 10.0003C16.0011 10.2658 15.8956 10.5205 15.7078 10.7083L11.4138 15.0003H22.9998C23.2651 15.0003 23.5194 15.1056 23.7069 15.2932C23.8945 15.4807 23.9998 15.7351 23.9998 16.0003Z" fill="black"/>
</svg>
  </button>
</div>
    <div class="flex items-center justify-center p-24">
  <svg width="54" height="81" viewBox="0 0 54 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.23355 17.7415C22.2531 10.4389 33.6453 3.542 39.7482 0.499261C44.834 -2.54348 47.1042 9.00132 42.7997 16.7273C38.4952 24.4532 26.5252 28.8982 26.5252 28.8982C26.5252 28.8982 52.9712 22.8128 53.9884 46.1404C54.2537 52.2259 49.9198 59.3256 46.8683 61.3541C43.8168 63.3826 17.3708 79.1034 14.3194 80.6248C10.7425 82.4081 9.23359 77.582 9.23359 71.4965C9.23359 57.2971 25.5081 52.2259 25.5081 52.2259C11.2679 54.2544 2.1135 49.1832 0.0791923 33.9695C-0.598903 28.8982 3.13068 21.1646 9.23355 17.7415Z" fill="black"/>
</svg>
</div>
    <div class="w-full space-y-6 p-4 bg-white text-center relative">
    <h5 class="font-semibold text-3xl text-gray-900 text-center">
      Login to Your Account
    </h5>
    <div
      class="relative mb-6 mx-2 text-gray-500 hover:border-black hover:text-black"
    >
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
      >
        <i class="bi bi-person-bounding-box"></i>
      </div>
      <input
      type="text"
      name="username"
      id="login-form-username"
      class="bg-gray-50 border border-transparent text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5"
      placeholder="Username"
      required
    />
    </div>

    <div
      class="relative mb-6 mx-2 text-gray-500 hover:border-black hover:text-black flex justify-center items-center"
    >
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
      >
        <i class="bi bi-lock-fill"></i>
      </div>
      <input
      type="password"
      name="password"
      id="login-form-password"
      placeholder="Password"
      required
      class="bg-gray-50 border border-transparent text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5"
    />
      <button
        type="button"
        class="show-password absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer z-40"
        onclick="window.togglePasswordVisibilityLogin()"
      >
      <i class="bi bi-eye-slash" id="eye"></i>
      </button>
    </div>
    <button onclick="navigate('/signup')" class="font-bold text-xl text-gray-900 text-center active:underline"
    >
    Sign Up
    </button>
    
    <button
      type="submit"
      onclick="handleLogin()"
      class="w-[380px] h-12 rounded-full bg-slate-600 hover:bg-black text-white whitespace-nowrap font-bold text-center absolute top-[460px] right-6"
    >
      Sing In
    </button>
</div>

    `;
};
