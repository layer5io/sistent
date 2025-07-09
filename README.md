# Sistent Design System Sistent

The Sistent Design System provides the open source building blocks to design and implement consistent, accessible, and delightful product experiences. Visit the <a href="https://layer5.io/projects/sistent">project website</a> for more information.

## Contributing to Sistent

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js

### How to get started

Make sure you have `npm` on `node@16` and above. The CI workflows checks for in `node@16`, `node@18` and `node@20`

<div>&nbsp;</div>

### Installation

To set up the project, run the following command to install dependencies:

```
make setup
```

To test the sistent component locally, you can run:

```
make build
```

If you wish to build in watch mode:

```
make build-watch
```

To check if your code meets the formatting standards, you can run:

```
make format-check
```

To run Eslint:

```
make lint
```

To run tests:

```
make tests
```

### Using your local Sistent Fork in a Project

#### Method 1: Manual Installation

1. Install your local Sistent package in the project

```
npm install <path-to-sistent-on-local-machine>
```

> Example:
>
> ```
> # relative path
> npm install ../../sistent
>
> # absolute path
> npm install /home/five/code/sistent
> ```

This will update your Sistent dependency to:

```
"@sistent/sistent" : "file:../../sistent"
```

2. Build your local Sistent fork

After making changes to your fork, run this command in your local Sistent package.

```
make build
```

3. Run the build command in the project where your local Sistent fork is installed.

```
# example, Meshery UI
make ui-build
```

Now, your project should reflect changes from your local Sistent fork.

If you want to remove the local Sistent fork from your project, run:

```
npm uninstall @sistent/sistent
```

This will remove the local Sistent package from your project. You will have to reinstall the official package using this command:

```
npm install @sistent/sistent
```

#### Method 2: Using `npm link`

1. Create a link of your local Sistent fork

```
cd <path-to-sistent-on-local-machine>

npm link
```

This creates a global symlink which points to the local Sistent fork.

2. Link the local Sistent fork to your project

```
npm link @sistent/sistent
```

3.Build your local Sistent fork

After making changes to your fork, run this command in your local Sistent package.

```
make build
```

4. Run the build command in the project where your local Sistent fork is installed.

```
# example, Meshery UI
make ui-build
```

Now, your project should reflect changes from your local Sistent fork.

5. Verify that your local Sistent fork has been correctly linked.

To verify that the correct link has been created, run this command:

```
npm ls -g

# Expected output:
# ├── @sistent/sistent@0.14.11 -> ./../../../../<path-to-local-sistent-fork>
```

To verify that the created link is correctly used in your project, run this command in the directory where you linked the Sistent fork:

```
ls -l node_modules/@sistent/sistent

# Expected output:
# node_modules/@sistent/sistent -> ../../../../../sistent
```

To revert back to the official package, first unlink the package, then install the official package using the following commands:

```
npm unlink @sistent/sistent
npm install @sistent/sistent
```

> [!NOTE]
> Avoid using `type any` in your code. Always specify explicit types to ensure type safety and maintainability.

<br/>

## Join the Layer5 community!

<a name="contributing"></a><a name="community"></a>
Our projects are community-built and welcome collaboration. 👍 Be sure to see the <a href="https://layer5.io/community/newcomers">Layer5 Community Welcome Guide</a> for a tour of resources available to you and jump into our <a href="http://slack.layer5.io">Slack</a>!

<p style="clear:both;">
<a href ="https://layer5.io/community/meshmates"><img alt="MeshMates" src=".github/readme/images/layer5-community-sign.png" style="margin-right:10px; margin-bottom:15px;" width="28%" align="left"/></a>
<h3>Find your MeshMate</h3>

<p>MeshMates are experienced Layer5 community members, who will help you learn your way around, discover live projects and expand your community network. 
Become a <b>Meshtee</b> today!</p>

Find out more on the <a href="https://layer5.io/community">Layer5 community</a>. <br />
<br /><br /><br /><br />

</p>
<div>&nbsp;</div>

<a href="https://slack.meshery.io">

<picture align="right">
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme/images//slack-dark-128.png"  width="110px" align="right" style="margin-left:10px;margin-top:10px;">
  <source media="(prefers-color-scheme: light)" srcset=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:5px;">
  <img alt="Shows an illustrated light mode meshery logo in light color mode and a dark mode meshery logo dark color mode." src=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:13px;">
</picture>
</a>

<a href="https://meshery.io/community"><img alt="Layer5 Community" src=".github/readme/images//community.svg" style="margin-right:8px;padding-top:5px;" width="140px" align="left" /></a>

<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on <a href="https://meet.layer5.io">community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/playlist?list=PL3A-A6hPO2IMPPqVjuzgqNU5xwnFFn3n0">meeting recordings</a>.<br />
✔️ <em><strong>Access</strong></em> the Community Drive by completing a community <a href="https://layer5.io/newcomer">Member Form</a>.<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://discuss.layer5.io">Community Forum</a>.<br />
✔️<em><strong>Explore more</strong></em> in the <a href="https://layer5.io/community/handbook">Community Handbook</a>.<br />
</p>
<p align="center">
<i>Not sure where to start?</i> Grab an open issue with the <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+(org%3Alayer5io+OR+org%3Ameshery+OR+org%3Alayer5labs+OR+org%3Aservice-mesh-performance+OR+org%3Aservice-mesh-patterns+OR+org%3Ameshery-extensions)+label%3A%22help+wanted%22">help-wanted label</a>.
</p>


