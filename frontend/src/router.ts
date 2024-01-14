import Navigo from "navigo";
import { startPage } from "./pages/startPage";
import { onBoarding } from "./pages/onBoarding";
import { startonboarding } from "./pages/startOnboarding";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";



function render(context: string) {
  const app = <HTMLDivElement>document.getElementById("app");
  app.classList.add(`w-[430px]`, `h-[920px]`, `m-0`, `p-4`, `mx-auto`);
  app.innerHTML = context;
}

const router = new Navigo("/");


declare global{
  interface window {
    navigate:(_:string)=>void;
  }
}

window.navigate = (route: string) => {
  router.navigate(route);
};



router.on("/", function () {
  render(startPage(router));
});
router.on("startonboarding", function () {
  render(startonboarding(router));
});
router.on("onboarding", function () {
  render(onBoarding());
});
router.on("signup", function () {
  render(SignupPage());
});

router.on("login", function () {
  render(LoginPage());
});

router.resolve();
