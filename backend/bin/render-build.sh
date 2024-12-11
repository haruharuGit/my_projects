#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install required gems
bundle install --jobs=4 --retry=3

# Precompile assets for production
export RAILS_ENV=production
bundle exec rake assets:precompile

# Clean old assets
bundle exec rake assets:clean

# Perform database migrations if using a Free instance type
# Uncomment the following line if needed:
# bundle exec rails db:migrate


# 以下はデフォルト
# !/usr/bin/env bash
# exit on error
# set -o errexit

# bundle install
# bundle exec rails assets:precompile
# bundle exec rails assets:clean

# If you're using a Free instance type, you need to
# perform database migrations in the build command.
# Uncomment the following line:

# bundle exec rails db:migrate