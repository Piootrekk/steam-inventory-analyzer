type NavbarProps = {
  children?: React.ReactNode;
};

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-white order-1 bg-gray-800 py-5">
      <div className="p-4">
        <h1 className="text-2xl font-bold pb-5">Dashboard</h1>
      </div>
      <div className="flex-grow">
        <nav className="flex flex-col space-y-4">
          <ul>{children}</ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
