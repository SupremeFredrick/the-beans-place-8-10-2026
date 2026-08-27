import HeroSection from "./components/HeroSection";
import FooterSection from "./components/FooterSection";
import NavBar from "./components/NavBar";
import RibbonTicker from "./components/RibbonTicker";
import FeaturesSection from "./components/FeaturesSection";
import ProductShowcase from "./components/ProductShowcase";
import AboutSection from "./components/AboutSection";
import CtaSection from "./components/CtaSection";
import ContactSection from "./components/ContactSection";

// PROVIDERS
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
    return (
        <AuthProvider>
          <CartProvider>
            <div className="app">
                {/* NAVBAR */}
                <NavBar />
                {/* HERO */}
                <section className="hero bg-hero">
                    <div className="hero-grid">
                        <HeroSection />
                    </div>
                </section>
                <RibbonTicker />
                {/* FEATURES/CAROUSLE */}
                <section className="features bg-features" id="shop"></section>
                <FeaturesSection />

                {/* PRODUCT SHOWCASE */}
                <section className="bg-cta">
                    <ProductShowcase />
                </section>

                {/* CTA */}
                <section className="bg-cta">
                    <CtaSection />
                </section>
                {/* ABOUT */}
                <section className="bg-cta" id="about">
                    <AboutSection />
                </section>
                {/* CONTACT */}
                <section className="bg-cta" id="contact">
                    <ContactSection />
                </section>
                {/* FOOTER */}
                <section className="bg-footer">
                    <FooterSection />
                </section>
            </div>
          </CartProvider>
        </AuthProvider>
    );
}
