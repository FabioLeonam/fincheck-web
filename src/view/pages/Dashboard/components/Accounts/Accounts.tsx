import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccountCard } from "./AccountCard";
import 'swiper/css';
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountController } from "./useAccountsController";


export function Accounts(){

  const { sliderState, setSliderState } = useAccountController();
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
        <span className="text-white tracking-[0,5px] block">Saldo total</span>
        <div className="flex items-center gap-2">
        <strong className="text-2xl tracking-[-1px] text-white">
          R$ 1000,00
        </strong>

        <button className="h-8 w-8 flex items-center justify-center">
          <EyeIcon open/>
        </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
        <Swiper
          spaceBetween={16}
          slidesPerView={2.1}
          onSlideChange={swiper => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            })

          }}
        >
          <div className="flex item-center justify-between mb-4" slot="container-start">
            <strong className="text-white tracking-[-1px] text-lg">
              Minhas contas
            </strong>
            <AccountsSliderNavigation  isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
          </div>
            <SwiperSlide>
              <AccountCard color="#7950F2" name="Nubank" balance={1000.23} type="CHECKING"/>
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard color="#333" name="XP Investimentos" balance={1000.23} type="INVESTMENT"/>
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard color="#0f0" name="Carteira" balance={1000.23} type="CASH"/>
            </SwiperSlide>
        </Swiper>
        </div>
      </div>
    </div>
  )
}
