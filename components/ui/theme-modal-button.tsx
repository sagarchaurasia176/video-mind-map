// "use client"

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"
// // import { DropdownMenuContent, DropdownMenuItem , DropdownMenuTrigger , DropdownMenu } from "../animate-ui/primitives/radix/dropdown-menu"
// import { Button } from "@radix-ui/themes"


// //Mode - Toggle :
// export function ThemeModeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">
//           <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent 
//         align="end"
//         className="min-w-[8rem] bg-popover text-popover-foreground border border-border rounded-md shadow-md p-1 z-50"
//       >
//         <DropdownMenuItem 
//           onClick={() => setTheme("light")}
//           className="px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground outline-none"
//         >
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem 
//           onClick={() => setTheme("dark")}
//           className="px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground outline-none"
//         >
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem 
//           onClick={() => setTheme("system")}
//           className="px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground outline-none"
//         >
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
