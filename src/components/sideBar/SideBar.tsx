import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import NavItem from "./NavItem";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [activeNavName, setActiveNavName] = useState<string>("dashboard");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // Track window width

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Add event listener for resize

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and unmount

  // Toggle menu visibility based on window width
  useEffect(() => {
    if (windowWidth < 1024) {
      setIsMenuActive(false); // Hide menu on small screens
    } else {
      setIsMenuActive(true); // Show menu on larger screens
    }
  }, [windowWidth]);

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[250px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* logo */}
      <Link to="/">
        <img
          src={
            "data:image/png;base64,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8jm2t7rtCZNdBMvL7xQ86D38VOfaCqoUFLlaeWUfN6V7xp+2EQVPDu98lb9r6kAhlSQDt+pz9OzjpnSa+Cituu1x225Z5ga8cwqoxJnuEB1Ih9s6Jx7M1A/E+FFGjenv1s5gV03cRVcpQgJuPVPrVi/Sur4WbU7+9ny1omdzfWn+N4kqyaBv91n44dbWifrjZHswfgsK6BSJiySa501QXieaSlKM0buGjdRCS51kmB6LGKyoOkXBVz57pzMu3Z4IKnEZjMAMKYy4QbqFXIPYpJVuTwjbqNxnb/r2PhwhN8VjoCrJkH0V/UxDntmLXTl/nWGrtwV/gUdi/Wle8+q+RSF0l8TeHNovTVTyDV894BELN8Tr9DEen9THFQo3Ke5vj+kPnY+t/vMMPPKD+gJ7la8rn+l3rWViDp3vSFTqNEah+oLG6TeST1iIl4+5/YdZ8nRrG1+E6jmanV0jUqx/X1R3Nm0mX9tIf2L/Z1/MYDuZoUeOEjqNH3YoQFrJxLw5TRIXoDNNv7vY3e/FdLRlgULwcf9p1qlSoSODee2tP9JkCQBseX12Kkurs2xM+qNxvT7+6X/1lgWL2U4KsG5yvt29TxezztHdk1Q6EsfXEOf/gEIq/VmcShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShSgm1f9/E09fxTovjb84uo/A/AxroCWRfYX6BlTiTntGNefwNzlNF86/bv0DKMc6Q7gv4P+4CJHP8Tyx9hpXBMPSh0J+C8yyR1a8Tl+s+2fozMSZ6nzMvQJd9z/RbqNkS+YImiuln80rZvE4LHT6XQJ97Y7HA6H4z/P/wCgK9nyPoyYzwAAAABJRU5ErkJggg=="
          }
          alt="logo"
          className="w-24 h-8 lg:hidden"
        />
      </Link>
      {/* menu burger icon */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="h-6 w-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="h-6 w-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* sidebar container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* underlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* sidebar */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              <img
                src={
                  "data:image/png;base64,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8jm2t7rtCZNdBMvL7xQ86D38VOfaCqoUFLlaeWUfN6V7xp+2EQVPDu98lb9r6kAhlSQDt+pz9OzjpnSa+Cituu1x225Z5ga8cwqoxJnuEB1Ih9s6Jx7M1A/E+FFGjenv1s5gV03cRVcpQgJuPVPrVi/Sur4WbU7+9ny1omdzfWn+N4kqyaBv91n44dbWifrjZHswfgsK6BSJiySa501QXieaSlKM0buGjdRCS51kmB6LGKyoOkXBVz57pzMu3Z4IKnEZjMAMKYy4QbqFXIPYpJVuTwjbqNxnb/r2PhwhN8VjoCrJkH0V/UxDntmLXTl/nWGrtwV/gUdi/Wle8+q+RSF0l8TeHNovTVTyDV894BELN8Tr9DEen9THFQo3Ke5vj+kPnY+t/vMMPPKD+gJ7la8rn+l3rWViDp3vSFTqNEah+oLG6TeST1iIl4+5/YdZ8nRrG1+E6jmanV0jUqx/X1R3Nm0mX9tIf2L/Z1/MYDuZoUeOEjqNH3YoQFrJxLw5TRIXoDNNv7vY3e/FdLRlgULwcf9p1qlSoSODee2tP9JkCQBseX12Kkurs2xM+qNxvT7+6X/1lgWL2U4KsG5yvt29TxezztHdk1Q6EsfXEOf/gEIq/VmcShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShScShSgm1f9/E09fxTovjb84uo/A/AxroCWRfYX6BlTiTntGNefwNzlNF86/bv0DKMc6Q7gv4P+4CJHP8Tyx9hpXBMPSh0J+C8yyR1a8Tl+s+2fozMSZ6nzMvQJd9z/RbqNkS+YImiuln80rZvE4LHT6XQJ97Y7HA6H4z/P/wCgK9nyPoyYzwAAAABJRU5ErkJggg=="
                }
                alt="logo"
                className="w-24 h-8"
              />
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7]">MAIN MENU</h4>
            {/* menu items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              <NavItem
                title="Dashboard"
                link="/dashboard"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Contests"
                link="/dashboard/contests"
                icon={<FaComments className="text-xl" />}
                name="contests"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Users"
                link="/dashboard/users"
                icon={<FaUser className="text-xl" />}
                name="users"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Terms & Conditions"
                link="/dashboard/terms_and_conditions"
                icon={<FaUser className="text-xl" />}
                name="terms"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Privacy Policy"
                link="/dashboard/privacy_policy"
                icon={<FaUser className="text-xl" />}
                name="policy"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SideBar;
