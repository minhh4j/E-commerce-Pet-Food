// import React, { useContext } from "react";
// import Nav from "./Nav"
// import HeroSection from "./HeroSection";
// import Center from "./Center";
// import { ProductContext } from "../Context/ProductContext";
// import Footer from "./Footer";

// function HomePage() {
//   const { search } = useContext(ProductContext);
//   return (
//     <div>
//       <Nav />
//       {search ? (
//         <>
//           <Center />
//           <HeroSection />
//           <Footer />
//         </>
//       ) : (
//         <> 
//           <HeroSection />
//           <Center />
//           <Footer/>
//         </>
//       )}
//     </div>
//   );
// }

// export default HomePage;


import React from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";
import Center from "./Center";
import { useSelector } from "react-redux"; // Using Redux to access state
import Footer from "./Footer";

function HomePage() {
  const search = useSelector((state) => state.search.query); // Accessing the search query from Redux state

  return (
    <div>
      <Nav />
      {search ? (
        <>
          <Center />
          <HeroSection />
          <Footer />
        </>
      ) : (
        <>
          <HeroSection />
          <Center />
          <Footer />
        </>
      )}
    </div>
  );
}

export default HomePage;
