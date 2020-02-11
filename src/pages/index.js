import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { breakpoint } from '../utils/breakpoints';

export default () => {
	const Header = styled.header`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 60vh;
		margin-top: -60px;
		padding: 2rem;

		h1,
		h2 {
			margin-bottom: 1.5rem;
		}

		.btnContainer {
			display: flex;
			flex-direction: column;

			@media ${breakpoint.md} {
				width: 33%;
				flex-direction: row;
				justify-content: center;
			}
		}

		.btn--compare {
			color: black;
			text-align: center;
			background: #e3e3e3;
		}
	`;

	const LeadContent = styled.article`
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		background-color: #f7f7f7;
	`;

	const Process = styled.section`
		display: flex;
		padding: 2rem;
		div {
			display: flex;
			flex-direction: column;
			padding: 2rem;
		}
	`;

	const Reviews = styled.article`
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		background-color: #e7e7e7;
	`;

	return (
		<Layout>
			<SEO title="Home" />
			<Header>
				<h1>Fund Your Future</h1>
				<h2>We offer loans to bootcamps that can transform your career.</h2>
				<div className="btnContainer">
					<Link className="btn btn--submit mb-2 md:mb-0 md:mr-1" to="/apply">
						Apply Now
					</Link>
					<Link className="btn btn--compare md:ml-1" to="/students">
						Compare Schools
					</Link>
				</div>
			</Header>
			<LeadContent>
				<h2>Built on Transparency</h2>
				<p>We have helped over 10,000 students get access to career-transforming education.</p>
				<img src="https://via.placeholder.com/400x300.png?text=Student+story+video" />
			</LeadContent>
			<Process>
				<img src="https://via.placeholder.com/200x150.png" />
				<div>
					<h3>Know exactly what you'll pay</h3>
					<p>With our fixed rates, there are no surprises when it comes to your monthly payments.</p>
				</div>
			</Process>
			<Process>
				<img src="https://via.placeholder.com/200x150.png" />
				<div>
					<h3>You've got options</h3>
					<p>Whether you know your program or are looking for more information, we've got you covered.</p>
				</div>
			</Process>
			<Process>
				<img src="https://via.placeholder.com/200x150.png" />
				<div>
					<h3>Return on education</h3>
					<p>We take care of you so you can take care of your future.</p>
				</div>
			</Process>
			<Reviews>
				<h2>We keep it simple, and our students agree.</h2>
				<p>Real Students. Real Reviews.</p>
				<img src="https://via.placeholder.com/400x200.png?text=Reviews+carousel" />
			</Reviews>
		</Layout>
	);
};
