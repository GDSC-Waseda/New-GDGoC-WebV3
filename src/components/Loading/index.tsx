import Image from "next/image";

// components/Loading.tsx

const Loading = () => {
  return (
    <div id="loader-wrapper">
      <Image src="/loader.jpg" alt="Loading..." id="loader-image" />
    </div>
  );
};

export default Loading;
