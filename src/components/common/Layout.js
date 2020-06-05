import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Navigation } from '.'


// Styles
import '../../styles/app.css'

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass }) => {
  const site = data.allGhostSettings.edges[0].node
  const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
  const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

  return (
    <>
      <Helmet >
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>
      <div className="viewport">
        <div className="viewport-top">
          <header className="site-head">
            <div className="container">
              <div className="site-mast">
                <div className="site-mast-left">
                  <Link to="/">
                    {site.logo ?
                      <div className="site-header-top">
                        <img className="site-logo" src={site.logo} alt={site.title} />
                        <div className="site-header-link">
                          <h1 className="site-banner-title">{site.title}</h1>
                          <p className="site-banner-desc">{site.description}</p>
                        </div>
                      </div> :
                      <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                    }
                  </Link>
                </div>
                <div className="site-mast-right">
                  <a className="site-nav-item" href="http://github.com/andresReyes17" target="_blank" rel="noopener noreferrer">
                    <img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Andres Reyes - Github" />
                  </a>
                  <a className="site-nav-item" href="http://github.com/andresReyes17" target="_blank" rel="noopener noreferrer">
                    <img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Andres Reyes - Github" />
                  </a>
                  <a className="site-nav-item" href="http://github.com/andresReyes17" target="_blank" rel="noopener noreferrer">
                    <img className="site-nav-icon" src="/images/icons/instagram.svg" alt="Andres Reyes - Github" />
                  </a>
                  <a className="site-nav-item" href="http://github.com/andresReyes17" target="_blank" rel="noopener noreferrer">
                    <img className="site-nav-icon" src="/images/icons/github.svg" alt="Andres Reyes - Github" />
                  </a>
                  <a className="site-nav-item" href="http://github.com/andresReyes17" target="_blank" rel="noopener noreferrer">
                    <img className="site-nav-icon" src="/images/icons/youtube.svg" alt="Andres Reyes - Github" />
                  </a>
                </div>
              </div>
              <nav className="site-nav">
                <div className="site-nav-left">
                  {/* The navigation items as setup in Ghost */}
                  <Navigation data={site.navigation} navClass="site-nav-item" />
                </div>
                <div className="site-nav-right">
                  <Link className="site-nav-button" to="/about">Acerca</Link>
                </div>
              </nav>
            </div>
          </header>

          <main className="site-main">
            {children}
          </main>

        </div>

        <div className="viewport-bottom">
          <footer className="site-foot">
            <div className="site-foot-nav container">
              <div className="site-foot-nav-left">
                © 2020 por andresreyes.co 💻 All rights reserved
                </div>
              <div className="site-foot-nav-right">
                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
              </div>
            </div>
          </footer>

        </div>
      </div>

    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
)

export default DefaultLayoutSettingsQuery