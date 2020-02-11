import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"

import MobileNavMenu from "./MobileNavMenu"
import DesktopNavMenu from "./DesktopNavMenu"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Fragment>
      <MobileNavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <DesktopNavMenu />
    </Fragment>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
