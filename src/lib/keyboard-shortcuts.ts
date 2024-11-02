import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const useKeyboardShortcuts = () => {
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      // Agenda Page Shortcut (Ctrl + 1)
      if (event.ctrlKey && key === "1") {
        event.preventDefault();
        navigate({ to: "/agenda" });
      }

      // Patients Page Shortcut (Ctrl + 3)
      if (event.ctrlKey && key === "2") {
        event.preventDefault();
        navigate({ to: "/patients" });
      }

      // Consultations Page Shortcut (Ctrl + 3)
      if (event.ctrlKey && key === "3") {
        event.preventDefault();
        navigate({ to: "/consultations" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
};

export default useKeyboardShortcuts;
