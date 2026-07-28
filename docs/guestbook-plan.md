# GitHub-authenticated guestbook

## Goal

Add a public guestbook whose messages are tied to GitHub accounts. Visitors
must sign in to GitHub before posting. Each message shows the author's GitHub
avatar, public display name, username, and profile link.

## Architecture

Use the public `KylianSu/guestbook` repository and issue `#1` as the message
store.

- Reading: fetch public issue comments through GitHub's REST API.
- Writing: send visitors to the issue comment composer, where GitHub handles
  authentication and account attribution.
- Display: render the latest comments in a continuously scrolling strip.
- Interaction: pause scrolling on hover or keyboard focus; open the full
  message in a dialog when a card is selected.
- Attribution: link the avatar and author name to the commenter's GitHub
  profile.
- Moderation: remove, hide, or report unwanted comments directly on GitHub.

This avoids storing an OAuth client secret or a database in the homepage.

## Live setup

- Repository: `https://github.com/KylianSu/guestbook`
- Message issue: `https://github.com/KylianSu/guestbook/issues/1`
- Read endpoint:
  `https://api.github.com/repos/KylianSu/guestbook/issues/1/comments?per_page=50`

The homepage links the posting button to the issue comment composer. Visitors
who are not signed in are asked to authenticate by GitHub before commenting.
The latest 24 comments are displayed, newest first.

## Identity limitation

GitHub authentication proves which GitHub account posted a message. It does not
prove a person's legal name. The guestbook displays the account's public
profile name and username, so it is described as GitHub-attributed rather than
legally verified real-name posting.

## Reliability and safety

- Cache comments for five minutes to stay within unauthenticated API limits.
- Render message bodies as plain text instead of injecting Markdown HTML.
- Limit message length in the enlarged dialog.
- Show a clear fallback link to the GitHub issue if the API is unavailable.
- Respect reduced-motion preferences and stop automatic scrolling when motion
  reduction is enabled.
