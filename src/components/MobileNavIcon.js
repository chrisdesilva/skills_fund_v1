import React, { Fragment } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { breakpoint } from '../utils/breakpoints';

export const MenuIcon = styled.button`
	@media ${breakpoint.lg} {
		display: none;
	}
	position: fixed;
	top: 2rem;
	right: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 2rem;
	height: 2rem;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 11;

	div {
		width: 2rem;
		height: .25rem;
		background: ${({ menuOpen }) => (menuOpen ? 'white' : 'black')};
		border-radius: 10px;
		transition: all 300ms linear;
		position: relative;
		transform-origin: 1px;

		:first-child {
			transform: ${({ menuOpen }) => (menuOpen ? 'rotate(45deg)' : 'rotate(0)')};
		}

		:nth-child(2) {
			opacity: ${({ menuOpen }) => (menuOpen ? '0' : '1')};
			transform: ${({ menuOpen }) => (menuOpen ? 'translateX(20px)' : 'translateX(0)')};
		}

		:nth-child(3) {
			transform: ${({ menuOpen }) => (menuOpen ? 'rotate(-45deg)' : 'rotate(0)')};
		}
	}
`;

export const Logo = styled.li`
	position: fixed;
	top: 2rem;
	left: 2rem;
	width: 10rem;
	z-index: 11;
	list-style-type: none;

	@media ${breakpoint.lg} {
		display: none;
	}
`;
const MobileNavIcon = ({ menuOpen, setMenuOpen }) => {
	const data = useStaticQuery(graphql`
		query {
			skflogo: file(relativePath: { eq: "skillsFund_logo.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
			whiteSkflogo: file(relativePath: { eq: "skf_logo_white.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	const ApplyLink = styled((props) => <Link {...props} />)`
			position: fixed;
			right: 5rem;
			top: 1.8rem;
			width: 6rem;
			padding: .5rem 1rem;
			cursor: pointer;
			border: 2px solid transparent;
			transition: all 300ms;
			text-decoration: none;
			background: #9d1996;
			color: white;
			font-weight: bold;
			text-align: center;
			z-index: 10;
		@media ${breakpoint.md} {
			width: 7rem;
			right: 6rem;
		}
		@media ${breakpoint.lg} {
			display: none;
		}
	`;

	const MenuBackground = styled.div`
		position: fixed;
		width: 100%;
		background: white;
		z-index: 5;
		height: 80px;

		@media ${breakpoint.lg} {
			display: none;
		}
	`;

	return (
		<Fragment>
			<MenuBackground />
			<ul>
				<Logo>
					<Link to="/">
						{menuOpen ? (
							<Img fluid={data.whiteSkflogo.childImageSharp.fluid} alt="Skills Fund logo" />
						) : (
							<Img fluid={data.skflogo.childImageSharp.fluid} alt="Skills Fund logo" />
						)}
					</Link>
				</Logo>
			</ul>
			<MenuIcon menuOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
				<div />
				<div />
				<div />
			</MenuIcon>
			<ApplyLink to="/schools/apply">Apply Now</ApplyLink>
		</Fragment>
	);
};

export default MobileNavIcon;
