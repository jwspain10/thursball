"use client";

import React from "react";

type ScrollFades = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export function useScrollFade(
  ref: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = [],
): ScrollFades {
  const [fades, setFades] = React.useState<ScrollFades>({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      setFades({
        top: el.scrollTop > 1,
        bottom: el.scrollHeight - el.scrollTop > el.clientHeight + 1,
        left: el.scrollLeft > 1,
        right: el.scrollWidth - el.scrollLeft > el.clientWidth + 1,
      });
    };

    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return fades;
}
