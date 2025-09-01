# SOM - Slack Operations Manager

<p align="center">
  <a href="https://github.com/dharmendrasha/SOM" target="blank">
  <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/applicant-1874716-1591030.png" width="180" alt="SOM Logo" />
  </a>
</p>

[circleci-image]: https://oxolo.com
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  <br/>
  Personalized software manager with slack built for Software engineers.
</p>

## Introduction

This vime backend act as a middleware between business users and vime mind that generates advertisement video for products.

If you are a software engineers and you are struggling to manage your daily routines it will definately help you manage your daily fixed tasks.

## Documentation

```
```

## Contribution Guidelines

### Git

1. Never commit directly to main, create a new branch from dev and submit a pull request to dev.
2. main will be only merged with dev branch.
3. New branch shall be created from dev.
4. PR to be sent to dev branch for review and code to be tested on dev branch after merge.
5. Branch name should be in following format:
   `{feat|fix|chore|revert}/NBX-{issue_number}/{small_description}`
   `Example: feat/NBX-1/project-setup`
6. Code commit should be done in following sample format. Note: Will also be linted via commitlint. Also check commitlint.config.js for detailed rules
   `{feat|fix|chore|refactor|test}({module_name}): [NBX-{issue_number}] {commit_desciption}`
   `Example: feat(user-auth): [NBX-9] user auth APIs added`

### Code

1. To be written in Typescript with no explict any.
2. Types should be scoped by modules and if used at multiple places should be scoped in common types
3. Create Nest modules for new features.
4. All features should be scoped such that they are unplugable and less interdependent.
5. In case of dependencies on other modules try to use and define mapper functions which call the other dependency. This will help in cases where we want to replace the module with another one. For example, if we are consuming a postgres module in the auth module, then create a mapper/helper class inside the auth module which handles conversations/calls to postgres module. Thus if we want to replace the postgres module with mysql or no-sql db then we'll just have to update the logic in this file only and not the whole module.

### Dockerfile linting

```shell
docker run --rm -i hadolint/hadolint < Dockerfile
```

and address all info/warning/error suggestions except: DL3008 and DL3013 and DL3016 (they are related to pin version, although it is strongly recommended to always pin package version )


<!-- Security scan triggered at 2025-09-01 23:08:28 -->