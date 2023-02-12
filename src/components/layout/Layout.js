import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="--pad" style={{ minHeigth: "80vh" }}>
        {children}
      </div>

      <Footer />
    </>
  );
}
