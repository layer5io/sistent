# <a name="contributing">Contributing Overview</a>

Please do! Thanks for your help improving the project! :balloon:

All contributors are welcome. Please see the [newcomers welcome guide](https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit) for how, where and why to contribute. This project is community-built and welcomes collaboration. Contributors are expected to adhere to our [Code of Conduct](.CODE_OF_CONDUCT.md).

Not sure where to start? First, see the [newcomers welcome guide](https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit). Grab an open issue with the [help-wanted label](../../labels/help%20wanted) and jump in. Join the [Slack account](http://slack.layer5.io) and engage in conversation. Create a [new issue](/../../issues/new/choose) if needed. All [pull requests](/../../pulls) should reference an open [issue](/../../issues). Include keywords in your pull request descriptions, as well as commit messages, to [automatically close issues in GitHub](https://help.github.com/en/github/managing-your-work-on-github/closing-issues-using-keywords).

**Sections**

- <a name="contributing">General Contribution Flow</a>
  - <a href="#commit-signing">Developer Certificate of Origin</a>

Relevant coding style guidelines are the Go Code Review Comments and the Formatting and style section of Peter Bourgon's Go: Best Practices for Production Environments.

# <a name="contributing">General Contribution Flow</a>

In order to contribute to Meshery, please follow the fork-and-pull request workflow described [here](./CONTRIBUTING-gitflow.md).

## <a name="commit-signing">Signing-off on Commits (Developer Certificate of Origin)</a>

To contribute to this project, you must agree to the Developer Certificate of
Origin (DCO) for each commit you make. The DCO is a simple statement that you,
as a contributor, have the legal right to make the contribution.

See the [DCO](https://developercertificate.org) file for the full text of what you must agree to
and how it works [here](https://github.com/probot/dco#how-it-works).
To signify that you agree to the DCO for contributions, you simply add a line to each of your
git commit messages:

```
Signed-off-by: Jane Smith <jane.smith@example.com>
```

In most cases, you can add this signoff to your commit automatically with the
`-s` or `--signoff` flag to `git commit`. You must use your real name and a reachable email
address (sorry, no pseudonyms or anonymous contributions). An example of signing off on a commit:

```
$ commit -s -m “my commit message w/signoff”
```

To ensure all your commits are signed, you may choose to add this alias to your global `.gitconfig`:

_~/.gitconfig_

```
[alias]
  amend = commit -s --amend
  cm = commit -s -m
  commit = commit -s
```

Or you may configure your IDE, for example, Visual Studio Code to automatically sign-off commits for you:

<a href="https://user-images.githubusercontent.com/7570704/64490167-98906400-d25a-11e9-8b8a-5f465b854d49.png" ><img src="https://user-images.githubusercontent.com/7570704/64490167-98906400-d25a-11e9-8b8a-5f465b854d49.png" width="50%"><a>

## <a name="contributing-docs">Documentation Contribution Flow</a>

Please contribute! Layer5 documentation uses Jekyll and GitHub Pages to host docs sites. Learn more about [Layer5's documentation framework](https://docs.google.com/document/d/17guuaxb0xsfutBCzyj2CT6OZiFnMu9w4PzoILXhRXSo/edit?usp=sharing). The process of contributing follows this flow:

1. Create a fork, if you have not already, by following the steps described [here](./CONTRIBUTING-gitflow.md)
1. In the local copy of your fork, navigate to the docs folder.
   `cd docs`
1. Create and checkout a new branch to make changes within
   `git checkout -b <my-changes>`
1. Edit/add documentation.
   `vi <specific page>.md`
1. Run site locally to preview changes.
   `make site`
1. Commit, [sign-off](#commit-signing), and push changes to your remote branch.
   `git push origin <my-changes>`
1. Open a pull request (in your web browser) against the repo.

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for our commit messages. Each commit should have a type, an optional scope, and a descriptive message. Examples of commit types include "feat," "fix," "docs," and more.

Here's a basic commit message format:

For example:

- `feat(auth): add user authentication feature`
- `fix(ui): resolve styling issue in the header`

Please ensure that your commits adhere to this format to maintain a clear and organized commit history. This repo also uses `commitizen` and `commitlint` to make sure that you are adhering the rules in writing a commit.

To write a commit message for this repo, each commit should have the following above, which includes the type, an optional scope, and a descriptive message.

- `style`: Since we're using `prettier` and `eslint` to fix formatting and linting styles, you can write your commit message like so:

`style(repo): use prettier and eslint to lint and format`

or `style: format files`.

The above will just write a commit message without a scope.

- `feat`: When using this commit type, we're introducing a new feature into the repo. This feature has never been used, and will require a `minor` version to be used.
- `fix`: When usin this commit type, we're introducing backward compatibility fixes to the existing repo. To help have a clean git commit, it would be better to create new features, and then work on fixing them to make meaningful releases.
- `docs`: This is specific to any of the documentations, like Markdown files.

#### Tests

Users can now test their code on their local machine against the CI checks implemented using `make run-tests`.

To test code changes on your local machine, run the following command:

```
make tests
```

#### Building Docker image

To build a Docker image of the project, please ensure you have `Docker` installed to be able to build the image. Now, run the following command to build the Docker image:

```sh
make docker
```

You can also refer to this "<a href="https://www.youtube.com/live/lsw9KA__iu4?si=o8gpZdSHcqO2OKxE">Training: contributing to Sistent</a>" and this <a href="https://www.youtube.com/live/yiXkxbibLUU?si=Dybj5qr0VLhLWEpl">Websites call</a> where experienced contributors have taught how to use sistent in your project or Meshery

### UI Lint Rules

Layer5 uses ES-Lint to maintain code quality & consistency in our UI Code.

Run the following command before commiting the changes:

```
make lint
```

# Project Directory Structure

## Overview of `/src` Directory

### actors

### assets

- Assets are the files that are used in the project. These files can be images, videos, logos or fonts etc. The assets directory is used to store all the assets that are used in the project.

### base

- Base directory contains all the basic components that are used in the project. These components are the building blocks of the project. The base directory contains the following subdirectories like `Buttons`, `Forms`, `Typography` etc.

### constants

- Constants directory contains all the constants that are used in the project. These constants can be colors, fonts, breakpoints etc.

### custom

- Custom directory contains all the custom components using the theme colors.

### icons

- Icons directory contains all the icons that are used in the project or can be used in any of other projects.

### theme

- Theme directory contains all the theme related files. The theme directory contains the following subdirectories like:
  - `Colors`- contains all the colors that are used in the project or theme components.
  - `components` - contains all the theme components like `Button`,
  - `Typography` with brand colors.
  - [`typography.ts`](https://github.com/layer5io/sistent/blob/master/src/theme/typography.ts) - contains all the typography related files like `font-size`, `font-family` etc.
  - [`palette.ts`](https://github.com/layer5io/sistent/blob/master/src/theme/palette.ts) - contains all the tokens that are used in the project and used in components.

Through the theme directory, we export the SistentThemeProvider which is used to provide the theme to the project.

# <a name="maintaining"> Reviews</a>

All contributors are invited to review pull requests. See this short video on [how to review a pull request](https://www.youtube.com/watch?v=isLfo7jfE6g&feature=youtu.be).

# New to Git?

Resources: https://lab.github.com and https://try.github.com/

### License

This repository and site are available as open source under the terms of the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).

### About Layer5

**Community First**

<p>The <a href="https://layer5.io/community">Layer5 community</a> represents the largest collection of service mesh projects and their maintainers in the world.</p>

**Open Source First**

<p>At Layer5, we champion developer-defined infrastructure, giving engineers the power to reshape application delivery. We empower operators in reimagining how they manage modern infrastructure: collaboratively.</p>
