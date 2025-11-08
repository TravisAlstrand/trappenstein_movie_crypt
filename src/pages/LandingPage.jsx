import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-neutral-900 via-neutral-800 to-neutral-900 font-montserrat text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center md:py-24">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-4 font-metal text-5xl drop-shadow-2xl md:text-7xl">
            Trappenstein's Movie Crypt
          </h1>
          <p className="mb-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Welcome to the crypt! Search for your favorite horror flicks, build
            your ultimate watchlist, rate the films that haunt your nightmares,
            and request reviews from yours truly!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-8 py-3 font-semibold shadow-lg shadow-blue-900/50 transition-all hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-900/70"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-linear-to-r from-purple-600 to-purple-700 px-8 py-3 font-semibold shadow-lg shadow-purple-900/50 transition-all hover:scale-105 hover:from-purple-700 hover:to-purple-800 hover:shadow-purple-900/70"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-linear-to-r from-blue-600 via-purple-600 to-blue-600"></div>

      {/* YouTube Videos Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-4xl font-bold">Featured Reviews</h2>
            <p className="text-lg text-gray-400">
              Check out the latest horror movie reviews
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Video 1 */}
            <div className="group overflow-hidden rounded-xl border-2 border-neutral-700 bg-neutral-900/50 shadow-xl transition-all hover:scale-[1.02] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-900/30">
              <div className="relative aspect-video">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/Kb81ZQFFVWk"
                  title="The Dream Child Review"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-200">
                  The Dream Child Review
                </h3>
                <p className="text-sm text-gray-400">
                  A deep dive into this horror classic
                </p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="group overflow-hidden rounded-xl border-2 border-neutral-700 bg-neutral-900/50 shadow-xl transition-all hover:scale-[1.02] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-900/30">
              <div className="relative aspect-video">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/2-rNe01L8Wk"
                  title="Annabelle Movie Review"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-200">
                  Annabelle Movie Review
                </h3>
                <p className="text-sm text-gray-400">
                  Exploring the terror of the haunted doll
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border-2 border-neutral-700 bg-linear-to-br from-neutral-900 to-neutral-800 p-8 text-center shadow-2xl md:p-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Join the Crypt Today
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Create your free account and start exploring the darkest corners of
            horror cinema.
          </p>
          <Link
            to="/signup"
            className="inline-block rounded-lg bg-linear-to-r from-red-600 to-red-700 px-10 py-4 text-lg font-semibold shadow-lg shadow-red-900/50 transition-all hover:scale-105 hover:from-red-700 hover:to-red-800 hover:shadow-red-900/70"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
