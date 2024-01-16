import { AxiosError } from "axios";
import { ISneaker, getSneakersApi } from "../../apis/sneaker-apis";
import { errorHandler } from "../../utils/errorHandler";
import { UserInfo } from "../../utils/userInfo";
import { Session } from "../../utils/session";
import { Match } from "navigo";
import { Searchbar } from "../../components/searchbar";
import { BrandFilters } from "../../components/filters/brand";

let currentPage:number;
let totalItems:number=0;

declare global {
  interface Window {
    logout: () => void;
    handlePageChange: (newPage: number) => void;
  }
}

window.logout = () => {
  const session = new Session();
  session.logout();
  window.navigate("/login");
};

const getSneakersList = async (search?: string, brands?: string,page?:number) => {
  try {
    const sneakerData= await getSneakersApi({ search, brands,page });
    totalItems=sneakerData?.totalPages || 0;
    console.log(sneakerData.totalPages)
    return sneakerData;
  } catch (error) {
    errorHandler(<AxiosError>error);
  }
};

const SneakerCard = (sneaker: ISneaker) => {
  return `
  <div class="cursor-pointer m-1" onclick="navigate('/sneakers/${sneaker.id}')">
    <img
      class="rounded-3xl w-full h-40"
      src="${sneaker.imageURL}"
    />
    <p class="text-ellipsis overflow-hidden whitespace-nowrap text-lg font-medium mt-3">
      ${sneaker.name}
    </p>
    <p class="font-medium">$ ${sneaker.price}</p>
  </div>
  `;
};

const SneakersList = (sneakers: ISneaker[]) => {
  let html = "";
  for (const snk of sneakers) {
    html += SneakerCard(snk);
  }
  return html;
};

export const SneakersPage = async (props: Match | undefined) => {
  
     const search=props?.params?.search;
    const brands=props?.params?.brands;

    window.handlePageChange = async (newPage: number) => {

      const newSneakersList = await getSneakersList(search, brands, newPage);
      document.getElementById("sneakersList")!.innerHTML = SneakersList(
      newSneakersList?.data || []
      );
      currentPage = newPage;
      };
      
      const sneakersList = await getSneakersList(search, brands, currentPage);
      const userInfo = await UserInfo();
      
      const totalPages = totalItems;

      const showPagination = totalPages > 1;

setTimeout(() => {
  const whatDate = <HTMLDivElement>document.querySelector("#whatDate");
    const now = new Date();
    const currentHour = now.getHours();
    switch (true) {
      case currentHour >= 5 && currentHour < 12:
      whatDate.textContent = "Good morning!🤚";
      break;
      case currentHour >= 12 && currentHour < 18:
      whatDate.textContent = "Good afternoon!🤚";
      break;
    case currentHour >= 18 || currentHour < 5:
      whatDate.textContent = "Good evening!🤚";
      break;
      default:
        whatDate.textContent = "Hello!🤚";
    }
}, 100);


  return `
    <div class="p-4">
        <div class="flex justify-between items-center">
          <div class="py-4">
          <p id="whatDate" class="text-gray-500"></p>
            <p class="font-bold capitalize">${userInfo?.username}</p>
          </div>
          <button onclick="logout()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        </div>
        <div class="mb-6 mt-1">
          ${Searchbar(props)}
        </div>
        <div class=""brands-button flex flex-nowrap overflow-x-scroll gap-1 p-3"">
          ${await BrandFilters(props)}
        </div>
        ${
          !sneakersList?.data.length
            ? ` <div class="flex-col justify-center items-center mt-20 text-center">
            <img
              src="./img/35_Light_search result not found.png"
              alt="noot"
            />
            <h1 class="font-bold">Not Found</h1>
            <p class="p-2 text-sm">
              sorry the kyeword you entred connot bo found please check agian or search
              with onother keyword
            </p>
          </div>`
            : ""
        }
        <main id="sneakersList" class="mx-auto grid w-full h-[520px] my-4 grid-cols-2 items-start justify-center overflow-y-scroll">
          ${SneakersList(sneakersList?.data || [])}
        </main>

        ${
          showPagination
            ? `
        <div class="flex justify-center mt-4">
          <nav class="inline-flex">
          ${Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return `
          <button
          class="px-3 py-1 border-t border-gray-300 bg-white hover:bg-gray-100 ${
          pageNumber === currentPage ? 'border-indigo-500' : 'text-gray-500'
          }"
          onclick="handlePageChange(${pageNumber})"
          >
          ${pageNumber}
          </button>
          `;
          }).join("")}
          </nav>
          </div>
          `
          : ''
      }
        <div
        class="flex px-1 absolute z-40 top-[835px] -translate-x-1/2 left-1/2 py-5 gap-12"
      >
        <button class="flex flex-col justify-center items-center cursor-pointer" onclick="navigate('/sneakers')">
            <i class="bi bi-house-door-fill text-2xl"></i>
            <p>home</p>
        </button>
        <button class="flex flex-col justify-center items-center cursor-pointer" onclick="navigate('/sneakers')">
            <i class="bi bi-bag text-2xl"></i>
            <p>cart</p>
        </button>
    
        <button class="flex flex-col justify-center items-center cursor-pointer" onclick="navigate('/sneakers')">
            <i class="bi bi-cart text-2xl"></i>
            <p>order</p>
        </button>
        <button class="flex flex-col justify-center items-center cursor-pointer" onclick="navigate('/sneakers')">
            <i class="bi bi-wallet text-2xl"></i>
            <p>wallet</p>
        </button>
        <button class="flex flex-col justify-center items-center cursor-pointer" onclick="navigate('/sneakers')">
            <i class="bi bi-person text-2xl"></i>
            <p>profile</p>
        </button>
      </div>
    </div>
  `;
};
