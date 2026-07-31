import { Check, Plus } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry";

export function AddToEnquiryButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { has, add, setOpen } = useEnquiry();
  const added = has(slug);

  return (
    <button
      type="button"
      onClick={() => (added ? setOpen(true) : add(slug))}
      className={className}
    >
      {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {added ? "In Enquiry List" : "Add to Enquiry"}
    </button>
  );
}
