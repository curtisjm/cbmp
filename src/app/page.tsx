import { isClerkEnabled } from "@/components/app-providers";
import { PublicHome } from "@/components/public-home";

export default function HomePage() {
  return <PublicHome clerkEnabled={isClerkEnabled()} />;
}
