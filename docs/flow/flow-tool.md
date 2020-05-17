---
id: flow-tool
title: Flow tool
---

Flow have some useful tools that are not shipped with the `npm` packages. How can you use these, and what are they good for?

First of all, to be able to use these tools, you need to do the following: 

1. Clone Flow repository somewhere on your machine (git@github.com:facebook/flow.git)
2. Jump into dev tools (<your_clone>/flow/packages/flow-dev-tools) and install necessary deps using `yarn`
3. You can now run `./tool` from the Flow repo root which enables you very useful utilities.

## Upgrading dependencies

If you have a monorepo with many workspaces, or just a large repo in general you can end up having a lot of flow errors after upgrading flow itself, or another package. The flow tool allows you to suppress these errors. Note that this is for the case where a library just added flow-types and you are confident that your code works, or that flow upgraded and some changes are necessary. Make sure your code still works. 

Now, to suppress these errors you can run 

```
/path/to/tool add-comments --all --bin /path/to/flow --comment "\$FlowFixMe(>=<flow_version>)" .
```

You can now fix these errors in smaller chunks rather than having to fix them all within the same PR. 

You can also use this tool to remove unused suppression comments

To remove unused suppress comments run:

/path/to/tool remove-comments --bin /path/to/flow .
This command removes all unused suppress comments while keeping unused comments in flowtests (files ending with *-flowtest.js or files in __flowtests__ directory).

You can read more about it in this <a rel="noopener noreferrer" target="_blank" href="https://medium.com/flow-type/upgrading-flow-codebases-40ef8dd3ccd8">Medium blog post</a>