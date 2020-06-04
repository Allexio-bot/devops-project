#/bin/bash

cd /bot/src
if [ "${discord_sot_token}" = "" ]; then
    export discord_sot_token=$(cat /bot/discord_token)
fi

python3 bot.py
