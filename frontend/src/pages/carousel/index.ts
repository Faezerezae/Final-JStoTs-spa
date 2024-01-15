
export const Carousel = () => {
setTimeout(() => {
  const carousel = <HTMLDivElement> document.getElementById("indicators-carousel");
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-item]"));
  const nextButton = <HTMLButtonElement>document.getElementById("nextBtn");
  const getStartedButton = <HTMLButtonElement>document.getElementById("getStartedBtn");
  const indicators = document.querySelectorAll("[data-carousel-slide-to]");

  let currentSlideIndex:number = 0;

  function showSlide(index:number) {
    slides.forEach((slide) => {
      slide.classList.add("hidden");
    });

    slides[index].classList.remove("hidden");
  }

  function updateButtonVisibility() {
    if (currentSlideIndex === 2) {
      nextButton.style.display = "none";
      getStartedButton.style.display = "block";
    } else {
  
      nextButton.style.display = "block";
   
      getStartedButton.style.display = "none";
    }
  }

  function updateIndicatorColor(index:number) {
    indicators.forEach((indicator, i) => {
      const button  = <HTMLButtonElement> indicator;
      if (i === index) {
        button.style.backgroundColor = "black";
      } else {
       button.style.backgroundColor = "gray";
      }
    });
  }

  updateButtonVisibility();
  nextButton.addEventListener("click", function () {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = 0;
    }
    showSlide(currentSlideIndex);
    updateButtonVisibility();
    updateIndicatorColor(currentSlideIndex);
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      currentSlideIndex = index;
      showSlide(currentSlideIndex);
      updateButtonVisibility();
      updateIndicatorColor(currentSlideIndex);
    });
  });
}, 1000);

return `
<div id="indicators-carousel" class="relative" data-carousel="static">
<!-- Carousel wrapper -->
<div class="relative overflow-hidden h-[700px]">
  <!-- Item 1 -->
  <div class="duration-700 ease-in-out" data-carousel-item="active">
    <img
    src="./img/page1-wallpaper.svg"
      class="absolute block h-[602px] w-full -translate-x-1/2 -translate-y-1/2 top-[40%] left-1/2"
      alt="..."
    />
    <h1
      class="absolute -bottom-20 w-full text-center my-20 p-4 font-semibold text-3xl"
    >
      We provide high quality products just for you
    </h1>
  </div>
  <!-- Item 2 -->
  <div class="hidden duration-700 ease-in-out" data-carousel-item>
    <img
    src="./img/page2-wallpaper.svg"
      class="absolute block w-full h-[602px] -translate-x-1/2 -translate-y-1/2 top-[40%] left-1/2"
      alt="..."
    />
    <h1
      class="absolute -bottom-20 w-full text-center my-20 p-4 font-semibold text-3xl"
    >
      Your satisfaction is our number one periority
    </h1>
  </div>
  <!-- Item 3 -->
  <div class="hidden duration-700 ease-in-out nt" data-carousel-item>
    <img
    src="./img/page3-wallpaper.svg"
      class="absolute block w-full h-[602px] -translate-x-1/2 -translate-y-1/2 top-[40%] left-1/2"
      alt="..."
    />
    <h1
      class="absolute -bottom-28 w-full text-center my-24 p-4 font-semibold text-3xl"
    >
      Let’s fulfill your fashion needs with shoearight now!
    </h1>
  </div>
</div>
<!-- Slider indicators -->

<div
  class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse -bottom-28 left-1/2 p-10"
>
  <button
    type="button"
    class="w-8 h-[2px] rounded-full bg-slate-500 hover:bg-slate-800 active:bg-black"
    aria-current="true"
    aria-label="Slide 1"
    data-carousel-slide-to="0"
  ></button>

  <button
    type="button"
    class="w-8 h-[2px] rounded-full bg-slate-500 hover:bg-slate-800 active:bg-black"
    aria-current="false"
    aria-label="Slide 2"
    data-carousel-slide-to="1"
  ></button>
  <button
    type="button"
    class="w-8 h-[2px] rounded-full bg-slate-500 hover:bg-slate-800 active:bg-black"
    aria-current="false"
    aria-label="Slide 3"
    data-carousel-slide-to="2"
  ></button>
</div>

<button
  type="button"
  class="absolute z-30 flex -translate-x-1/2 rtl:space-x-reverse -bottom-44 left-1/2 w-[380px]"
  data-carousel-next
  id="nextBtn"
>
  <span
    class="inline-flex items-center justify-center w-full h-12 rounded-full bg-black"
    id="nextButton"
  >
    <span
      class="text-white whitespace-nowrap p-4 font-medium text-sm"
      id="nextButtonText"
      >Next</span
    >
  </span>
</button>

<!-- اضافه کردن دکمه "Get Started" -->
<button
  type="button"
  class="absolute z-30 flex -translate-x-1/2 rtl:space-x-reverse left-1/2 w-[380px] -bottom-44"
  id="getStartedBtn"
  style="display: none"
  onclick="navigate('/login')"
>
  <span
    class="inline-flex items-center justify-center w-full h-12 rounded-full bg-black"
    id="getStartedButton"
  >
    <span
      class="text-white whitespace-nowrap p-4 font-medium text-sm"
      id="getStartedButtonText"
      >Get Started</span
    >
  </span>
</button>
</div>`
}



