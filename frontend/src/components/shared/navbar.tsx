import {
  MenuIcon,
  SettingsIcon,
  UserIcon,
  WarningTriangleIcon,
} from "@iconicicons/react";
import { Avatar, Button } from "@lemonsqueezy/wedges";
import { Link } from "@tanstack/react-router";
import { BugPlayIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import useAuth from "../../hooks/use-auth";
import { CountDownTimerButton } from "../countdown-timer-button";
import { VaulDrawer } from "./drawer";
import { TooltipWrapper } from "./tooltip-wrapper";
import useFetchProblemList from "../../hooks/queries/use-fetch-problem-list";

export const Navbar = () => {
  const { user } = useAuth();
  const { data } = useFetchProblemList();

  return (
    <>
      <header className="sticky top-0 flex justify-between h-14 items-center gap-4  bg-surface-50 px-4 md:px-6">
        <nav className=" flex-col gap-6 h-9 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <span className="sr-only">
            Opens up the drawer with question list
          </span>
          <Link
            href="#"
            className="hidden text-primary text-lg lg:flex transition-colors hover:text-foreground"
          >
            IS
          </Link>
          <VaulDrawer
            button={
              <Button
                before={<MenuIcon className="w-4 h-4" />}
                variant="outline"
                className="text-muted-foreground h-9 bg-white transition-colors hover:text-foreground"
              >
                Problem List
              </Button>
            }
            content={
              <div className="h-[890px] overflow-auto">
                {data?.data.map((problem) => (
                  <Link
                    key={problem?.id}
                    to={"/problems/$problem-slug"}
                    params={{ "problem-slug": problem?.slug }}
                    className="flex items-center gap-2 hover:bg-gray-100 rounded-md p-2"
                  >
                    <span>{problem?.name}</span>
                  </Link>
                ))}
              </div>
            }
          />
        </nav>
        <div className="flex h-9 justify-end items-center gap-2">
          <TooltipWrapper
            button={
              <Button
                before={<BugPlayIcon className="w-4 h-4" />}
                className="h-9 bg-white"
                variant="outline"
              >
                Run
              </Button>
            }
            text="Run your code"
          />

          <TooltipWrapper
            button={
              <Button className="h-9" variant="primary">
                Submit
              </Button>
            }
            text="Submit your code"
          />
        </div>
        <div className="flex items-center gap-3">
          <CountDownTimerButton />
          <Button className="h-9 cursor-pointer" variant="primary">
            Upgrade
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar
                alt="user profile pic"
                className="cursor-pointer border-2 border-primary"
                src={user?.avatarUrl}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white w-[180px] mr-2">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 rounded-md">
                  <UserIcon />
                  <span>My Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 rounded-md">
                  <SettingsIcon />
                  <span>Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 rounded-md">
                  <WarningTriangleIcon />
                  <span>Report</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2 group hover:bg-red-500 rounded-md">
                  <LogOutIcon
                    className="text-red-500 group-hover:text-white"
                    size={18}
                  />
                  <span className="text-red-500 group-hover:text-white">
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};
