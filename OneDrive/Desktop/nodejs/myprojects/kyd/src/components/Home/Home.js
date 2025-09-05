import Navbar from "../Navbar/Navbar";
import HeroSection from "../HeroSection/heroSection";
import Footer from "../Footer/footer";
import { ToastContainer } from "react-toastify";
function Home() {
    return <>
        <ToastContainer/>
        <Navbar />
        <HeroSection/>
        <Footer />
    </>
}

export default Home;