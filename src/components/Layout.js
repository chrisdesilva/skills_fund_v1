import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import Header from './Header';
import Footer from './Footer';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const ChildContainer = styled.div`
	flex-grow: 1;
	margin-top: 60px;
`;

const Layout = ({ children }) => {
	return (
		<PageContainer>
			<Header />
			<ChildContainer>{children}</ChildContainer>

			<Footer />
		</PageContainer>
	);
};

export default Layout;
