# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | Yes       |

Only the latest published version on NPM receives security fixes. Please keep your dependency up to date.

---

## Reporting a Vulnerability

If you discover a security vulnerability, please do not open a public GitHub issue.

Report it privately by emailing the maintainer directly via the contact on the [GitHub profile](https://github.com/gyanaprakashkhandual).

Please include:

- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Your suggested fix, if any

You can expect an acknowledgement within 48 hours. If the vulnerability is confirmed, a fix will be released as soon as possible and you will be credited in the release notes unless you prefer to remain anonymous.

---

## Scope

This policy applies to the `@gyanaprakashkhandual/usemarkdown` NPM package and the source code in this repository.

Third-party dependencies are out of scope. If you find a vulnerability in a dependency, please report it to the respective upstream maintainer.

---

## Safe Rendering

This library renders Markdown content passed by the consuming application. It does not sanitize HTML by default. If you render untrusted user-generated content, you are responsible for sanitizing input before passing it to the `content` prop. Consider using a library such as [DOMPurify](https://github.com/cure53/DOMPurify) in that case.
