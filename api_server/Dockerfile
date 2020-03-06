FROM rustlang/rust:nightly

# Already installed
# RUN apt-get update && apt-get install default-libmysqlclient-dev

RUN cargo install diesel_cli --no-default-features --features mysql

RUN cargo install cargo-watch

WORKDIR /usr/src/app

EXPOSE 3001

VOLUME ["/usr/local/cargo"]
