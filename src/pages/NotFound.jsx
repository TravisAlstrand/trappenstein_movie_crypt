import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-neutral-800 py-8 text-center font-montserrat text-white">
      <h1 className="mb-6 font-metal text-5xl md:text-6xl">RUH ROH!</h1>
      <h2 className="mb-8text-2xl mb-8 font-bold text-white">Page Not Found</h2>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold shadow-md shadow-neutral-950 transition-all hover:scale-105 hover:bg-blue-700"
      >
        Home
      </Link>
    </main>
  );
};

export default NotFound;
