#/bin/bash

cd /bot/src
if [ "${discord_sot_token}" = "" ]; then
    cat /bot/discord_token
    export discord_sot_token=$(cat /bot/discord_token)
fi

python3 bot.py
