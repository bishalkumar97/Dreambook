import { cn } from "@/Utilities/cn";

export default function Link({children, className, ...attibutes}) {
  return (
    <a {...attibutes} className={cn("focus-visible:outline-none cursor-pointer focus-visible:underline hover:underline", className)}>{children}</a>
  )
}
