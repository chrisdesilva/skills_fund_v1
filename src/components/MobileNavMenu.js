import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import background from '../images/mobile_bg.png';
import { breakpoint } from '../utils/breakpoints';

export const Menu = styled.nav`
	@media ${breakpoint.lg} {
		display: none;
	}
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-image: url(${background});
	background-repeat: no-repeat;
	background-size: cover;
	transform: ${({ menuOpen }) => (menuOpen ? 'translateX(0)' : 'translateX(100%)')};
	height: 100vh;
	width: 100%;
	text-align: center;
	padding: 2rem;
	position: absolute;
	top: 0;
	right: 0;
	transition: transform 0.3s ease-in-out;
	z-index: 10;
`;

export const ListItem = styled.li`
	margin-bottom: 2rem;
	list-style-type: none;
	a {
		font-size: 1.25rem;
		font-weight: bold;
		text-decoration: none;
		color: white;
	}

	.btn {
		color: black;
	}
`;

const MobileNavMenu = ({ menuOpen }) => {
	return (
		<Menu menuOpen={menuOpen}>
			<ul>
				<ListItem>
					<Link to="/schools">Our Partner Schools</Link>
				</ListItem>

				<ListItem>
					<Link to="/our-process">How It Works</Link>
				</ListItem>

				<ListItem>
					<Link to="/about">Our Team</Link>
				</ListItem>

				<ListItem>
					<Link to="/resources">Student Journey</Link>
				</ListItem>

				<ListItem>
					<Link to="/frequently-asked-questions">FAQ</Link>
				</ListItem>

				<ListItem>
					<Link to="/reviews">Reviews</Link>
				</ListItem>

				<ListItem>
					<a href="https://my.skills.fund">Check Loan Status</a>
				</ListItem>

				<ListItem>
					<Link to="/repay">Repay My Loan</Link>
				</ListItem>

				<ListItem>
					<Link className="btn text-black z-10 w-32" to="/schools/apply">
						Apply Now
					</Link>
				</ListItem>
			</ul>
		</Menu>
	);
};

export default MobileNavMenu;
