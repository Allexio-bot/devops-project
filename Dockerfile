from python

RUN mkdir /bot

COPY ./bot.py /bot

COPY ./my_parser.py /bot

COPY ./sot_interaction.py /bot

COPY ./data /bot

COPY ./requirements.txt /bot

RUN cd /bot \
    pip install -r requirements.txt

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT "/docker-entrypoint.sh"
