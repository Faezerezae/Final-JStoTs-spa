import Navigo from "navigo";
import { startPage } from "./pages/startPage";
import { startonboarding } from "./pages/startOnboarding";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { Carousel } from "./pages/carousel";
import { SneakersList } from "./pages/sneakers";


export function render(context: string) {
  const app = <HTMLDivElement>document.getElementById("app");
  app.classList.add(`w-[430px]`, `h-[920px]`, `m-0`, `p-0`, `mx-auto`);
  app.innerHTML = context;
}

const router = new Navigo("/");

declare global {
  interface Window {
   navigate: (_: string) => void;
  }
}


window.navigate = (route: string) => {
  router.navigate(route);
};

router.on("/", function () {
  render(startPage(router));
});
router.on("startonboarding", function () {
  render(startonboarding());
});
router.on("/carousel", function () {
  render(Carousel());
});
router.on("/signup", function () {
  render(SignupPage());
});

router.on("/login", function () {
  render(LoginPage());
});

router.on("/sneakers", function () {
  render(SneakersList());
});

router.resolve();
