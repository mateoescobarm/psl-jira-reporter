[![Build Status](https://travis-ci.org/svillegasz/jira-reporter.svg?branch=master)](https://travis-ci.org/svillegasz/jira-reporter)

# PSL - Jira Reporter

## Setting up Username and Password

> Make sure you have at least [Ruby](http://www.ruby-lang.org/en/downloads/) 1.9.3 (2.0.0 recommended) installed, and then install the travis cli:
```sh
$ gem install travis -v 1.8.8 --no-rdoc --no-ri
```
> In the root of the project run:
```sh
$ travis encrypt JIRA_USERNAME=<your_jira_username> --add
```
> And finally:
```sh
$ travis encrypt JIRA_PASSWORD=<your_jira_password> --add
```

## Setting up the travis cron job
> Follow the travis [getting started guide](https://docs.travis-ci.com/user/getting-started/) and then setup a [cron job](https://docs.travis-ci.com/user/cron-jobs/) to run the project periodically

## Add jira-reports-file.json
### IMPORTANT!
> *Add* your ```jira-reports-file.json``` file. There is a template for that in ```jira-report-template.json``` (if you don't have the ```jira-reports-file.json``` it won't work).

> Add for every day the work you want, the comment and the time

> To know which works are available to report please refer to ```jira-works.js``` if your wokr is not there please request the admin to add it
