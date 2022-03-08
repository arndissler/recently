#!/bin/bash

set -e

if [ -f "package.json" ] && [ -d "utils" ]; then
    echo "Called from root folder, switch to ./utils"
    cd utils
fi

buildCache='../.build-cache'
distFolder='../builds'
sourceFolder='../src'

packageInfo='../src/manifest.json'

# gsed 's|^\([ \t]*// \).*$|\1|' index.js > index-stripped.js
if [ -d "$sourceFolder" ]; then
    if [ -d "$buildCache" ]; then
        rm -rf "$buildCache"
    fi

    if [ ! -d "../builds" ]; then
        mkdir ../builds
    fi

    if [ -e "$packageInfo" ]; then
        echo "Package info found."

        version=`cat ../src/manifest.json | grep '"version": ".*",' | cut -d'"' -f4 | tr -d '[:space:]'`
        echo "Build version '$version'.."
        echo "Checking if version still exist.."
        distFileName="$distFolder/recently.$version.xpi"
        if [ -e "$distFileName" ]; then
            echo "Artifact w/ version $version still exist: $distFileName."
            echo "Build cancelled."
            echo "" 
            exit 7
        fi
        echo "Version does not exist, proceed with building"
        echo "Artefact will be here: $distFileName"
    fi

    mkdir $buildCache

    cd $sourceFolder

    find . | while read fileName; do
        # process each line, using variables as parsed into $var1, $var2, etc
        # (note that this may be a subshell: var1, var2 etc will not be available
        # after the while loop terminates; some shells, such as zsh and newer
        # versions of Korn shell, process the commands to the left of the pipe
        # operator in a subshell)
        extension="${fileName##*.}"
        folder="${fileName%/*}"
        file=$(basename "$fileName")

        # $fileName always begins with an ./
        # so omit the first two characters by getting a substring starting at pos 3
        targetFile="$buildCache/$(echo $fileName | cut -c 3-)"

        echo "checking file: '$file'"
        if [ -d "$fileName" ]; then
            echo "    creating directory :: '$targetFile'"
            mkdir -p $targetFile
            continue
        fi

        if [ "$extension" = "js" ] || [ "$extension" = "jsm" ]; then
            echo "    transform file     :: $fileName]  ~> '$targetFile'"
            gsed 's|^\([ \t]*// \).*$|\1|' $fileName > $targetFile
        else
            echo "    copy file          :: '$fileName' to '$targetFile'"
            cp $fileName $targetFile
        fi
    done

    # if [ -z "$1" ]
    # then
    #     echo "Usage: make <version>, e.g. make 0.7.4"
    #     exit 1
    # fi

    cp ../LICENSE.txt $buildCache

    cd $buildCache

    echo "Start packing at '$buildCache'..."
    zip -r $distFileName . -x@"../utils/excluded-files.list"

    if [ "$1" = "--release" ]; then
        echo "To publish a GitHub release run:"
        if [ ! -f './CHANGELOG.md' ]; then
            echo "Changelog file not found -> check if you're in the correct folder"
        fi
        echo "gh release create 'v$version' --notes-file ./CHANGELOG.md '$distFileName#Recently $version'"
    else
        echo "No GitHub release will be published"
    fi
fi
