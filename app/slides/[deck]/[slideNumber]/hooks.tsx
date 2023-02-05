import { allSlides } from "contentlayer/generated";
import { useRouter } from "next/navigation";
import { useKeyPress } from "../../hooks";

interface SlideHandlerParams {
  currentSlide: number;
  deck: string;
}

export const useNextSlideKeyPress = ({
  currentSlide,
  deck,
}: SlideHandlerParams): void => {
  const { push } = useRouter();

  useKeyPress(() => {
    const nextSlide = Math.min(
      currentSlide + 1,
      allSlides.filter((slide) => slide.deck === deck).length
    );

    if (nextSlide === currentSlide) return;

    return push(`/slides/${deck}/${nextSlide}`);
  }, ["ArrowRight"]);
};

export const usePrevSlideKeyPress = ({
  currentSlide,
  deck,
}: SlideHandlerParams) => {
  const { push } = useRouter();
  useKeyPress(() => {
    const prevSlide = Math.max(currentSlide - 1, 1);

    if (prevSlide === currentSlide) return;

    return push(`/slides/${deck}/${Math.max(currentSlide - 1, 1)}`);
  }, ["ArrowLeft"]);
};
