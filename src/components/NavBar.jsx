// ============================================================
// NAVBAR.JSX — Sticky Navigation Bar (Day 4)
// ============================================================
// The NavBar stays at the top of the page as the user scrolls.
// It includes a logo, navigation links, a CTA button, and a
// mobile hamburger menu with animation.
//
// WHAT YOU WILL LEARN:
// - useState for toggling the mobile menu (true/false)
// - useState for tracking scroll position
// - useEffect for adding/removing event listeners
// - Conditional CSS classes based on state
// - Framer Motion's AnimatePresence for enter/exit animations
// - Accessibility: aria-label and aria-expanded attributes
//
// CONCEPTS COVERED:
// - React Hooks: useState, useEffect
// - Side effects and cleanup (return () => ...)
// - Ternary operator for conditional rendering
// - Template literals for dynamic className strings
// - Helper functions (closeMenu)
//
// ============================================================

// STEP 1: Imports
// From "react": import { useState, useEffect }
// From "framer-motion": import { motion, AnimatePresence }
// Import the logo: import logo from "../assets/Beans_logo.png";
// Import the Button UI component from "./ui/Button"

/* --- YOUR IMPORTS GO HERE --- */
import { useState, useEffect } from "react";
// useState > remembers value between renders, changing it redraws components
// useEffect -> runs code after component appears on screen\
import { motion, AnimatePresence } from "framer-motion";
//animation pulls from Framer Motion
//motion -> animates normal html tags (e.g. <motion.header, etc.>)
//motion underlined with red line, ignore ESLINT pertains to JS and doesnt realize we are using JSX specific items
import logo from "../assets/Beans_logo.png";
import Button from "./ui/Button";

// STEP 2: Create and export the NavBar component
// export default function NavBar() { ... }
//
// STEP 3: State variables (inside the component, before return)
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//
//   DISCUSSION: What does useState(false) mean?
//   - false is the initial value
//   - menuOpen is the current value (true or false)
//   - setMenuOpen is the function to change it
//
// STEP 4: Helper function
//   const closeMenu = () => setMenuOpen(false);
//
// STEP 5: useEffect for scroll detection
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//
//   DISCUSSION: Why do we return a cleanup function?
//   Answer: To remove the event listener when the component unmounts,
//   preventing memory leaks.
//
// STEP 6: Build the JSX (inside return)
//
// Use <motion.header> as the root element:
//   - className: "navbar" + conditionally add "navbar-scrolled" when scrolled is true
//   - Add initial/animate/transition props for entrance animation
//
// Inside the header, create a flex container div:
//   A) BRAND: <a href="#home"> with the logo <img>
//
//   B) DESKTOP NAV: <nav> with className="nav-links hidden items-center gap-10 md:flex"
//      Links: Home (#home), Shop Coffee (#shop), Our Story (#about), Contact (#contact)
//
//   C) DESKTOP CTA: <Button> with "Order Now" text (hidden on mobile: hidden md:inline-flex)
//
//   D) MOBILE HAMBURGER: A <button> visible only on mobile (md:hidden)
//      - Three <span> elements that form the hamburger icon
//      - When menuOpen is true, they transform into an X using CSS transforms
//      - onClick toggles menuOpen
//
// After the flex container, add the MOBILE MENU:
//   Wrap in <AnimatePresence> for smooth enter/exit
//   Conditionally render (menuOpen &&) a <motion.div>
//   Inside: nav links + Button, each calling closeMenu onClick

/* --- YOUR COMPONENT CODE GOES HERE --- */
// navbar pinned to top of page
export default function NavBar() {
    // is mobile drop-down menu open? starts closed (false)
    //menuOpen= current FY, setMenuOpen > function that changes it

    const [menuOpen, setMenuOpen] = useState(false);

    //user scrolled down? used to add a shadow
    const [scrolled, setScrolled] = useState(false);

    // tiny helper so mobile links close when menu tapped
    const closeMenu = () => setMenuOpen(false);
    //watch page scroll position

    useEffect(() => {
        // runs on every scroll, true when scrollY over 20 PX
        const handleScroll = () => setScrolled(window.scrollY > 20);
        //passives wont block scrolling
        window.addEventListener("scroll", handleScroll, { passive: true });
        // return fuinction is cleaning so react runs it when component is removed
        return () => window.removeEventListener("scroll", handleScroll);
        // empty [] means set this up once, not every re-render
    }, []);

    // everything returned here is what shows on screen
    // note in JSX comments are written as {/* */}

    return (
        <motion.header
            className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
            // bar slides down into place upon first load
            // inital = where it starts (80px above, invidible) animate = where it ends
            inital={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {/* template literal build class string. ternary adds "navbar-scrolled only once the user has scrolled down" */}
            {/* mx-auto centers bar, mx-w-7x1 caps width on big monitors; jusify-between pushes logo, links and button apart
                md: prefixes only apply on medium screens and up */}
            <div className="mx-auto flex w-full max-w-7x1 itemrs-center justify-between px-4 py-3 md:px-8">
                {/* Brand */}
                {/* href="#home" jumps to element with id="home" */}
                <a href="#home" className="brand">
                    <img src={logo} alt="Beans Place Logo" className="logo h-12 w-auto md:h-14" />
                </a>
                {/* desktop nav */}
                {/* "hidden... md:flex" = hidden on phones, shown as row on desktop */}
                <nav className="nav-links hideen items-center gap-10 md:flex">
                    <a href="#home">Home</a>
                    <a href="#shop">Shop Coffee</a>
                    <a href="#about">Our Story</a>
                    <a href="#contact">Contact</a>
                </nav>
                {/* desktop CTA */}
                <Button variant="accent" size="sm" className="hidden md:inline-flex">
                    Order Now
                </Button>

                {/* mobile hamburger*/}
                {/* "md:hidden" is opposite of above, button only exists on phones aria-* attributes tell screen readers what the button does and whether menu is currently open */}
                <button
                    type="button"
                    aria-lable={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    // flip menu open/closed on each tap
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden">
                    {/* 3 bars that morph into an x when menu is open */}
                    {/* top bar slides dwn 21 units and rotates 45 degrees */}
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
                    />
                    {/* middle bar simply fades out so x only has 2 strokes */}

                    <span
                        className={`block h-0.5 w-6 bg-black tranisiton-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
                    />
                    {/* btm bar slides up and rotates the other way crossing top one */}
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                    />
                </button>
            </div>
            {/* mobile menu */}
            {/* AnimatePresence allows closing animation to play, without it the menu would vanish instantly when menuOpen becomes false */}
            <AnimatePresence>
                {/* "menuOpen" && (..)" renders the menu ONLY when menuOpen is true */}
                {menuOpen && (
                    <motion.div
                        //overflow-hidden hides links while panel is still sliding open so nothing spills mid animate
                        className="overflow-hidden md:hidden"
                        // animate panels height from 0 to natural size
                        // "exit" happens on way out
                        inital={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}>
                        {/* flex-col stacks mobile links vertically */}
                        <nav className="flex flex-col gap-4 px-6 pb-6 pt-2">
                            {/* every link calls closeMenu so tapping one both jumpsto the sextion AND closes the panel */}
                            <a href="#home" onClick={closeMenu} className="text-base font-semibold">
                                Home
                            </a>
                            <a href="#shop" onClick={closeMenu} className="text-base font-semibold">
                                Shop Coffee
                            </a>
                            <a
                                href="#about"
                                onClick={closeMenu}
                                className="text-base font-semibold">
                                Our Story
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="text-base font-semibold">
                                Contact
                            </a>
                            {/* w-full makes the bttn stretch the full menu width */}
                            <Button
                                variant="accent"
                                size="sm"
                                className="mt-2 w-full"
                                onClick={closeMenu}>
                                Order Now
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
