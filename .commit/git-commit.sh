#!/bin/bash

branchName=$(git branch --show-current)

if [ "$1" == "pull" ]; then
    git pull origin $branchName
fi

if [ "$1" == "stash" ]; then
    git stash origin $branchName
fi

git add .

if [ "$1" == "last" ]; then
    lastcommit=$(git log -1 --pretty=%B)
else

    echo "Commenting ======================================================================================"
    defaultHeadline=feat
    echo "Whats is the headline {feat|fix|chore|refactor|test} : default $defaultHeadline"

    read headlineRead
    headline="${headlineRead:-"$defaultHeadline"}"


    echo "What is the subject {module_name} default $branchName : "

    read subjectRead

    subject="${subjectRead:-"$branchName"}"

    echo "What you did here : "

    read message

    lastcommit="$headline($subject): $message"

fi

git commit -m "$lastcommit"

if [ "$1" == "rebase" ]; then
    git rebase --continue
    exit
fi

echo "Do you also want push? (y/n): default y, press ENTER to continue"

read push

if [ "$push" = "n" ]; then
    echo "Good Bye."
else
    git push origin $branchName
    echo "Successfully pushed. Have a good day."
fi
