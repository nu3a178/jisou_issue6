import Image from "next/image";

export const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center mb-4 w-full h-[300px] relative bg-gray-400">
      <Image
        className="absolute"
        src="https://picsum.photos/600/300"
        alt="Random Image"
        width={600}
        height={300}
      />
      <p className="absolute left-2 top-2 z-10 text-white text-2xl font-bold">
        {title}
      </p>
    </div>
  );
};
