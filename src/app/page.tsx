import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-black">
    <h1> Hello Suckers;-)</h1>
    <div>
      <button> Enable location</button>
      <input type="text" placeholder="Enter your location" />
      <button> Search</button>
    </div>
    </div>
  );
}
