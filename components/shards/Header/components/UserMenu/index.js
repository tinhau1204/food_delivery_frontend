import User from "../User";
import { Menu } from "@mantine/core";
import { FaCogs, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { getUser, logout } from "@/redux/user";
import { BiPaperclip, BiPlus } from "react-icons/bi";

export default function UserMenu() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  // const handleToInformation = () => {
  //     router.push("/userInformation");
  // };

  // const handleToApplication = () => {
  //     router.push("/applications");
  // };

  const handleToOrderHistory = () => {
    router.push("/history");
  };

  return (
    <Menu placement="end">
      <Menu.Target>
        <User />
      </Menu.Target>
      <Menu.Dropdown>
        {user.role == "CUS" ? (
          <>
            {/* <Menu.Item icon={<FaCogs />} onClick={handleToInformation}>
                            Profile
                        </Menu.Item>
                        <Menu.Item
                            icon={<BiPaperclip />}
                            onClick={handleToApplication}
                        >
                            Application
                        </Menu.Item> */}
            <Menu.Item icon={<BiPlus />} onClick={handleToOrderHistory}>
              Order History
            </Menu.Item>
          </>
        ) : (
          <></>
        )}
        <Menu.Divider />
        <Menu.Item color="red" onClick={handleLogout} icon={<FaSignOutAlt />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
