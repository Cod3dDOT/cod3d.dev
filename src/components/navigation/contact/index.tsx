/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import MailIcon from "@/components/icons/mail";
import MatrixIcon from "@/components/icons/matrix";
import { SectionHeader } from "../header";
import { ContactButton, ContactLink } from "./link";
import GithubIcon from "@/components/icons/github";

const NavContactsShowcase: React.FC = () => {
	return (
		<section className="group/section relative space-y-4">
			<SectionHeader section="Catch me" />
			<div className="flex flex-wrap gap-2 md:max-w-2/3 md:gap-4">
				<ContactLink
					href="https://github.com/cod3ddot"
					text="GitHub"
					subtext="@cod3ddot"
					className="w-44 md:w-48"
				>
					<GithubIcon
						aria-hidden="true"
						focusable="false"
						className="h-full w-7 fill-foreground transition-transform duration-300 group-hover/link:scale-120"
					/>
				</ContactLink>
				<ContactLink
					href="/"
					text="Email"
					subtext="..."
					protectedBytes={[
						0, 0, 0, 0, 0, 110, 7, 10, 18, 51, 100, 46, 100, 101, 118
					]}
					className="w-36"
				>
					<MailIcon
						aria-hidden="true"
						focusable="false"
						className="h-full w-7 fill-foreground transition-transform duration-300 group-hover/link:scale-120"
					/>
				</ContactLink>
				<ContactButton
					text="Matrix"
					subtext="@cod3ddot"
					copy="@cod3ddot:matrix.org"
					className="w-42 md:w-52"
				>
					<MatrixIcon
						aria-hidden="true"
						focusable="false"
						className="h-full w-7 fill-foreground transition-transform duration-300 group-hover/link:scale-120"
					/>
				</ContactButton>
			</div>
			<img
				loading="lazy"
				className="-z-30 image-rendering-pixelated md:-translate-y-1/2 absolute top-0 right-0 aspect-square w-2/3 translate-x-1/2 transition-all duration-300 group-hover/section:translate-x-[calc(50%-1rem)] group-hover/section:scale-110 group-hover/section:hue-rotate-90 md:top-full md:w-1/2"
				src="data:image/webp;base64,UklGRq4BAABXRUJQVlA4TKIBAAAvPoAPEA7KkSRJkpwlDzSBAdAJNvDNoyKyQUC6SUY4WYDJSKeTRmppdBFmG80fYETndM/1fwJu/B/Yvqcz/bstGQ8COhLgDDoeIA068S+tygK6+783/rs7oLsYw6Cn79l2B1cVpLzRdocn0N39nudxXVVkeOzcIOhuL5O6Cj7Ro+0e33tJVbDHoqfvPTujv0Fvv/ec1FVVbEDvPrv9S3Z3252ccejAgh+pBfyTAaf1wMy/UisL+AnuvXjGWTXdEMDA8hQuHic02LYkcUZtaMCbIqdWzCwt3nvPtiGjNleWwH5LWxBXITb4vWfbgyVOs5+X79lxlbCZUkd4ECF1iJ8dU8c4qH6rArOorQrdMvoggKqqSQVz2UHaEcvK5G7ZoJX4GMS9F32QJgJLWQyXHRvQiEdpNd1jDLDN6PVe4ERfvkrKuijFlhQjnWJr+kGSuKfY1nyh6VGe7XMX6AR/424i5ekzXyTlKOAepe/cfdAYpkDuQQr9dC9o+k2x3EgmkjYUThDM0oEbDOQB3PAzbjI5QNqFlHtiApxxmX4C7tl8vf/X"
				alt="pokeball"
			/>
		</section>
	);
};

export default NavContactsShowcase;
