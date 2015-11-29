# Steve #
[ChucK](http://chuck.cs.princeton.edu) has no package manager but I want one so
I'm writing it.

*All of this is double secret alpha and I decided to write out the README on how
it's going to eventually work before doing the implementation. Call it a spec or
wishful thinking or unbridled optimism or notes on a bar napkin. You should assume everything in this README is a lie unless it has a :shipit: next to it*

**DO NOT `npm publish` ChucK PACKAGES!**  
It is against npmjs terms of service to upload non npm packages. One of these days I'll get around to setting up a ChucK specific npm repo, but for now `steve init` will set `"private": true` by default in the `package.json` file.

### Parts of a steve package ###

##### `initialize.ck` #####
This contains the list of ChucK files in the package in the order they need to be added to the VM. They should be in any of the following format

```
Machine.add(me.dir()+"subfolder/**/File.ck");
Machine.add(me.dir() + "subfolder/**/File.ck");
Machine.add("./subfolder/**/File.ck");
```

Any referenced packages will be added to the VM before the files in the `initialize.ck` file.

##### `package.json` #####
This file follows the layout of [the npm package.json](https://docs.npmjs.com/files/package.json).

Again, **DO NOT `npm publish` ChucK PACKAGES!**

Instead you should [use the `<git remote url>` syntax](https://docs.npmjs.com/cli/install) or actually the local filesystem.

##### `index.ck` #####
This is by default the `main` file for ChucK packages. There is no need to include it in the `initialze.ck` file. It will always be the last file added to the ChucK vm and when `steve watch` is called and it will be the reloaded when any changes are registered. If you want to use another file for this purpose then you should define it in your `package.json` file. Any arguments passed to `steve start` will be forwarded to this file when it's added to the vm.

### Steve commands ###

##### `steve restore` #####
A thin wrapper for `npm install`

##### `steve init` #####
A thin wrapper for `npm init` which also sets `"private": true` in the `package.json` file

##### `steve package [version]` #####
1. If `version` is passed it bumps the version in the `package.json` file otherwise it uses that version
1. Creates the `package` folder or clears it if it exists
1. Looks at `initialze.ck` and takes a note of the files to be loaded
1. Copies each of the files found in the above step into the `package` folder prepending the order in `000_` fashion
1. `git commit`s the release allowing you to add release notes using the commit message
1. `git tag`s the commit with the given version

##### `steve start [args]` #####
1. Starts a ChucK vm
1. Adds all dependencies from `package.json` to the vm by crawling `node_modules/**/package/*.ck` (plus their dependencies)
1. Adds `initialize.ck` to the vm
1. Adds `index.ck` to the vm passing `args` when it does

*A small note on dependencies*  
If the same dependency is required by the package or packages it depends on and they differ by a major version `steve` will refuse to start the app. If they have the same major version `steve` will only load the highest version.

##### `steve watch` #####
Basically `steve start` except it watches the package folder for changes and then  

1. Replaces the changed files in the vm
1. Replaces the `index.ck` file in the vm

##### `steve test` ######
lol ChucK
