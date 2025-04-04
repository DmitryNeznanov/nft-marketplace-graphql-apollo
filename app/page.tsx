import Hero from "@/app/components/home/Hero";
import Collections from "@/app/components/home/Collections";
import Creators from "@/app/components/home/Creators";
import Categories from "@/app/components/home/Categories";
import Exploring from "@/app/components/home/Exploring";
import Offer from "@/app/components/home/Offer";
import CTA from "@/app/components/home/CTA";
import Guide from "@/app/components/home/Guide";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "NFT Marketplace | Home",
	description: "NFT Marketplace home page",
};

export default function Home() {
	return (
		<>
			<Hero></Hero>
			<Collections></Collections>
			<Creators></Creators>
			<Categories></Categories>
			<Exploring></Exploring>
			<Offer></Offer>
			<Guide></Guide>
			<CTA></CTA>
			
		</>
	);
}
