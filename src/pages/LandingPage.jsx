import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-neutral-800 font-montserrat text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-6 font-metal text-5xl md:text-6xl">
          Trappenstein's Movie Crypt
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
          A place where people can search movies, save them to a watchlist, rate
          them, and request reviews.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold shadow-md shadow-neutral-950 transition-all hover:scale-105 hover:bg-blue-700"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-gray-700 px-8 py-3 font-semibold shadow-md shadow-neutral-950 transition-all hover:scale-105 hover:bg-gray-600"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Featured Reviews
        </h2>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {/* Video 1 */}
          <div className="overflow-hidden rounded-lg bg-neutral-800 shadow-md shadow-neutral-950">
            <div className="relative aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Kb81ZQFFVWk"
                https:title="The Dream Child Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Video 2 */}
          <div className="overflow-hidden rounded-lg bg-neutral-800 shadow-md shadow-neutral-950">
            <div className="relative aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/2-rNe01L8Wk"
                title="Annabelle Movie Review"
                https:allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" //www.youtube.com/watch?v=2-rNe01L8Wk
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
