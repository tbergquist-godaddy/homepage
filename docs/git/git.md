---
id: git
title: Git
---

When working with git, I prefer using the command-line. There are plenty of desktop clients that allows you to work with `git`, but I feel more in control when using the command line. 

There are some tricks to reduce the amount of typing that needs to be done. 

## Autocomplete

If you, like me, would like to use the command-line, I suggest you install [bash-git-autocomplete](https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion).

You can find all install instructions for your platform on the link above. Now, you can use the __tab__ key to have `bash` complete the sentences for you. 

## Aliases

Git aliases allows you to perform common commands with less typing, and git autocomplete also understands your aliases. To create your aliases, open your gitconfig in your favorite editor, or just do `git config --global -e`. 

These are my git aliases: 

```git
[alias]
    co = checkout
    ec = config --global -e
    cob = checkout -b
    cm = !git add -A && git commit -m
    cp = cherry-pick
    save = !git add -A && git commit -m 'SAVEPOINT' -n
    wip = !git add -u && git commit -m "WIP"
    undo = reset HEAD~1 --mixed
    amend = !git add -A && git commit -a --amend
    wipe = !git add -A && git commit -qm 'WIPE SAVEPOINT' -n && git reset HEAD~1 --hard
    st = status
    me = merge
    delb = branch -D
    down = !git pull && git fetch --prune
    opendiff = mergetool --tool=opendiff
    re = rebase -i
    rem = rebase -i master
    local-ignore = update-index --assume-unchanged
    local-unignore = update-index --no-assume-unchanged
    cln = clean -fdx
    interactive = "!f() { git rebase --interactive HEAD~${1-master}; }; f"
    bra = branch
    brar = branch -r
    ignored = !git ls-files -v | grep "^[[:lower:]]"
    rst = reset --hard
    fixup = "!f() { TARGET=$(git rev-parse "$1"); git commit --fixup=$TARGET ${@:2} && EDITOR=true git rebase -i --autostash --autosquash $TARGET^; }; \
f"
```

### git wipe

Did you ever work on something, the do `git reset --hard`. Then you remember there was this piece of code you wanted after all 😓. With git wipe, no problem, you can find your changes doing `git reflog`, since it commits your unstaged changes before resetting 😻.

### git save

Because I don't like to stash my changes when switching branches. I rather do a commit on that branch called SAVEPOINT. I know this should not me merged, and I will use git undo when I switch back to this branch.

### git undo

Removes the latest commit, without throwing away the changes.

### git fixup

When you want to amend some changes to a commit other than head on you branch, you can use it like `git fixup <commit_hash>` and it will commit your changes to that commit.