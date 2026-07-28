"use client";

import { useEffect, useMemo, useState } from "react";

const ISSUE_URL = "https://github.com/KylianSu/guestbook/issues/1";
const COMMENTS_URL =
  "https://api.github.com/repos/KylianSu/guestbook/issues/1/comments?per_page=50";
const CACHE_KEY = "kyliansu-guestbook-v1";
const CACHE_TTL = 5 * 60 * 1000;
const MAX_MESSAGES = 24;
const MAX_PROFILE_REQUESTS = 12;

function normalizeMessage(comment, profileNames) {
  const login = comment?.user?.login || "github-user";
  const profileUrl = comment?.user?.html_url?.startsWith("https://github.com/")
    ? comment.user.html_url
    : `https://github.com/${encodeURIComponent(login)}`;

  return {
    id: comment.id,
    body: typeof comment.body === "string" ? comment.body.trim() : "",
    createdAt: comment.created_at,
    commentUrl: comment.html_url,
    avatarUrl: comment?.user?.avatar_url,
    login,
    name: profileNames[login] || login,
    profileUrl,
  };
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function MessageCard({ message, duplicate, onOpen }) {
  const body = message.body || "This message contains no plain-text content.";

  return (
    <article className="guestbook-card" aria-hidden={duplicate || undefined}>
      <button
        className="guestbook-message-open"
        type="button"
        onClick={() => onOpen(message)}
        tabIndex={duplicate ? -1 : 0}
        aria-label={`Open message from @${message.login}`}
      >
        <p>{body}</p>
        <time dateTime={message.createdAt}>{formatDate(message.createdAt)}</time>
      </button>
      <div className="guestbook-card-footer">
        <a
          className="guestbook-author"
          href={message.profileUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={duplicate ? -1 : 0}
        >
          <img src={message.avatarUrl} alt="" />
          <span>
            <strong>{message.name}</strong>
            <small>@{message.login}</small>
          </span>
        </a>
        <a
          className="guestbook-comment-link"
          href={message.commentUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={duplicate ? -1 : 0}
        >
          GitHub
        </a>
      </div>
    </article>
  );
}

function MessageDialog({ message, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="guestbook-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="guestbook-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guestbook-message-title"
      >
        <button
          className="guestbook-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close message"
          autoFocus
        >
          ×
        </button>
        <a
          className="guestbook-modal-author"
          href={message.profileUrl}
          target="_blank"
          rel="noreferrer"
        >
          <img src={message.avatarUrl} alt="" />
          <span>
            <strong id="guestbook-message-title">{message.name}</strong>
            <small>@{message.login} · View GitHub profile</small>
          </span>
        </a>
        <p className="guestbook-modal-message">
          {(message.body || "This message contains no plain-text content.").slice(0, 2000)}
        </p>
        <div className="guestbook-modal-meta">
          <time dateTime={message.createdAt}>{formatDate(message.createdAt)}</time>
          <a href={message.commentUrl} target="_blank" rel="noreferrer">
            View original comment on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMessages() {
      setStatus("loading");

      if (refreshKey === 0) {
        try {
          const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
          if (
            cached &&
            Date.now() - cached.savedAt < CACHE_TTL &&
            Array.isArray(cached.messages)
          ) {
            setMessages(cached.messages);
            setStatus("ready");
            return;
          }
        } catch {
          sessionStorage.removeItem(CACHE_KEY);
        }
      }

      try {
        const commentsResponse = await fetch(COMMENTS_URL, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          signal: controller.signal,
        });
        if (!commentsResponse.ok) {
          throw new Error(`GitHub API returned ${commentsResponse.status}`);
        }

        const comments = await commentsResponse.json();
        const selectedComments = comments.slice(-MAX_MESSAGES).reverse();
        const uniqueLogins = [
          ...new Set(selectedComments.map((comment) => comment?.user?.login).filter(Boolean)),
        ].slice(0, MAX_PROFILE_REQUESTS);

        const profiles = await Promise.all(
          uniqueLogins.map(async (login) => {
            try {
              const response = await fetch(
                `https://api.github.com/users/${encodeURIComponent(login)}`,
                {
                  headers: {
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                  },
                  signal: controller.signal,
                }
              );
              if (!response.ok) return [login, login];
              const profile = await response.json();
              return [login, profile.name?.trim() || login];
            } catch {
              return [login, login];
            }
          })
        );

        const profileNames = Object.fromEntries(profiles);
        const normalized = selectedComments.map((comment) =>
          normalizeMessage(comment, profileNames)
        );
        setMessages(normalized);
        setStatus("ready");
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ savedAt: Date.now(), messages: normalized })
          );
        } catch {
          // The guestbook remains usable when storage is blocked or unavailable.
        }
      } catch (error) {
        if (error.name !== "AbortError") setStatus("error");
      }
    }

    loadMessages();
    return () => controller.abort();
  }, [refreshKey]);

  const scrollingMessages = useMemo(() => {
    if (messages.length === 0) return [];

    const repetitions = Math.max(1, Math.ceil(4 / messages.length));
    const firstSet = Array.from({ length: repetitions }, (_, repetition) =>
      messages.map((message) => ({
        message,
        duplicate: repetition > 0,
      }))
    ).flat();
    const secondSet = firstSet.map(({ message }) => ({
      message,
      duplicate: true,
    }));

    return [...firstSet, ...secondSet];
  }, [messages]);

  const closeDialog = () => setSelectedMessage(null);

  return (
    <>
      <section className="content-section guestbook-section" id="guestbook">
        <div className="guestbook-heading">
          <div>
            <h2>Guestbook</h2>
            <p>
              Messages are publicly attributed to the GitHub account used to post.
            </p>
          </div>
          <a
            className="guestbook-compose"
            href={`${ISSUE_URL}#issuecomment-new`}
            target="_blank"
            rel="noreferrer"
          >
            Sign in with GitHub to leave a message
          </a>
        </div>

        <div className="guestbook-shell">
          <div className="guestbook-toolbar">
            <span aria-live="polite">
              {status === "loading"
                ? "Loading GitHub messages…"
                : status === "error"
                  ? "Messages are temporarily unavailable."
                  : messages.length === 0
                    ? "No messages yet — you can be the first."
                    : `${messages.length} public message${messages.length === 1 ? "" : "s"}`}
            </span>
            <button type="button" onClick={() => setRefreshKey((value) => value + 1)}>
              Refresh
            </button>
          </div>

          {messages.length > 0 ? (
            <div className="guestbook-viewport">
              <div className="guestbook-track">
                {scrollingMessages.map(({ message, duplicate }, index) => (
                  <MessageCard
                    message={message}
                    duplicate={duplicate}
                    onOpen={setSelectedMessage}
                    key={`${message.id}-${duplicate ? "copy" : "original"}-${index}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="guestbook-empty">
              <p>
                The board will begin scrolling after the first GitHub-attributed
                message is published.
              </p>
              <a href={ISSUE_URL} target="_blank" rel="noreferrer">
                Open the guestbook on GitHub
              </a>
            </div>
          )}

          <p className="guestbook-note">
            GitHub attribution verifies the posting account, not a person’s legal
            identity. Select a message to enlarge it; select an author to visit
            their GitHub profile.
          </p>
        </div>
      </section>

      {selectedMessage ? (
        <MessageDialog message={selectedMessage} onClose={closeDialog} />
      ) : null}
    </>
  );
}
