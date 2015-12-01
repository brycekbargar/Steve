# Steve #
[ChucK](http://chuck.cs.princeton.edu) has no package manager but I want one.
`npm` is basically magic and could be used with a couple of changes.

Steve is nice implementation of those changes.

*All of this is double secret alpha and I decided to write out the README on how
it's going to eventually work before doing the implementation. Call it a spec or
wishful thinking or unbridled optimism or notes on a bar napkin. You should assume everything in this README is a lie unless it has a :shipit: next to it*

### Steve commands ###

##### `steve init` #####
A thin wrapper for `npm init`.
There are a couple of differences
1. `index.ck` will be the default for `main`
1. The `start/watch/prepulish` `scripts` will be prepopulated using `steve` commands
1. There won't be any mention of test commands (one day I may write a runner/assertion library)

##### `steve package` #####
1. Creates the `package` folder or clears it if it exists
1. Looks at `initialze.ck` and takes a note of the files to be loaded
1. Copies each of the files found in the above step into the `package` folder prepending the order in `000_` fashion

##### `steve start [args]` #####
1. Starts a ChucK vm
1. Adds all dependencies from `package.json` to the vm by crawling `node_modules/**/package/*.ck` (plus their dependencies)
1. Adds `initialize.ck` to the vm
1. Adds the main file (default: `index.ck`) to the vm passing `args` when it does

*A small note on dependencies*  
Since ChucK has no concept of namespaces or scope if the same dependency is required by the package or packages it depends on and they differ by a major version `steve` will refuse to start the app. If they have the same major version `steve` will only load the highest version. You should follow `semver` and backwards compatibility religiously.

##### `steve watch` #####
Basically `steve start` except it watches the package folder for changes and then  

1. Replaces the changed files in the vm
1. Replaces the `index.ck` file in the vm

##### `steve test` :shipit: ######
lol ChucK

#### Everything Else ####
Everything else works just like `npm`.

### Parts of a steve package ###

##### `initialize.ck` #####
This contains the list of ChucK files in the package in the order they need to be added to the VM. They should be in any of the following format

```
Machine.add(me.dir()+"subfolder/**/File.ck");
Machine.add(me.dir() + "subfolder/**/File.ck");
Machine.add("./subfolder/**/File.ck");
```

Any referenced packages will be added to the VM before the files in the `initialize.ck` file.

This pattern was established in the book [Programming for Musicians and Digital Artists: *Creating music with ChucK*](https://www.manning.com/books/programming-for-musicians-and-digital-artists).

##### `index.ck` #####
This is by default the `main` file for ChucK packages. There is no need to include it in the `initialze.ck` file. It will always be the last file added to the ChucK vm and when `steve watch` is called and it will be the reloaded when any changes are registered. If you want to use another file for this purpose then you should define it in your `package.json` file. Any arguments passed to `steve start` will be forwarded to this file when it's added to the vm.
