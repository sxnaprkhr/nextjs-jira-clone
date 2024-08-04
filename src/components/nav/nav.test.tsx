import { describe, test, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./nav";
import navConfig from "@/lib/navData";
import { NavDataType } from "./nav.types";
import * as nextAuth from "next-auth/react";
import customHook from "@/hooks";

describe("navbar tests", () => {
  test("navbar when unauthenticated", () => {
    jest.spyOn(nextAuth, "useSession").mockImplementation(() => ({
      data: {
        user: {
          image:
            "https://lh3.googleusercontent.com/a/ACg8ocIzn1Ghv-FlPa1b2nHJQr9XkFTrTNeLGgaBtckGwv89F9Qojg=s96-c",
        },
      },
      status: "unauthenticated",
    }));

    const { queryByText, queryByTestId, getByTestId } = render(
      <Navbar externalNavData={navConfig as NavDataType}></Navbar>
    );

    const yourWork = queryByText("Your Work");
    expect(yourWork).not.toBeInTheDocument();

    const projects = queryByText("Projects");
    expect(projects).not.toBeInTheDocument();

    const filters = queryByText("Filters");
    expect(filters).not.toBeInTheDocument();

    const profile_shimmer = queryByTestId("profile_shimmer");
    expect(profile_shimmer).not.toBeInTheDocument();

    const login_btn = getByTestId("login_btn");
    expect(login_btn).toBeInTheDocument();
  });

  test("navbar when authenticated", () => {
    jest.spyOn(nextAuth, "useSession").mockImplementation(() => ({
      data: {
        user: {
          image:
            "https://lh3.googleusercontent.com/a/ACg8ocIzn1Ghv-FlPa1b2nHJQr9XkFTrTNeLGgaBtckGwv89F9Qojg=s96-c",
        },
      },
      status: "authenticated",
    }));
    const { getByTestId, getByText, queryByTestId } = render(
      <Navbar externalNavData={navConfig as NavDataType}></Navbar>
    );

    const yourWork = getByText("Your Work");
    expect(yourWork).toBeInTheDocument();

    const projects = getByText("Projects");
    expect(projects).toBeInTheDocument();

    const filters = getByText("Filters");
    expect(filters).toBeInTheDocument();

    const profile_shimmer = getByTestId("profile_shimmer");
    expect(profile_shimmer).toBeInTheDocument();

    const login_btn = queryByTestId("login_btn");
    expect(login_btn).not.toBeInTheDocument();
  });

  test("navbar in mobile view", () => {
    jest.spyOn(nextAuth, "useSession").mockImplementation(() => ({
      data: {
        user: {
          image:
            "https://lh3.googleusercontent.com/a/ACg8ocIzn1Ghv-FlPa1b2nHJQr9XkFTrTNeLGgaBtckGwv89F9Qojg=s96-c",
        },
      },
      status: "authenticated",
    }));
    jest.spyOn(customHook, "useWindowDimensions").mockImplementation(() => ({
      windowDimensions: { width: 300, height: 300 },
      isDesktop: false,
    }));
    const { getByTestId, getByText, queryByTestId } = render(
      <Navbar externalNavData={navConfig as NavDataType} />
    );
    const cta = getByTestId("hamburger");
    expect(cta).toBeInTheDocument();
  });
});
