FROM neeto/ruby-3.0.1:node16

ENV APP_PATH /var/app
ENV BUNDLE_VERSION 2.2.32
ENV RAILS_PORT 3000
ENV LAUNCHY_DRY_RUN true
ENV BROWSER /dev/null
ENV BUNDLE_PATH /usr/local/bundle
ENV GEM_PATH /usr/local/bundle
ENV GEM_HOME /usr/local/bundle

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# install dependencies for M1 Macs
RUN apk add --update --no-cache curl py-pip python3

RUN apk add --no-cache mariadb-dev build-base

# install dependencies for application
RUN apk -U add --no-cache \
  make \
  gcc \
  build-base \
  git \
  libxml2-dev \
  libxslt-dev \
  nodejs-current \
  npm \
  yarn \
  tzdata \
  && rm -rf /var/cache/apk/* \
  && mkdir -p $APP_PATH


RUN gem install bundler --version "$BUNDLE_VERSION"

# navigate to app directory
WORKDIR $APP_PATH

COPY Gemfile ./
COPY package.json yarn.lock ./

RUN bundle check || bundle install --jobs=8
RUN yarn install --check-files

COPY . .

EXPOSE $RAILS_PORT
RUN RAILS_ENV=production bundle exec rake assets:precompile
