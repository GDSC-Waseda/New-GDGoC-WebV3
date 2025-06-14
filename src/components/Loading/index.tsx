import Image from "next/image";

// components/Loading.tsx

const Loading = () => {
  return (
    <div id="loader-wrapper">
      <Image
        src="/loader.jpg"
        alt="Loading..."
        id="loader-image"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Loading;
