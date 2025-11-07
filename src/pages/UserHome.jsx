import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <main className="min-h-screen bg-neutral-800 font-montserrat text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-6 font-metal text-5xl md:text-6xl">
          Trappenstein's Movie Crypt
        </h1>
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

export default UserHome;
