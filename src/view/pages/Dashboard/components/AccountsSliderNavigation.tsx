import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountsSliderNavigation(){
  const swiper = useSwiper();


  return (
    <div>
      <button
        onClick={() => swiper.slidePrev()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40">
        <ChevronLeftIcon className="text-white w-6 h-6"/>
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors">
        <ChevronRightIcon className="text-white w-6 h-6"/>
      </button>
    </div>
  )
}
