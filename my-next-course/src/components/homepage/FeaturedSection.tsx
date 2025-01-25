import ExploreAllButton from "../ExploreAllButton";

const cards = Array(5).fill(null); // Creates 8 placeholder cards

export default function FeaturedSection() {
  return (
    <div
      className="flex flex-col bg-white w-screen mx-auto"
      style={{ backgroundColor: "lightblue" }}
    >
      {/* Heading */}
      <h1 className="flex py-5 lg:px-20 md:px-10 px-5 font-bold text-4xl text-gray-800 text-center">
        Featured Courses
      </h1>
      {/* Scrollable Card Section */}
      <div className="overflow-x-auto pb-10 hide-scroll-bar snap-x snap-mandatory w-2/3 mx-auto">
        <div className="flex flex-nowrap gap-6 px-5">
          {cards.map((_, index) => (
            <div key={index} className="snap-start w-1/4 min-w-[300px]">
              <div className="w-full h-64 overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-center justify-center">
                <p className="text-lg font-semibold">Card {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "See All" Button  */}

      <div className="flex justify-center mt-4">
        <ExploreAllButton />
      </div>
    </div>
  );
}
