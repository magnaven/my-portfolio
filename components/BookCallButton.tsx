"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { contactContent } from "@/content/contact";

export function BookCallButton({ className }: { className?: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      data-cal-link={contactContent.calLink}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      Book a call
    </button>
  );
}
