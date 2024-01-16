import { Match } from "navigo";
import { getSneakersBrandsApi } from "../../apis/sneaker-apis";
import { errorHandler } from "../../utils/errorHandler";
import { AxiosError } from "axios";

declare global {
  interface Window {
    setFilterBrand: (brand: string) => void;
  }
}

window.setFilterBrand = (brand: string) => {
  const params = new URLSearchParams({ brands: brand });

  if (params.has("brands") && brand.toLowerCase() === "all") {
    params.delete("brands");
  }

  window.navigate(`/sneakers?${params.toString()}`);
};

const getBrands = async () => {
  try {
    return await getSneakersBrandsApi();
  } catch (error) {
    errorHandler(<AxiosError>error);
  }
};

const BrandItem = (title: string, isSelected = false) => {
  return `<div onclick="setFilterBrand('${title}')" class="border cursor-pointer border-gray-900 rounded-3xl px-4 py-2 font-medium whitespace-nowrap ${
    isSelected ? "bg-gray-900 text-white whitespace-nowrap" : ""
  }">${title}</div>`;
};

const Brands = (brands: string[], selectedBrand?: string) => {
  let html = BrandItem("All", !selectedBrand);

  for (const brand of brands) {
    html += BrandItem(brand, selectedBrand?.split("+").join(" ") === brand);
  }
  return html;
};

export const BrandFilters = async (props: Match | undefined) => {
  const brands = await getBrands();

  return `
    <div>
      <div class="flex items-center justify-between">
        <p class="font-semibold text-lg">Most Popular</p>
        <p class="font-semibold text-lg">All</p>
      </div>
      <div class="flex flex-nowrap overflow-x-scroll gap-1 p-3">${Brands(
        brands || [],
        props?.params?.brands
      )}</div>
    </div>`;
};
