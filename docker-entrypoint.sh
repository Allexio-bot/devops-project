#/bin/bash

cd /bot/src

#echo "Avant le if"
#if [ "${discord_sot_token}" = "" ]; then
#    cat /bot/discord_token
#    export discord_sot_token=$(cat /bot/discord_token)
#fi
#echo "Après le if: ${discord_sot_token}"
#ls /bot

export discord_sot_token=$DISCORD_SOT_TOKEN

python3 bot.py
