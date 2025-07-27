import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[100vh] pt-16">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout; 