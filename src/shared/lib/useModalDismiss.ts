import { useEffect, useRef } from "react";

const closers: Array<() => void> = [];
let listening = false;

function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "Escape" || closers.length === 0) return;
  event.preventDefault();
  event.stopPropagation();
  closers[closers.length - 1]();
}

function ensureListener() {
  if (listening) return;
  listening = true;
  window.addEventListener("keydown", onKeyDown, true);
}

function releaseListener() {
  if (closers.length > 0 || !listening) return;
  window.removeEventListener("keydown", onKeyDown, true);
  listening = false;
}

export function useModalDismiss(onClose: () => void) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    ensureListener();
    const close = () => onCloseRef.current();
    closers.push(close);
    return () => {
      const index = closers.lastIndexOf(close);
      if (index !== -1) closers.splice(index, 1);
      releaseListener();
    };
  }, []);
}
