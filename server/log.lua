-- [ Discord Logging Functionality ]
-- local discord_webhook = ''
-- function sendToDiscord(color, name, message, footer)
--     local embed = {
--         {
--             ["color"] = color,
--             ["title"] = "**".. name .."**",
--             ["description"] = message,
--             ["footer"] = {
--                 ["text"] = footer,
--             },
--         }
--     }
--     PerformHttpRequest(discord_webhook, function(err, text, headers) end, 'POST', json.encode({username = name, embeds = embed}), { ['Content-Type'] = 'application/json' })
-- end

RegisterNetEvent("ApolloStudios-TwitchIntegration:server:Log", function(streamerConnectedTo)

    local src = source
    local log = ('%s has connected to %s chat [Via In-Game Twitch Integration]'):format(GetPlayerName(src), streamerConnectedTo)

    --
    -- REPLACE THE BELOW WITH YOUR OWN LOGGING SYSTEM - HIGHLY RECOMMENDED TO PREVENT META-GAMING
    --
    
    -- [ Apollo Anti Hook - Default (Will Most Likely Not Work For You) ]
    TriggerEvent('ApolloAntiHook:LogEvent', log, 'chat')

    -- [ Discord Logging ]
    --sendToDiscord(16753920, log, "Your Server Name")
end)