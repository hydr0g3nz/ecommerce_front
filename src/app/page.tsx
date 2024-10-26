import Image from "next/image";
import Slider from "./components/Slider";
export const dynamic = 'force-dynamic';
export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <Slider />
    </main>
  );
}
