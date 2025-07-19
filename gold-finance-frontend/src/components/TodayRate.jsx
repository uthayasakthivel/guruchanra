import React from "react";

const TodayRate = () => {
  return (
    <div className="w-full max-w-7xl mx-auto ">
      <h2 className="text-2xl md:text-4xl  font-bold leading-snug text-[#1e293b] whitespace-pre-line text-center">
        Today’s Rate
      </h2>

      <div className="flex-1 flex flex-col md:flex-row  justify-between p-6 ">
        {/* Gold Content */}
        <div className="mt-6 flex gap-4 flex-wrap">
          {/* Call Us Button */}
          <button className="hover:cursor-pointer hover-bounce-scale px-8 py-3 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold transition-colors duration-300">
            Call Us
          </button>

          <button className="hover:cursor-pointer hover-bounce-scale px-8 py-3 rounded-full bg-[#334155] hover:bg-[#1e293b] text-white font-semibold transition-colors duration-300">
            Reach Us
          </button>
        </div>
        {/* Silver Content */}
        <div className="flex items-center justify-center p-4">
          <p>asdf</p>
        </div>
      </div>
    </div>
  );
};

export default TodayRate;
