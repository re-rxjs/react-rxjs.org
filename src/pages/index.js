import React from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import useBaseUrl from "@docusaurus/useBaseUrl"
import styles from "./styles.module.css"

const features = [
  {
    title: <>Truly reactive</>,
    description: (
      <>
        React-RxJS allows you to express the dynamic behavior of your app's
        state completely at the time of its definition.
      </>
    ),
  },
  {
    title: <>Seamless React integration</>,
    description: (
      <>
        React-RxJS offers a hook-based API with first-class support for{" "}
        <Link to="https://reactjs.org/docs/concurrent-mode-suspense.html">
          React.Suspense
        </Link>{" "}
        and{" "}
        <Link to="https://reactjs.org/docs/error-boundaries.html">
          Error Boundaries
        </Link>
        . Also, all hooks created with React-RxJS can be used for sharing state.
      </>
    ),
  },
  {
    title: <>Highly performant</>,
    description: (
      <>
        Modeling your state with{" "}
        <Link to="https://rxjs.dev/guide/observable">observables</Link> enables
        a highly performant state propagation system based on forward
        referencing subscriptions.
      </>
    ),
  },
  ,
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout title={siteConfig.title} description="React bindings for RxJS">
      <div style={{ background: "#111", padding: "10px 0", lineHeight: 2 }}>
        <div className="container">
          <div
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Black Lives Matter.
            <a
              style={{
                display: "inline-block",
                color: "white",
                fontWeight: "bold",
                margin: "0 10px",
                padding: "7px 20px",
                border: "1px solid white",
              }}
              href="https://support.eji.org/give/153413"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support the Equal Justice Initiative.
            </a>
          </div>
        </div>
      </div>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <div className={styles.title}>
            <img
              src="img/logo-128.png"
              alt="React-RxJS logo"
              width="100"
              height="100"
            />
            <h1 className="hero__title">{siteConfig.title}</h1>
          </div>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to={useBaseUrl("docs/getting-started")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
