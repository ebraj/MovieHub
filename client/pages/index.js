import Head from "next/head";
import Card from "../components/Card";

export default function Home({ movies }) {
  return (
    <>
      <Head>
        <title>MovieHub | DBMS Project</title>
        <meta
          name="description"
          content="MovieHub is built using Nextjs and Tailwind CSS."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-[1200px] mx-auto space-y-5">
        <h2 className="text-3xl md:text-4xl font-black">Movies</h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 grid-container">
          {movies?.map((singleData) => {
            return <Card singleData={singleData} key={singleData.movie_name} />;
          })}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fetch("http://localhost:3001/");
  const movies = await data.json();
  return {
    props: {
      movies,
    },
  };
};
