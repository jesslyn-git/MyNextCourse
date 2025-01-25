"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ExploreAllButton from "./ExploreAllButton";

const Navbar = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };
  const handleLogout = async () => {
    const resp = await fetch("/api/logout", {
      method: "POST",
    });
    if (!resp.ok) {
      console.log("Logout failed");
      return;
    }
    console.log("Logout success");
    toast.success("Logout success!");
    router.push("/login");
  };

  const handleWishlist = () => {
    router.push("/wishlists");
  };

  return (
    <div className="sticky top-0 bg-white py-2 text-sm">
      <div className="lg:block hidden">
        <div className="flex items-center justify-between py-2 px-6">
          <div className="flex items-center justify-between space-x-5">
            <Image
              src="/images/logo.svg"
              alt="Logo Image"
              width={200}
              height={200}
              className="logo-image"
              onClick={handleHome}
              style={{ cursor: "pointer" }}
            />
            <ExploreAllButton />
            {/* <form
              action="/"
              method="post"
              className="rounded-md flex items-stretch justify-center overflow-hidden"
            >
              <input
                placeholder="What do you want to learn?"
                className=" p-2 text-sm flex-1 outline-none border-2 border-[#dfdede]"
              />
              <button type="submit" className="p-3 bg-blue-700">
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 16 16"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(-293.000000, -23.000000)"
                  >
                    <g fill="#E1E1E1">
                      <g transform="translate(293.000000, 22.000000)">
                        <path d="M11.355485,11.4503883 L16.0066609,16.1015642 L15.1015642,17.0066609 L10.4503883,12.355485 C9.34711116,13.2583262 7.93681293,13.8 6.4,13.8 C2.8653776,13.8 0,10.9346224 0,7.4 C0,3.8653776 2.8653776,1 6.4,1 C9.9346224,1 12.8,3.8653776 12.8,7.4 C12.8,8.93681293 12.2583262,10.3471112 11.355485,11.4503883 Z M6.4,12.52 C9.22769792,12.52 11.52,10.2276979 11.52,7.4 C11.52,4.57230208 9.22769792,2.28 6.4,2.28 C3.57230208,2.28 1.28,4.57230208 1.28,7.4 C1.28,10.2276979 3.57230208,12.52 6.4,12.52 Z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            </form> */}
          </div>
          <div className="flex items-center justify-between space-x-6">
            <button onClick={handleWishlist}>Wishlists</button>

            <div className="flexStyle space-x-2">
              <button className="logOut" onClick={handleLogout}>
                Log Out
              </button>
            </div>

            <div className="flex gap-5 items-center justify-between">
              <p className="text-blue-700 cursor-pointer">
                <button>Log In</button>
              </p>
              <button className="text-white bg-blue-700 rounded-md py-2 px-4 font-semibold">
                Join for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
