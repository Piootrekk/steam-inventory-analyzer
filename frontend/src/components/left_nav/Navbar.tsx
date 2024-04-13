type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav
      className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
      id="mobile-menu-2"
    >
      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <li
          className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
        >
          Home
        </li>
        <li
          className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
        >
          Inventory
        </li>
        <li
          className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
        >
          Items history
        </li>
        <li
          className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
        >
          Investments
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
