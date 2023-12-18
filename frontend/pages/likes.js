import Link from 'next/link';
import '../app/styles.css';
import '../app/globals.css';

const NewPage = () => {
  return (
    <main>
    <header className="bg-blue-500 py-4 px-8  ">
      <h1 className="text-2xl font-semibold">My Recipe App</h1>
    </header>
    <Link href='/abc'>click</Link>
    </main>
  );
};

export default NewPage;
