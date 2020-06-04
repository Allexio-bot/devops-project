from python:3.6

RUN mkdir /bot

COPY src /bot/src

COPY ./data /bot/data

COPY ./requirements.txt /

RUN pip3 install -r requirements.txt

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT "/docker-entrypoint.sh"
