"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Plane, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Import motion from framer-motion

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname(); // Renamed pn to pathname for clarity

  const [isSticky, setIsSticky] = useState(false);

  // Effect to handle scroll events and determine sticky state
  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll position exceeds 100px threshold
      // Using a more robust check for window availability
      setIsSticky(window.scrollY > 100);
    };

    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine header background, text color, and position based on path and sticky state
  const isHomePage = pathname === "/";
  const headerBg = isHomePage && !isSticky ? "bg-transparent" : "bg-gray-900";
  // const headerPosition = isHomePage && !isSticky ? "absolute" : "sticky top-0";
  const headerPosition = isHomePage
    ? isSticky
      ? "fixed top-0"
      : "absolute"
    : "sticky top-0";
  const textColor =
    isHomePage && !isSticky
      ? "text-gray-200"
      : "text-gray-200 md:text-gray-600";
  const logoTextColor =
    isHomePage && !isSticky ? "text-gray-100" : "text-blue-600";
  const navLinkColor =
    isHomePage && !isSticky ? "text-gray-200" : "text-gray-600";
  const authTextColor =
    isHomePage && !isSticky ? "text-white" : "text-gray-600";

  return (
    <motion.header
      initial={false} // Prevents initial animation on mount if not desired
      animate={{
        backgroundColor:
          isHomePage && !isSticky
            ? "rgba(0,0,0,0)"
            : "rgba(255, 255, 255, 0.71)", // Transparent vs gray-900 (hex for Tailwind)
        color: isHomePage && !isSticky ? "rgb(229 231 235)" : "rgb(75 85 99)", // text-gray-200 vs text-gray-600
        backdropFilter: isHomePage && !isSticky ? "blur(0)" : "blur(10px)",
      }}
      transition={{ duration: 0.3 }} // Smooth transition for background and text color
      className={`w-full z-50 ${headerPosition}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <motion.span
              animate={{
                color: isHomePage && !isSticky ? "#f3f4f6" : "#2563eb",
              }} // text-gray-100 vs text-blue-600
              transition={{ duration: 0.3 }}
              className="text-xl font-bold"
            >
              Khyeran
            </motion.span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <motion.div
              animate={{ color: navLinkColor }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </motion.div>
            <motion.div
              animate={{ color: navLinkColor }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/search" className="hover:text-blue-600">
                Flights
              </Link>
            </motion.div>
            <motion.div
              animate={{ color: navLinkColor }}
              transition={{ duration: 0.3 }}
            >
              <Link href="#" className="hover:text-blue-600">
                Hotels
              </Link>
            </motion.div>
            <motion.div
              animate={{ color: navLinkColor }}
              transition={{ duration: 0.3 }}
            >
              <Link href="#" className="hover:text-blue-600">
                About
              </Link>
            </motion.div>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4 text-blue-600" />
                    <motion.span
                      animate={{ color: authTextColor }}
                      transition={{ duration: 0.3 }}
                    >
                      {user.name}
                    </motion.span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors">
                  Get started
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/AuthContext";
// import { Plane, User, LogOut } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// export default function Header() {
//   const { user, logout } = useAuth();
//   const pn = usePathname();

//   const [isSticky, setIsSticky] = useState(false);

//   // Effect to handle scroll events and determine sticky state
//   useEffect(() => {
//     const handleScroll = () => {
//       // Check if scroll position exceeds 100px threshold
//       const scrollPosition = window.scrollY;
//       setIsSticky(scrollPosition > 100);
//     };

//     // Add scroll event listener when component mounts
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup: remove event listener when component unmounts
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`w-full z-50 text-gray-200 ${
//         pn === "/"
//           ? isSticky
//             ? "bg-gray-900 sticky top-0"
//             : "bg-transparent absolute top-0 left-0"
//           : "text-gray-600"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/" className="flex items-center space-x-2">
//             <Plane className="h-8 w-8 text-blue-600" />
//             <span className="text-xl font-bold text-gray-100">Khyeran</span>
//           </Link>

//           <nav className="hidden md:flex space-x-8">
//             <Link href="/" className="hover:text-blue-600">
//               Home
//             </Link>
//             <Link href="/search" className="hover:text-blue-600">
//               Flights
//             </Link>
//             <Link href="#" className="hover:text-blue-600">
//               Hotels
//             </Link>
//             <Link href="#" className="hover:text-blue-600">
//               About
//             </Link>
//           </nav>

//           <div className="flex items-center space-x-4">
//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="flex items-center space-x-2"
//                   >
//                     <User className="h-4 w-4 text-white" />
//                     <span className="text-white">{user.name}</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem onClick={logout}>
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link href="/login">
//                 {/* <Button>Login</Button> */}
//                 <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors">
//                   Get started
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
