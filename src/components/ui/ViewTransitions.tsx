'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hooks into the View Transitions API for smooth route morphing.
 * Falls back gracefully in browsers that don't support it.
 */
export default function ViewTransitions() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run if the View Transitions API is available
    if (!('startViewTransition' in document)) return;

    // Add view-transition names to key elements for morphing
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    if (header) {
      (header.style as CSSStyleDeclaration & { viewTransitionName: string }).viewTransitionName = 'header';
    }
    if (main) {
      (main.style as CSSStyleDeclaration & { viewTransitionName: string }).viewTransitionName = 'main-content';
    }
  }, [pathname]);

  return null;
}
