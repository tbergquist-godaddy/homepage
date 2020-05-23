---
id: yarn
title: Yarn
---

Yarn introduces some features that is just no supported by `npm`. One of those important features for me is `yarn workspaces` and this is why I prefer `yarn`. 

## Yarn policies set-version

When working in a team, you will end up in a situation where team members have different version of yarn installed. Normally this is not a problem, but it can _cause subtle and hard to debug_. 

You can solve this by doing `yarn policies set-version`. This will download the latest yarn version and store it in your source control. Then whenever you use `yarn` in your project, the checked in version will be used, not the one you have installed locally on your machine. 

## Upgrading dependencies

Yarn comes with a command that lets you see interactively which packages in your workspace needs to be upgraded. The command is `yarn upgrade-interactive --latest`. You will see the name of the package, your current version, and latest version. Major upgrades will be marked in red, while minor could be marked in yellow. You choose which upgrades you want to install and press `enter`;


## Yarn workspaces

From yarn docs: 

> Yarn Workspaces is a feature that allows users to install dependencies from multiple package.json files in subfolders of a single root package.json file, all in one go.

You want to use this when you are developing a `monorepo`.

TODO: Link to monorepo docs when ready.
