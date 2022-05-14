# Docs on heroku site.
# Logging: https://devcenter.heroku.com/articles/logging.

# Show 100 lines of logs.
heroku logs -a ilya-bear-app

# Show last n lines of logs.
heroku logs -a ilya-bear-app -n 50

# Real-time logs.
heroku logs -a ilya-bear-app --tail

# Restart dyno.
heroku restart -a ilya-bear-app

# Connect to postgres.
heroku pg:psql postgresql-symmetrical-13051 --app ilya-bear-app

# Display config.
heroku config --app ilya-bear-app

# Set config parameter value.
heroku config:set GITHUB_USERNAME=joesmith --app ilya-bear-app