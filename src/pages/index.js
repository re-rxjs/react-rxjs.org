import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Truly reactive</>,
    description: (
      <>
        With React-RxJS you will be able to express the dynamic behavior of your
        app's state completely at the time of its definition.
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
        <Link to="https://rxjs-dev.firebaseapp.com/guide/observable">
          observables
        </Link>{" "}
        enables a highly performant state propagation system based on forward
        referencing subscriptions. It also prevents memory leaks, while it
        provides a powerful means for handling complex caches.
      </>
    ),
  },
  ,
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
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
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={siteConfig.title} description="React bindings for RxJS">
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
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
  );
}

export default Home;
