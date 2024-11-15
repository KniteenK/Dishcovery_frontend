// import React from "react";

// export const Hero = (props) => {
//   return (
//     <header id="header">
//       <div className="intro flex items-center w-full bg-white justify-center h-screen mb-12  bg-center bg-cover bg-[url('/guestImages/hero1.jpg')]">
//         <div className="overlay">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-8 col-md-offset-2 intro-text">
//                 <h1>
//                   {props.data ? props.data.heading : "Loading"}
//                   <span></span>
//                 </h1>
//                 <p>{props.data ? props.data.message : "Loading"}</p>
//                 <a
//                   href="#features"
//                   className="btn btn-custom btn-lg page-scroll"
//                 >
//                   Learn More
//                 </a>{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };


import React from "react";

export const Hero = ({ heading, message }) => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-white mb-12 bg-fixed bg-cover bg-center" 
     style={{ backgroundImage: "url('/guestImages/hero1.jpeg')" }}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] flex flex-col">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <div className=" py-10 flex justify-around ">
          <a href="/sign-in">
            <button className="px-8 py-2 border">Login</button>
          </a>
          <a href="/sign-up">
            <button className="px-8 py-2 border">Signup</button>
          </a>
        </div>
      </div>
    </div>
  );
};

