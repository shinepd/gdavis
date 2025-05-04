import { Separator } from '@/components/ui/separator';
import { HomeHero } from '@/components/sections/home-hero';
import { HomeProducts } from '@/components/sections/home-products';
import { HomeAbout } from '@/components/sections/home-about';
import { HomeProjects } from '@/components/sections/home-projects';
import { HomeCta } from '@/components/sections/home-cta';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HomeHero />
      <HomeProducts />
      <HomeAbout />
      <HomeProjects />
      <HomeCta />
      <Separator />
    </div>
  );
}
