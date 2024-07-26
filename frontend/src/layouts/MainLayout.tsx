import Navbar from "../components/Navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
