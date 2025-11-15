"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const games = [
    {
      name: "Cờ Caro",
      img: "/images/caro-bg.jpg",
      link: "/game/caro",
    },
    {
      name: "Cờ vua",
      img: "/images/chess-bg.jpg",
      link: "/game/chess",
    },
    {
      name: "Đoán số",
      img: "/images/guess-bg.png",
      link: "/game/guess",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-20 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-yellow-300 drop-shadow-lg text-center font-serif">
        🎮 Gami – Nơi hội tụ trò chơi Việt Nam 🇻🇳
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {games.map((game) => (
          <div
            key={game.name}
            className="relative group rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={game.img}
              alt={game.name}
              width={400}
              height={250}
              className="object-cover w-full h-56 sm:h-64"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
              <Link
                href={game.link}
                className="bg-yellow-600 text-black font-semibold px-5 py-2 rounded-xl hover:bg-yellow-500 transition"
              >
                🎯 Chơi ngay
              </Link>
            </div>
            {/* Tên game */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-center py-3 text-lg font-semibold">
              {game.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
