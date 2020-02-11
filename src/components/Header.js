import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import DesktopNavMenu from './DesktopNavMenu';

const Header = () => {
	const [ menuOpen, setMenuOpen ] = useState(false);
	return (
		<Fragment>
			<DesktopNavMenu />
		</Fragment>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``
};

export default Header;
