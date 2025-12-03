import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <DotLottieReact
        src="/assets/loading-overlay.lottie"
        loop
        autoplay
        className="w-[500px]"
      />
    </div>
  );
};
export default Loading;
