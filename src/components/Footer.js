import React from 'react';
import { FaTwitter, FaFacebookF } from 'react-icons/fa';
import { Link } from 'gatsby';

const Footer = () => (
	<footer className="grid grid-cols-3 py-4">
		<div className="flex flex-col items-center justify-center">
			<a href="https://skills.fund/privacy-policy" target="_blank" rel="noreferrer noopener">
				Privacy Policy
			</a>
			<a href="https://skills.fund/terms-of-use" target="_blank" rel="noreferrer noopener">
				Terms of Use
			</a>
			<Link to="/careers">Careers</Link>
			<Link to="/frequently-asked-questions">FAQ</Link>
		</div>
		<div className="flex flex-col items-center justify-center">
			<div className="flex text-xl mb-2">
				<a href="https://twitter.com/skills_fund" target="_blank" rel="noreferrer noopener">
					<FaTwitter />
				</a>
				<a href="https://www.facebook.com/SkillsFundEd/" target="_blank" rel="noreferrer noopener">
					<FaFacebookF />
				</a>
			</div>
			<p className="text-center">© 2015-{new Date().getFullYear()}, Skills Fund, LLC</p>
		</div>
		<div className="flex flex-col items-center justify-center">
			<p>Customer Service:</p>
			<a href="mailto:customertrust@skills.fund">CustomerTrust@skills.fund</a>
		</div>
	</footer>
);

export default Footer;
