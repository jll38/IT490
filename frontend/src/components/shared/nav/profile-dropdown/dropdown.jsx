import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import "./styles.css";

export const Dropdown = ({user}) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <PersonIcon fontSize={"36px"}/> {user}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            Profile
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem" asChild>
            <a href={'/settings'}>Settings</a>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" asChild>
          <button
            onClick={() => {
              localStorage.removeItem('access_token');
              window.location.assign("/");
            }}
          >
            Sign Out
          </button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
