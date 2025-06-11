import { Dropdown, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {
  const navLinks = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/blogs",
      title: "Blogs",
    },
    {
      link: "/about",
      title: "About",
    },
  ];

  return (
    <header className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1
          style={{
            fontFamily: "Rowdies, sans-serif",
            fontWeight: "300",
            fontStyle: "normal",
          }}
          className="text-4xl"
        >
          xTensiver
        </h1>

        <nav>
          <ol>
            <li className="flex gap-4 items-center">
              <Dropdown label="Pages" dismissOnClick={true} inline>
                <DropdownItem>
                  <Link to="/about">About Us</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/contact">Contact Us</Link>
                </DropdownItem>
              </Dropdown>

              {navLinks.map((link) => (
                <Link key={link.link} to={link.link}>
                  {link.title}
                </Link>
              ))}
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
};
export default Header;
