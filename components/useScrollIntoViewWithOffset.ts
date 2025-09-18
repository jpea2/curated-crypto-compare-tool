import { RefObject } from 'react';

export function scrollIntoViewWithOffset<T extends HTMLElement>(ref: RefObject<T>, offset = 0) {
  const element = ref.current;
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: elementTop - offset,
    behavior: 'smooth',
  });
}

