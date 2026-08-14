// ============================================================
// FOOTERSECTION.JSX — Site Footer with Map (Day 3)
// ============================================================
// The Footer contains a Leaflet map showing the store location,
// navigation columns (Shop, Company, Support), social media
// icons, and copyright info.
//
// WHAT YOU WILL LEARN:
// - Using third-party libraries (Leaflet) for interactive maps
// - useEffect with useRef to manage non-React DOM elements
// - Organizing navigation data as objects/arrays
// - Rendering lists with .map()
// - SVG icons as React components (function that returns JSX)
// - Dynamic values like currentYear with new Date().getFullYear()
//
// CONCEPTS COVERED:
// - useEffect cleanup (map.remove())
// - useRef to hold a DOM reference and a mutable value
// - Passing render functions as props (icon components)
// - ScrollReveal for scroll-triggered animations
//
// ============================================================

// STEP 1: Imports
// From "react": import { useEffect, useRef }
// From "leaflet": import L from "leaflet"
// Also import: "leaflet/dist/leaflet.css"
// Import UI components: Separator, ScrollReveal
// Import the logo: import logo from "../assets/Beans_logo.png"

/* --- YOUR IMPORTS GO HERE --- */


// STEP 2: Navigation data (outside the component)
// Create a `navigation` object with these keys:
//   shop: array of { name, href } objects
//     - "All Coffee" -> #shop, "Single Origin" -> #shop,
//       "Blends" -> #shop, "Subscriptions" -> #
//   company: array of { name, href } objects
//     - "About" -> #about, "Our Roastery" -> #about,
//       "Careers" -> #, "Press" -> #
//   support: array of { name, href } objects
//     - "Contact Us" -> #contact, "Shipping & Returns" -> #,
//       "FAQ" -> #, "Wholesale" -> #contact
//   social: array of { name, href, icon } objects
//     - Facebook, Instagram, X (Twitter)
//     - Each icon is a function: (props) => <svg ...>{path}</svg>
//
// Also: const currentYear = new Date().getFullYear();

/* --- YOUR DATA OBJECTS GO HERE --- */


// STEP 3: LocationMap component (helper component)
// function LocationMap() { ... }
//   - Use useRef for mapRef (DOM element) and mapInstance (Leaflet map)
//   - In useEffect, create the map at coordinates [39.7386, -104.3256]
//   - Add a dark tile layer from CARTO
//   - Add a custom marker with a popup
//   - Return cleanup function that calls map.remove()
//   - Render: <div ref={mapRef} className="footer-map" />

/* --- YOUR LOCATIONMAP COMPONENT GOES HERE --- */


// STEP 4: Create and export FooterSection
// export default function FooterSection() { ... }
//
// JSX Structure:
//   <footer className="footer">
//     <div> (container with max-width and padding)
//       - <LocationMap /> wrapped in ScrollReveal
//       - Grid with 4 columns:
//         Column 1: Logo image + description text + social icons
//         Column 2: "Shop" links rendered with .map()
//         Column 3: "Company" links rendered with .map()
//         Column 4: "Support" links rendered with .map()
//       - <Separator />
//       - Copyright line using {currentYear}

/* --- YOUR COMPONENT CODE GOES HERE --- */
// react hooks: useEffect runs code after render; useRef sores a value/ DOM ref that survives re-render w/o causing one 
import { useEffect, useRef } from "react";
//Leaflet: library for interactive apps
import L from "leaflet"
//Leaflets stylesheet
import "leaflet/dist/leaflet.css"
// custom reusable UI components
import Separator from "./ui/Separator"
import ScrollReveal from "./ui/ScrollReveal"
import logo from "../assets/Beans_logo.png"

const navigation = {
  shop: [
    { name: "All Coffee", href: "#shop" },
    { name: "Single Origin", href: "#shop" },
    { name: "Blends", href: "#shop" },
    { name: "Subscriptions", href: "#" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Our Roastery", href: "#about" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Contact Us", href: "#contact" },
    { name: "Shipping & Returns", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Wholesale", href: "#contact" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: FacebookIcon },
    { name: "Instagram", href: "#", icon: InstagramIcon },
    { name: "X", href: "#", icon: XIcon },
  ],
};
// socials 
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.5 21v-8h2.5l.5-3h-3V7.2c0-.9.3-1.5 1.6-1.5H16V2.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7v3h2.5v8h4Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A5.8 5.8 0 1 1 6.2 13 5.8 5.8 0 0 1 12 7.2Zm0 2A3.8 3.8 0 1 0 15.8 13 3.8 3.8 0 0 0 12 9.2Zm5.3-3.1a1.3 1.3 0 1 1-1.3 1.3 1.3 1.3 0 0 1 1.3-1.3Z" fill="currentColor" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18.9 2h3.5l-7.6 8.7L22.8 22h-6.9l-5.4-7.7L4.7 22H1.2l8.1-9.3L1.2 2h7l4.9 7.1L18.9 2Zm-1.2 18h1.9L7.2 3.9H5.2L17.7 20Z" fill="currentColor" />
    </svg>
  );
}

    // grab year once soo copyright line stays accuarte
    const currentYear = new Date().getFullYear();
    //leaflet map component
        function LocationMap(){
            // mapRef -> div its amplifying the amp
            const mapRef = useRef(null);
            //map instance stores created map
            const mapInstance = useRef(null);
            // runs once component mounts (empty [] at end = run once)
            useEffect (() => {
                // stop if map alr exists or tgt div inst ready
                if (mapInstance.current || !mapRef.current) return;
                //cords
                const lat = 39.7386;
                const lng = 104.3256;
                //creates map
                const map= L.map(mapRef.current, {
                    center: [lat,lng],
                    zoom:14,
                    scrollWheelZoom: false,
                    zoomControl: true,
                    attributionControl: true
                })
                // warm toned tile layer
                // Use a warm-toned tile layer
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 19
        }).addTo(map);

        // Custom marker
        const icon = L.divIcon({
            className: "leaflet-map-pin",
            html: `<div style="
                width:36px;height:36px;border-radius:50%;
                background:linear-gradient(135deg,var(--amber),var(--amber-dark));
                display:flex;align-items:center;justify-content:center;
                box-shadow:0 4px 14px rgba(212,146,42,0.5);
                border:3px solid var(--cream);
            "><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5'><path d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'/><path d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'/></svg></div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -38]
        });

        // Place the marker and attach a click-to-open popup with the address
        L.marker([lat, lng], { icon })
            .addTo(map)
            .bindPopup(
                `<div style="font-family:var(--font-body);text-align:center;padding:4px 0;">
                    <strong style="font-size:15px;color:#1e1714;">Beans Place</strong>

                    <span style="font-size:13px;color:#6b5c4f;">Strasburg, CO 80136</span>

                    <a href="https://maps.google.com/?q=Beans+Place+Strasburg+CO" target="_blank" rel="noopener noreferrer"
                       style="font-size:12px;color:#d4922a;font-weight:600;">Get Directions →</a>
                </div>`
            );
            
            //Remember the finished map (used by guard clause above)
            mapInstance.current=map
            
            //cleanup: remove the map if the component unmounts
            return () => {
                map.remove()
                mapInstance.current=null
            }
            }, [])
            
            return(
                // empty div leaflet fills with the map
                <div ref={mapRef} className="footer-map" style={{width:"100%", overflow:"hidden"}}/>
            )
        }
    
//main footer component used on page
export default function FooterSection() {
    return(
        <footer className="footer">
            <div className="mx-auto amx-w-7x1 px-6 pb-8 pt-16 sm:pt-24 lg:pt-32 2x1:max-w-400">
                {/* map wrapped in ScollReveal so it fades into view on scroll */}
                <ScrollReveal animation="fadeUp">
                    <LocationMap />
                </ScrollReveal>
                {/* footer colums 2 on small 4 on med+ */}
                <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* first column logo descrip + social icons */}
                    <ScrollReveal animation="fadeup" className= "col-span-2 md:col-span-1 space-y-4">
                        <img
                            alt="The Beans Place Logo"
                            src={logo}
                            className="h-24 w-auto place-self-center md:place-self-auto"
                        />
                        <p className="footer-description justify-self-center text-center md:justify-self-auto md:text-left">
                            Premium coffee beans, roasted to order and shipped fresh from our roastery to your cup since 2012.
                        </p>
                        {/* loop over social links rendering each icon as a link */}
                        <div className="flex gap-x-6 justify-self-center md:justify-self-auto">
                            {navigation.social.map((item)=>(
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-white/70 transition-colors hover:textd-(--amber) duration-200"
                                    aria-label={item.name}
                                >    
                                    <item.icon aria-hideen="true" className="size-6" />
                                </a>
                            ))}
                        </div>
                    </ScrollReveal>
                    {/* shop column - built by looping over navigation.shop */}
                    <ScrollReveal animation="fadeUp" delay={0.1}>
                            <h4 className="footer-col">
                                Shop
                            </h4>
                            <ul role="list" className="footer-links mt-4">
                                {navigation.shop.map((item)=> (
                                    <li key={item.name}>
                                        <a href={item.href}>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                                
                            </ul>
                    </ScrollReveal>
                    {/* company column - delay 0.2 = reveal just after shop */}
                    <ScrollReveal animation="fadeUp" delay={0.2}>
                        <h4 className="footer-col">Company</h4>
                        <ul role="list" className="footer-links mt-4">
                            {navigation.company.map((item)=>(
                                <li key={item.name}>
                                    <a href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </ScrollReveal>
                    {/* support column - delay 0.3 = reveal last */}
                    <ScrollReveal animation="fadeUp" delay={0.3}>
                        <h4 className="footer-col">Support</h4>
                        <ul role="list" className="footer-links mt-4">
                            {navigation.support.map((item)=>(
                                <li key={item.name}>
                                    <a href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </ScrollReveal>
                </div>
                {/* divider line above copyright row */}
                <Separator className="mt-16 mb-6"/>
                {/* bottom bar w/ dynamic copyright year */}
                <div className="footer-bottom">
                    <p>
                        &copy; {currentYear} The Beans Place, LLC. All rights reserved.
                    </p>
                </div>
                
            </div>
        </footer>
    )
}