import os
import discord
import my_parser
PREFIX = "sot"

client = discord.Client()

@client.event
async def on_ready():
    print('Bot has logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith(PREFIX):
        print("input: ", message.content.replace(PREFIX, ""))
        await message.channel.send(my_parser.parser(message.content.replace(PREFIX, "")))

def startup():
    try:
        client.run(os.getenv("discord_sot_token"))
    except:
        print("Could not access environment variable!")

startup()