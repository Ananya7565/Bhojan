
import Image from 'next/image';
import { RiArrowRightSLine } from 'react-icons/ri';
import Link from 'next/link';
import '../app/styles.css';
import '../app/globals.css';



export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: "url('/images/home-pic.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  return (
   <main>
<div
  style={backgroundImageStyle} className="h-screen"
  >
  <div
    class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
    <div class="flex h-full items-center justify-center">
      <div class="text-white text-center">
        <h2 class="font-Playfair mb-4 text-4xl font-bold">BHOJAN</h2>
        <h4 class=" mb-6 text-xl font-semibold">Your Personal Recipe Guru</h4>
        <Link href="/h">
        <button
          type="button"
          class="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-black hover:bg-opacity-6 hover:text-white hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
          data-te-ripple-color="light">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  </div>
</div>
</main>
  )
}





