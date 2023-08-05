import { useState } from "react";

export function useAccountController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });


  return {
    sliderState,
    setSliderState
  }
}
