import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import DesktopNavMenu from './DesktopNavMenu';
import MobileNavIcon from './MobileNavIcon';
import MobileNavMenu from './MobileNavMenu';

const Header = () => {
	const [ menuOpen, setMenuOpen ] = useState(false);
	return (
		<Fragment>
			<MobileNavIcon menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<MobileNavMenu menuOpen={menuOpen} />
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
