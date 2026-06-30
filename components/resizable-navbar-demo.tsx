// "use client";
// import { handleGoogleSignIn } from "@/app/_actions/authAction";
// import {
//   Navbar,
//   NavBody,
//   NavItems,
//   MobileNav,
//   NavbarLogo,
//   NavbarButton,
//   MobileNavHeader,
//   MobileNavToggle,
//   MobileNavMenu,
// } from "@/components/ui/resizable-navbar";
// import { authClient } from "@/lib/auth-client";
// import { useState } from "react";

// export default function NavbarDemo() {
//   // const navItems = [
//   //   {
//   //     name: "Features",
//   //     link: "#features",
//   //   },
//   //   {
//   //     name: "Pricing",
//   //     link: "#pricing",
//   //   },
//   //   {
//   //     name: "Contact",
//   //     link: "#contact",
//   //   },
//   // ];

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//  const {data:session } = authClient.useSession();
//   const isLoogedIn = !!session?.user;


//   return (
//     <div className="relative w-full">
//       <Navbar>
//         {/* Desktop Navigation */}
//         <NavBody>
//           <NavbarLogo />
//           {/* <NavItems items={navItems} />  */}
//           <div className="flex items-center gap-4">
//             {!isLoogedIn && 
//               <NavbarButton onClick={handleGoogleSignIn} className="bg-pink-200"  variant="secondary">Sign in</NavbarButton>
//             }
//             {isLoogedIn &&
//               <NavbarButton variant="secondary" href="/Dashboard">Dashboard</NavbarButton>
  
//             }
//           </div>
//         </NavBody>

//         {/* Mobile Navigation */}
//         <MobileNav>
//           <MobileNavHeader>
//             <NavbarLogo />
//             <MobileNavToggle
//               isOpen={isMobileMenuOpen}
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             />
//           </MobileNavHeader>

//           <MobileNavMenu
//             isOpen={isMobileMenuOpen}
//             onClose={() => setIsMobileMenuOpen(false)}
//           >
//             {/* {navItems.map((item, idx) => (
//               <a
//                 key={`mobile-link-${idx}`}
//                 href={item.link}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="relative text-neutral-600 dark:text-neutral-300"
//               >
//                 <span className="block">{item.name}</span>
//               </a>
//             ))} */}
//             <div className="flex w-full flex-col gap-4">
//               <NavbarButton
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 variant="primary"
//                 className="w-full"
//               >
//                 Login
//               </NavbarButton>
//               <NavbarButton
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 variant="primary"
//                 className="w-full"
//               >
//                 Book a call
//               </NavbarButton>
//             </div>
//           </MobileNavMenu>
//         </MobileNav>
//       </Navbar>
//       {/* Navbar */}
//     </div>
//   );
// }
