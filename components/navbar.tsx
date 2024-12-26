"use client"

import {
  DiscordIcon,
  GithubIcon,
  SearchIcon
} from "@/components/icons";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { useQueryString } from "@/hooks/use-query-string";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { useDebouncedCallback } from 'use-debounce';

export const Navbar = () => {
  const { router, pathname, searchParams } = useQueryString();
  const value = searchParams.get('search') ?? '';

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const searchInput = (
    <Input
      key={value}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      name="search"
      type="search"
      onChange={(evt) => {
        const value = evt.target.value
        handleSearch(value)
      }}
      defaultValue={value}
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="py-5">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1 py-5" href="/">
            {/* <Logo /> */}
            <p className="font-bold text-inherit">Rick & Morty</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};