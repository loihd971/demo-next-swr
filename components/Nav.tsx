import React, { useMemo, useState } from "react";
import {
  Navbar,
  Link as NextUiLink,
  Text,
  Avatar,
  Dropdown,
} from "@nextui-org/react";
import { FaLayerGroup } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {};

enum Page {
  HOME = "HOME",
  SWR = "SWR",
  NEXTJS = "NEXTJS",
}

export default function Nav({}: Props) {
  const router = useRouter();
  const collapseItems = ["Home", "Posts", "Log Out"];
  const [currentActivePage, setCurrentActivePage] = useState<Page>(Page.HOME);

  const onSelectNav = (value: Page) => {
    setCurrentActivePage(value);
  };
  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <FaLayerGroup
          onClick={() => router.push("/")}
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="underline-rounded"
      >
        <Link
          href="/"
          className={currentActivePage === Page.HOME ? "active" : "inactive"}
          onClick={(e: any) => onSelectNav(e.target.innerText)}
        >
          {Page.HOME}
        </Link>
        <Link
          href="/swr"
          className={currentActivePage === Page.SWR ? "active" : "inactive"}
          onClick={(e: any) => onSelectNav(e.target.innerText)}
        >
          {Page.SWR}
        </Link>

        <Link
          href="/nextjs"
          className={currentActivePage === Page.NEXTJS ? "active" : "inactive"}
          onClick={(e: any) => onSelectNav(e.target.innerText)}
        >
          {Page.NEXTJS}
        </Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>

            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <NextUiLink
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </NextUiLink>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
