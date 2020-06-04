from python:3.6

RUN mkdir -p /bot/src

COPY src /bot/src

COPY ./data /bot

COPY ./requirements.txt /

RUN pip3 install -r requirements.txt

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT "/docker-entrypoint.sh"
