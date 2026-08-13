import { Badge } from "@/components/ui/badge";
import type { PostCategory } from "@/sanity/lib/types";

const categoryLabels: Record<PostCategory, string> = {
  destination: "Destination",
  guide: "Guide",
  gear: "Gear",
  story: "Story",
};

export function CategoryBadge({ category }: { category: PostCategory }) {
  return (
    <Badge
      variant="secondary"
      className="bg-accent/10 text-accent hover:bg-accent/10"
    >
      {categoryLabels[category] ?? category}
    </Badge>
  );
}
