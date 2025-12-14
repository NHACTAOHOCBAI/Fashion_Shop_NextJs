import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading2 = () => {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <DotLottieReact
        src="/assets/Running Cat.lottie"
        loop
        autoplay
        className="w-[500px]"
      />
    </div>
  );
};
export default Loading2;
