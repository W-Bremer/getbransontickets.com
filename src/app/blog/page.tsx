import { notFound } from "next/navigation";

// Blog is archived — remove this notFound() call to restore
export default function BlogPage() {
  notFound();
}
