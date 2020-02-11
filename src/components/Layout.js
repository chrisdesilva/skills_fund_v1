import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { theme } from '../utils/theme';

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
		<ThemeProvider theme={theme}>
			<PageContainer>
				<Header />
				<ChildContainer>{children}</ChildContainer>

				<Footer />
			</PageContainer>
		</ThemeProvider>
	);
};

export default Layout;
