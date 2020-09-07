---
title: Github Issues example
---

import useBaseUrl from '@docusaurus/useBaseUrl';

For this tutorial we will be borrowing the [Github issues example that it's taught
on the Advanced Tutorial of the Redux Toolkit](https://redux-toolkit.js.org/tutorials/advanced-tutorial).

It's a great example because it starts with a plain React application and it then
teaches how to migrate that application to Redux using the RTK. One of the many good
things about that tutorial is that it teaches the reader the mental models that RTK
wants to create in order to manage state efficiently with their library. We will
try to do the same thing in this tutorial.

## Reviewing the Starting Example Application

The example application for this tutorial is a Github Issues viewer app. It allows
the user to enter the names of a Github org and repository, fetch the current list
of open issues, page through the issues list, and view the contents and comments
of a specific issue.

The starting commit for this application is a plain React implementation that uses
function components with hooks for state and side effects like data fetching. The
code is already written in TypeScript, and the styling is done via CSS Modules.

Let's start by viewing the original plain React app in action:

<iframe src="https://codesandbox.io/embed/github/re-rxjs/react-rxjs-github-issues-example/tree/plain-react?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{ width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden' }}
     title="react-rxjs-github-issues-example-plain-react"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

It's worth noting that there are a couple of tiny bugs (or annoyances) with this React implementation:

- Changing the "Issues Page" number and jumping to that page updates the highlighted
  pagination number that's on the footer. However, changing the pagination number through
  the footer does not update the pagination number at the top.

- When the user loads a different repo, the issues page doesn't go back to the first one,
  which is problematic because if the user was looking at page 5 of the initial repo
  and then tries to go to a different repo which doesn't have as many pages, then
  the results don't load properly. We think that it would be desirable to go back
  to the first page whenever the the user loads a different repo

We will be addressing these issues as we migrate the initial code to react-rxjs.

### React Codebase Source Overview

The codebase is already laid out in a "feature folder" structure, The main pieces are:

- `/api`: fetching functions and TS types for the Github Issues API
- `/app`: main `<App>` component
- `/components`: components that are reused in multiple places
- `/features`
  - `/issueDetails:` components for the Issue Details page
  - `/issuesList`: components for the Issues List display
  - `/repoSearch`: components for the Repo Search form
- `/utils`: various string utility functions

### Changing the dependencies

For this tutorial we will need the following dependencies:

- `rxjs`: since these are bindings for RxJS :smile:
- `@react-rxjs/core`: the core package of React-RxJS
- `react-error-boundary`: React-RxJS integrates very nicely with React Error
  Boundaries. `react-error-boundary` is a tiny library that provides a nice
  abstraction to build them, by declaring a fallback component and recovery strategy,
  in a similar way to Suspense Boundaries.

Also we are not going to need Axios, because we will be using `rxjs/ajax` instead.

### Refactor API: Axios -> RxJS

The original API uses Axios, which is a great tool for handling requests. We could
keep the API as it is, because RxJS can easily treat Promises as Observables.
However, since we are going to be using RxJS, it makes sense to use RxJS instead
of Axios. It's a pretty straightforward change:

```diff
-import axios from 'axios'
+import { ajax } from 'rxjs/ajax'
 import parseLink, { Links } from 'parse-link-header'
+import { map, pluck } from 'rxjs/operators'
+import { Observable } from 'rxjs'

 export interface Label {
   id: number
@@ -64,47 +66,40 @@ const getPageCount = (pageLinks: Links) => {
   }
 }

-export async function getIssues(
+export function getIssues(
   org: string,
   repo: string,
   page = 1
-): Promise<IssuesResult> {
+): Observable<IssuesResult> {
   const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`
-
-  try {
-    const issuesResponse = await axios.get<Issue[]>(url)
-    let pageCount = 0
-    const pageLinks = parseLink(issuesResponse.headers.link)
-
-    if (pageLinks !== null) {
-      pageCount = getPageCount(pageLinks)
-    }
-
-    return {
-      pageLinks,
-      pageCount,
-      issues: issuesResponse.data,
-    }
-  } catch (err) {
-    throw err
-  }
+  return ajax.get(url).pipe(
+    map((r) => {
+      let pageCount = 0
+      const pageLinks = parseLink(r.xhr.getResponseHeader('link') as string)
+
+      if (pageLinks !== null) {
+        pageCount = getPageCount(pageLinks)
+      }
+
+      return {
+        pageLinks,
+        pageCount,
+        issues: r.response as Issue[],
+      }
+    })
+  )
 }

-export async function getRepoDetails(org: string, repo: string) {
+export function getRepoOpenIssuesCount(org: string, repo: string) {
   const url = `https://api.github.com/repos/${org}/${repo}`
-
-  const { data } = await axios.get<RepoDetails>(url)
-  return data
+  return ajax.getJSON<RepoDetails>(url).pipe(pluck('open_issues_count'))
 }

-export async function getIssue(org: string, repo: string, number: number) {
+export function getIssue(org: string, repo: string, number: number) {
   const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`
-
-  const { data } = await axios.get<Issue>(url)
-  return data
+  return ajax.getJSON<Issue>(url)
 }

-export async function getComments(url: string) {
-  const { data } = await axios.get<Comment[]>(url)
-  return data
+export function getComments(url: string) {
+  return ajax.getJSON<Comment[]>(url)
 }
```

## Identifying the state of the App

Now that we have everything ready, let's think for a moment about the state of
this App. Luckily for us, there is not a lot of it. So, let's represent the different
state entities and their relations on a diagram:

<img src={useBaseUrl('img/github-issues-dependencies.png')}
alt="A diagram that represents the relations of the entities, at the top we have the user inputs
followed by those states that depend on them directly and one level below we have those states
that depend on other states" />

At the very top we have the different events that can happen. The 3 different user interactions:

- Changing the repo
- Changing the page
- selecting / unselecting an issue

These are the events that will propagate changes to our state entities.

Then we have the following state entities:

- **"Current repo & page"**: since the page and the repo are very tightly coupled, it makes
  sense to have an entity that represents the current state of the both of them. This entity
  depends on 2 different user interactions: changing the repo and changing the page.

- From this entity we can easily derive the **"list of issues"** and the **"current page"**

- We also have the **"# of open issues"** which depends on the "changing repo" event

- Then there is the **"issue details"** which will change whenever the user selects/unselects an issue.

- And finally we have the **"issue comments"** which depend on the "issue details".

That's it. That's all the App-level state. It's worth pointing out that the UI
doesn't allow the user to change the repo or the page while there is a selected issue.

## Defining the state of the App

Now that we have identified the state, let's represent it using RxJS streams, and
let's create the necessary React hooks.

One nice thing about Reactive Programming is that it's possible to declare state
in a way that reads from top to bottom. That's because each state entity is only
coupled to the entities that it depends from.

In order to illustrate that, we will be putting all the state of this App on the
same file. Normally, it would be better to break this file down into smaller
pieces and to collocate each piece closer to where it is being used, though.

Let's first define and export the default states of the App:

```ts
export const INITIAL_ORG = "rails"
export const INITIAL_REPO = "rails"
```

Next, let's create the entry points for the user interactions:

```ts
const repoSubject$ = new Subject<{ org: string; repo: string }>()
export const onLoadRepo = (org: string, repo: string) => {
  repoSubject$.next({ org, repo })
}

const pageSelected$ = new Subject<number>()
export const onPageChange = (nextPage: number) => {
  pageSelected$.next(nextPage)
}

const issueSelected$ = new Subject<number | null>()
export const onIssueSelected = (id: number) => {
  issueSelected$.next(id)
}
export const onIssueUnselecteed = () => {
  issueSelected$.next(null)
}
```

Now that we already have the top-level streams, let's create a stream that represents
the "current repo and page" entity. We want to reset the page to 1 when the selected repo changes, so we can represent this behavior with `merge`:

```ts
export const [useCurrentRepo, currentRepo$] = bind(
  repoSubject$.pipe(
    startWith({
      org: INITIAL_ORG,
      repo: INITIAL_REPO,
    }),
  ),
)

const currentRepoAndPage$ = merge(
  // When repo changes, update repo and reset page to 1
  repoSubject$.pipe(
    map((currentRepo) => ({
      ...currentRepo,
      page: 1,
    })),
  ),
  // When page changes
  pageSelected$.pipe(
    filter((page) => page > 0),
    // keep same repo, update page
    withLatestFrom(currentRepo$),
    map(([page, repo]) => ({ ...repo, page })),
  ),
).pipe(shareLatest())
```

From this stream we can extract the current page

```ts
export const [useCurrentPage] = bind(currentRepoAndPage$.pipe(pluck("page")))
```

And following our model, the list of issues also depends on this stream, but the
list of issues needs to be loaded from the API.

In this example we also want to use React's Suspense: When the user changes repo
or page, while the new issue list is loading we want to show a suspended state
(i.e. "Loading issues..."). The way we can do this, is by emitting the
`SUSPENSE` symbol, that means that there's data being loaded in this stream.
This can be expressed reactively as:

```ts
export const [useIssues] = bind(
  currentRepoAndPage$.pipe(
    switchMap(({ page, repo, org }) =>
      getIssues(org, repo, page).pipe(startWith(SUSPENSE)),
    ),
  ),
)
```

This way every time the current repo or page changes, useIssues will send
another query to the API to keep everything up-to-date, suspending the
component(s) that depend on it while it's fetching the new values.

We can use the same pattern to retrieve the number of open issues:

```ts
export const [usepenIssuesLen] = bind(
  currentRepo$.pipe(
    switchMap(({ org, repo }) =>
      getRepoOpenIssuesCount(org, repo).pipe(startWith(SUSPENSE)),
    ),
  ),
)
```

And lastly we need to declare the state for when an issue is selected: Following
a similar logic, we need to load the issue details when an issue is selected,
and its comments.

```ts
export const [useSelectedIssueId, selectedIssueId$] = bind(
  issueSelected$.pipe(startWith(null)),
)

export const [useIssue, issue$] = bind(
  selectedIssueId$.pipe(
    filter((id): id is number => id !== null),
    withLatestFrom(currentRepo$),
    switchMap(([id, { org, repo }]) =>
      getIssue(org, repo, id).pipe(startWith(SUSPENSE)),
    ),
  ),
)

export const [useIssueComments] = bind(
  issue$.pipe(
    filter((issue): issue is Issue => issue !== SUSPENSE),
    switchMap(issue => getComments(issue.comments_url).pipe(startWith(SUSPENSE)),
  ),
)
```

As this pattern of `switchMap` and `startWith(SUSPENSE)` is something that's
often used, react-rxjs exports `switchMapSuspended` in `@react-rxjs/utils` that
makes it sightly less verbose.

## Wiring things up!

Now that we already have all the application state declared, we can wire it up
with the components.

### Main App Component

The [diff of this component is so brutal](https://github.com/re-rxjs/react-rxjs-github-issues-example/commit/459298bf23421b0ef1b5e760fe450fb3a6b72797#diff-34456421648850188ad56fcd6df47b2b)
that it's best to show how the code looks with react-rxjs:

```tsx
import React, { Suspense, lazy } from "react"
import "./App.css"
import { RepoSearchForm } from "features/repoSearch/RepoSearchForm"
import { IssuesListPage } from "features/issuesList/IssuesListPage"
import { IssuesDetailsPage } from "features/issueDetails/IssueDetailsPage"
import { useSelectedIssueId } from "state"

const List: React.FC = () => {
  const id = useSelectedIssueId()
  return id !== null ? null : (
    <>
      <RepoSearchForm />
      <IssuesListPage />
    </>
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <List />
      <Suspense fallback={null}>
        <IssueDetailsPage />
      </Suspense>
    </div>
  )
}

export default App
```

With Suspense, we don't need to manage the loading states by ourselves - React
will. This added to the fact that the state is lifted out lets the original
App to be simplified to a couple of simple components.

### RepoSearchForm

For the "search repository" form, by having the state in a separate file, we can
just import those bits that we need directly and this way the parent doesn't
need to get coupled to values that it doesn't need.

```diff
-import React, { useState, ChangeEvent } from 'react'
+import React, { useState, ChangeEvent, useEffect } from 'react'

 import './pure-forms.css'
 import './pure-buttons.css'
-
-interface Props {
-  org: string
-  repo: string
-  setOrgAndRepo: (org: string, repo: string) => void
-  setJumpToPage: (page: number) => void
-}
+import {
+  useCurrentPage,
+  onLoadRepo,
+  onPageChange,
+  INITIAL_REPO,
+  INITIAL_ORG,
+} from 'state'

 type InputEvent = ChangeEvent<HTMLInputElement>
 type ChangeHandler = (e: InputEvent) => void

-export const RepoSearchForm = ({
-  org,
-  repo,
-  setOrgAndRepo,
-  setJumpToPage,
-}: Props) => {
-  const [currentOrg, setCurrentOrg] = useState(org)
-  const [currentRepo, setCurrentRepo] = useState(repo)
-  const [currentPageText, setCurrentPageText] = useState('1')
+export const RepoSearchForm: React.FC = () => {
+  const [currentOrg, setCurrentOrg] = useState(INITIAL_ORG)
+  const [currentRepo, setCurrentRepo] = useState(INITIAL_REPO)
+  const page = useCurrentPage()
+  const [currentPageText, setCurrentPageText] = useState(page.toString())
+  useEffect(() => setCurrentPageText(page.toString()), [page])

   const onOrgChanged: ChangeHandler = (e) => {
     setCurrentOrg(e.target.value)
@@ -36,14 +33,14 @@ export const RepoSearchForm = ({
   }

   const onLoadRepoClicked = () => {
-    setOrgAndRepo(currentOrg, currentRepo)
+    onLoadRepo(currentOrg, currentRepo)
   }

   const onJumpToPageClicked = () => {
     const newPage = parseInt(currentPageText)

     if (newPage >= 1) {
-      setJumpToPage(newPage)
+      onPageChange(newPage)
     }
   }
```

### IssuesListPage

The page for the list of issues is also [greatly simplified](https://github.com/re-rxjs/react-rxjs-github-issues-example/commit/459298bf23421b0ef1b5e760fe450fb3a6b72797#diff-86b21025fd105e75d28d28541f8288b5),
because all the state management on this part is already done, and it turns out
that this component is not the consumer of any of the state it managed - The
consumers are their children, which they will access whatever they need.

This component still has a responsibility though: to catch any error that would
happen on fetch and show a fallback UI. React-RxJS lets us use ErrorBoundaries,
not only for the regular errors that happen within React's Components, but also
for those errors that are generated in a stream.

What will happen is that if a component uses a stream that emits an error, it
will propagate that error to the nearest error boundary. If that happens, the
Error Boundary will show the fallback UI, and we can decide how to recover. In
our case, we want to show the components when the user selects another
repository or another page, so we can set this up easily by using a `useEffect`.

```tsx
import React, { useEffect } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { IssuesPageHeader } from "./IssuesPageHeader"
import { IssuesList } from "./IssuesList"
import { IssuePagination } from "./IssuePagination"
import { currentRepoAndPage$ } from "state"
import { skip, take } from "rxjs/operators"

const OnError: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  useEffect(() => {
    const subscription = currentRepoAndPage$
      .pipe(skip(1), take(1))
      .subscribe(resetErrorBoundary)
    return () => subscription.unsubscribe()
  }, [resetErrorBoundary])
  return (
    <div>
      <h1>Something went wrong...</h1>
      <div>{error && error.message}</div>
    </div>
  )
}

export const IssuesListPage = () => {
  return (
    <ErrorBoundary FallbackComponent={OnError}>
      <div id="issue-list-page">
        <IssuesPageHeader />
        <IssuesList />
        <IssuePagination />
      </div>
    </ErrorBoundary>
  )
}
```

#### IssuesPageHeader

For the header, we can get rid of its props (as now it's state we already have
declared), and we will also take the chance to represent the loading state by
using React's Suspense.

```diff
-import React from 'react'
+import React, { Suspense } from 'react'
+import { useCurrentRepoOpenIssuesCount, useCurrentRepo } from 'state'

-interface OrgProps {
-  org: string
-  repo: string
-}
-
-type HeaderProps = {
-  openIssuesCount: number
-} & OrgProps
-
-function OrgRepo({ org, repo }: OrgProps) {
+function OrgRepo() {
+  const { org, repo } = useCurrentRepo()
   return (
     <span>
       <a href={`https://github.com/${org}`} className="header__org">
@@ -23,24 +16,23 @@ function OrgRepo({ org, repo }: OrgProps) {
   )
 }

-export function IssuesPageHeader({
-  openIssuesCount = -1,
-  org,
-  repo,
-}: HeaderProps) {
-  if (openIssuesCount === -1) {
-    return (
-      <h1>
-        Open issues for <OrgRepo org={org} repo={repo} />
-      </h1>
-    )
-  } else {
-    const pluralizedIssue = openIssuesCount === 1 ? 'issue' : 'issues'
-    return (
-      <h1>
-        <span className="header__openIssues">{openIssuesCount}</span> open{' '}
-        {pluralizedIssue} for <OrgRepo org={org} repo={repo} />
-      </h1>
-    )
-  }
+function OpenIssues() {
+  const openIssuesCount = useCurrentRepoOpenIssuesCount()
+  return (
+    <>
+      <span className="header__openIssues">{openIssuesCount}</span> open{' '}
+      {openIssuesCount === 1 ? 'issue' : 'issues'} for {}
+    </>
+  )
+}
+
+export function IssuesPageHeader() {
+  return (
+    <h1>
+      <Suspense fallback={'Open issues for '}>
+        <OpenIssues />
+      </Suspense>
+      <OrgRepo />
+    </h1>
+  )
 }
```

#### IssuePagination

Same logic applies for the pagination component:

```diff
-import React from 'react'
+import React, { Suspense } from 'react'
 import classnames from 'classnames'
-import Paginate, { ReactPaginateProps } from 'react-paginate'
+import Paginate from 'react-paginate'

 import styles from './IssuePagination.module.css'
 import './IssuePagination.css'
+import { useCurrentPage, useIssues, onPageChange } from 'state'

-export type OnPageChangeCallback = ReactPaginateProps['onPageChange']
-interface Props {
-  currentPage: number
-  pageCount: number
-  onPageChange?: OnPageChangeCallback
-}
-
-export const IssuePagination = ({
-  currentPage,
-  pageCount,
-  onPageChange,
-}: Props) => {
+const IssuePaginationLoaded = () => {
+  const currentPage = useCurrentPage() - 1
+  const { pageCount } = useIssues()

-  return (
+  return pageCount === 0 ? null : (
     <div className={classnames('issuesPagination', styles.pagination)}>
       <Paginate
         forcePage={currentPage}
         pageCount={pageCount}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
-        onPageChange={onPageChange}
+        onPageChange={({ selected }) => onPageChange(selected + 1)}
         nextLabel="&rarr;"
         previousLabel="&larr;"
       />
     </div>
   )
 }
+
+export const IssuePagination = () => (
+  <Suspense fallback={null}>
+    <IssuePaginationLoaded />
+  </Suspense>
+)
```

#### IssuesList

And the list:

```diff
-import React from 'react'
+import React, { Suspense } from 'react'

-import { Issue } from 'api/githubAPI'
 import { IssueListItem } from './IssueListItem'

 import styles from './IssuesList.module.css'
+import { useIssues } from 'state'

-interface Props {
-  issues: Issue[]
-  showIssueComments: (issueId: number) => void
-}
-
-export const IssuesList = ({ issues, showIssueComments }: Props) => {
+const IssuesListLoaded = () => {
+  const { issues } = useIssues()
   const renderedIssues = issues.map((issue) => (
     <li key={issue.id}>
-      <IssueListItem {...issue} showIssueComments={showIssueComments} />
+      <IssueListItem {...issue} />
     </li>
   ))

   return <ul className={styles.issuesList}>{renderedIssues}</ul>
 }
+
+export const IssuesList = () => (
+  <Suspense fallback={<div>Loading...</div>}>
+    <IssuesListLoaded />
+  </Suspense>
+)
```

When react renders `IssuesListLoaded`, it will call `useIssues()`,
which internally will subscribe to the stream, and start fetching the value
from GitHub's API. As that value won't be resolved immediately, the component
will be put in Suspense until we get a response back from the server.

At that point, the component will exit suspense and `issues` will have
the value expected.

Then, when the user changes to another repo or page, `useIssues()` will put
the component in Suspense again until the new request has loaded.

### IssueDetailsPage

In here, also by using Error boundaries and suspense, we can break down this
component into smaller ones. There are [too many changes](https://github.com/re-rxjs/react-rxjs-github-issues-example/commit/459298bf23421b0ef1b5e760fe450fb3a6b72797#diff-1a799039b78ec6f0b5ab3f324755c673)
to be able to follow this, but the result would be:

```tsx
import React, { Suspense } from "react"
import ReactMarkdown from "react-markdown"
import classnames from "classnames"

import { insertMentionLinks } from "utils/stringUtils"
import { IssueLabels } from "components/IssueLabels"

import { IssueMeta } from "./IssueMeta"
import { IssueComments } from "./IssueComments"

import styles from "./IssueDetailsPage.module.css"
import "./IssueDetailsPage.css"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { onIssueUnselecteed, useIssue, useSelectedIssueId } from "state"

const Comments: React.FC = () => {
  const { comments } = useIssue()
  return comments === 0 ? (
    <div className="issue-detail--no-comments">No comments</div>
  ) : (
    <Suspense
      fallback={
        <div className="issue-detail--comments-loading">Coments loading...</div>
      }
    >
      <IssueComments />
    </Suspense>
  )
}

const BackButton = () => (
  <button className="pure-button" onClick={onIssueUnselecteed}>
    Back to Issues List
  </button>
)

const IssueDetails: React.FC = () => {
  const issue = useIssue()
  return (
    <div className={classnames("issueDetailsPage", styles.issueDetailsPage)}>
      <h1 className="issue-detail__title">{issue.title}</h1>
      <BackButton />
      <IssueMeta issue={issue} />
      <IssueLabels labels={issue.labels} className={styles.issueLabels} />
      <hr className={styles.divider} />
      <div className={styles.summary}>
        <ReactMarkdown
          className={"testing"}
          source={insertMentionLinks(issue.body)}
        />
      </div>
      <hr className={styles.divider} />
    </div>
  )
}

const Loading: React.FC = ({ children }) => (
  <div className="issue-detail--loading">
    <BackButton />
    {children}
  </div>
)

const IssueError: React.FC<FallbackProps> = ({ error }) => (
  <Loading>
    <p>Something went wrong...</p>
    <p>{error!.message}</p>
  </Loading>
)

const Issue: React.FC<{ id: number }> = ({ id }) => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={IssueError}>
        <Suspense
          fallback={
            <Loading>
              <p>Loading issue #{id}...</p>
            </Loading>
          }
        >
          <IssueDetails />
          <Comments />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

const IssueDetailsPage: React.FC = () => {
  const id = useSelectedIssueId()
  return id === null ? null : <Issue id={id} />
}

export default IssueDetailsPage
```

#### IssueComments

And lastly for the comments of the selected issue, we can also just grab the
hook from where we declared the state and use it. Because of Suspense, we again
don't need to handle the loading case in here.

```diff
 import ReactMarkdown from 'react-markdown'

 import { insertMentionLinks } from 'utils/stringUtils'
-import { Issue, Comment } from 'api/githubAPI'
+import { Comment } from 'api/githubAPI'
 import { UserWithAvatar } from 'components/UserWithAvatar'

 import styles from './IssueComments.module.css'
-
-interface ICLProps {
-  issue: Issue
-  comments: Comment[]
-}
+import { useIssueComments } from 'state'

 interface ICProps {
   comment: Comment
@@ -35,20 +31,8 @@ function IssueComment({ comment }: ICProps) {
   )
 }

-export function IssueComments({ comments = [], issue }: ICLProps) {
-  // The issue has no comments
-  if (issue.comments === 0) {
-    return <div className="issue-detail--no-comments">No comments</div>
-  }
-
-  // The issue has comments, but they're not loaded yet
-  if (!comments || comments.length === 0) {
-    return (
-      <div className="issue-detail--comments-loading">Comments loading...</div>
-    )
-  }
-
-  // Comments are loaded
+export const IssueComments: React.FC = () => {
+  const comments = useIssueComments()
   return (
     <ul className={styles.commentsList}>
       {comments.map((comment) => (
```

## Summary

The result of this tutorial can be seen in this CodeSandbox:

<iframe src="https://codesandbox.io/embed/github/re-rxjs/react-rxjs-github-issues-example/tree/master?fontsize=14&hidenavigation=1&theme=dark&view=editor&module=%2Fsrc%2Fstate.ts"
     style={{ width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden' }}
     title="react-rxjs-github-issues-example"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

With this, we've managed to:

- Showcase an example of an application that deals with service calls.
- Have the application state declared reactively. This implies:
  - We can read the state definition top-to-bottom.
  - Every piece of the state declares how it behaves.
- Solved both of the issues that the original example had on synchronizing
  states.
- Used two of the newest React techniques to declare loading and error states.
- Reduce boilerplate: the net diff shows a negative number of lines.

It's worth noting as another advantage, that in this example we've decided to
have the all the state definition in a single file, as the example is small
enough and it's easier to explain. However, in a real application you can split
and colocate the state to each of the relevant bits of your application, and it
will play nice with code-splitting if you were to use lazy imports.
