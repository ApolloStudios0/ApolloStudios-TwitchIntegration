game 'gta5'
fx_version 'cerulean'

name 'as-TwitchIntegration'
description 'ApolloStudios Twitch Integration - Keeping Players In The Moment 24/7 So They Dont Have To Peek To Other Monitors.'
author 'ApolloStudios (discord: apollostudios)'

ui_page 'html/index.html'
client_scripts {
    'client/ApolloTwitchIntegration.lua'
}
server_scripts {
    'server/log.lua'
}

files {
    'html/*.*'
}

lua54 'yes'
use_experimental_fxv2_oal 'yes'