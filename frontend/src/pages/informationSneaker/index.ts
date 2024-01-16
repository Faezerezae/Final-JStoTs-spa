import axios from "axios";
import { serverUrl, sneakerUrls } from "../../apis/urls";
import { Session } from "../../utils/session";
export async function InformationSneaker(id:number) { 
    const session = new Session();
    const response = await axios.get(serverUrl + sneakerUrls.item+`${id}`, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    console.log(response.data);
    const sizes = response.data.sizes.split("|");
    const colors = response.data.colors.split("|");
  
    const colorTag = colors
      .map((color:string) => {
        return `
      <div class="rounded-full border border-gray-200 h-8 w-8 flex justify-center items-center cursor-pointer" style="background-color:${color};">
      <i class="bi bi-check hidden"></i>
      </div>`;
      })
      .join("");
    const sizeTag = sizes
      .map((size:string) => {
        return `
      <p class="rounded-full h-8 w-8 border border-black flex justify-center items-center cursor-pointer active:bg-black active:text-white" id"active-bottun" >${size}</p>`;
      })
      .join("");
      return( `
      <div class="w-full p-4 bg-[#F6F6F6]">
      <button onclick="navigate('/sneakers')">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.9998 16.0003C23.9998 16.2655 23.8945 16.5199 23.7069 16.7074C23.5194 16.8949 23.2651 17.0003 22.9998 17.0003H11.4138L15.7078 21.2923C15.8008 21.3853 15.8746 21.4956 15.9249 21.6171C15.9752 21.7386 16.0011 21.8688 16.0011 22.0003C16.0011 22.1318 15.9752 22.262 15.9249 22.3835C15.8746 22.5049 15.8008 22.6153 15.7078 22.7083C15.6149 22.8013 15.5045 22.875 15.383 22.9253C15.2615 22.9757 15.1313 23.0015 14.9998 23.0015C14.8683 23.0015 14.7381 22.9757 14.6167 22.9253C14.4952 22.875 14.3848 22.8013 14.2918 22.7083L8.29183 16.7083C8.19871 16.6154 8.12482 16.505 8.07441 16.3836C8.024 16.2621 7.99805 16.1318 7.99805 16.0003C7.99805 15.8688 8.024 15.7385 8.07441 15.617C8.12482 15.4955 8.19871 15.3852 8.29183 15.2923L14.2918 9.29229C14.4796 9.10451 14.7343 8.99902 14.9998 8.99902C15.2654 8.99902 15.5201 9.10451 15.7078 9.29229C15.8956 9.48006 16.0011 9.73474 16.0011 10.0003C16.0011 10.2658 15.8956 10.5205 15.7078 10.7083L11.4138 15.0003H22.9998C23.2651 15.0003 23.5194 15.1056 23.7069 15.2932C23.8945 15.4807 23.9998 15.7351 23.9998 16.0003Z" fill="black"/>
        </svg>
      </button>
        </div>
    <div class="w-full">
    <img src="${response.data.imageURL}" class="w-full" alt="..." />
    <div class="p-4 grid gap-4">
      <div class="flex justify-between items-start font-semibold text-xl">
        <h1 class="">${response.data.name}</h1>
        <i class="bi bi-heart hover:text-red-700 cursor-pointer"></i>
      </div>
  
      <div class="flex gap-10 justify-start items-center">
        <div
          class="bg-gray-200 flex gap-2 justify-center items-center rounded-lg p-1"
        >
          <span id="sold">5.371</span>
          <p>sold</p>
        </div>
        <div class="flex gap-1">
          <span><i class="bi bi-star-half"></i></span>
          <p id="rate">4.3</p>
          <p>(5.389 reviews)</p>
        </div>
      </div>
      <div>
        <h2 class="font-semibold text-base">Decription</h2>
        <p id="dic" class="text-[13px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. sed do eiusmod
          tempor incididunt ut labore et
          <span class="font-semibold">view more...</span>
        </p>
      </div>
  
      <div class="flex justify-start gap-16">
        <div class="grid gap-2">
          <p class="font-semibold">Size</p>
          <div class="flex gap-2">${sizeTag}</div>
        </div>
        <div class="grid gap-2">
          <p class="font-semibold">Color</p>
          <div class="flex gap-2">${colorTag}</div>
        </div>
      </div>
      <div class="flex gap-6 font-semibold justify-start items-center">
        <p>Quantity</p>
        <div
          class="bg-gray-200 rounded-full px-4 py-2 flex justify-center items-center gap-5"
        >
          <button class="btn" id="low-off"> - </button>
          <span id="qua">1</span>
          <button class="btn" id="Increase">+</button>
        </div>
      </div>
  
      <hr />
      <div class="flex justify-between items-center">
        <div class="grid gap-1">
          <p class="text-gray-500">Total price</p>
          <div class="flex font-semibold">
            <i class="bi bi-currency-dollar"></i>
            <span id="total">${response.data.price}</span>.00
          </div>
        </div>
        <button
          id="subtoCart"
          class="rounded-full flex justify-center items-center text-white gap-2 bg-black py-4 px-16"
        >
          <i class="bi bi-bag-fill"></i>add to cart
        </button>
      </div>
    </div>
  </div>`
  );
}