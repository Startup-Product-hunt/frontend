import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[70vh] pt-16">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout; 