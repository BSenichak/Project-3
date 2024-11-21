import React from 'react'
import PropTypes from 'prop-types'
import style from './Footer.module.scss'

function Footer(props) {
  return (
    <footer className={style.wrapper}>
        &copy;Robocode {new Date().getFullYear()}
    </footer>
  )
}

Footer.propTypes = {}

export default Footer
