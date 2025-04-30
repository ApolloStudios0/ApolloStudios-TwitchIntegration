RegisterCommand('twitch', function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'ShowEverything'
    })
end)

RegisterNUICallback('stopUIControl', function(data, cb)
    SetNuiFocus(false, false)
end)

-- [ Double Check We Capture Source - NUI Can Be Shifty In Returning Source ]
-- [ Firing through an event to ensure we capture the source correctly ]
RegisterNetEvent('as-TwitchIntegration:client:Log', function(streamerConnectedTo)
    TriggerServerEvent("as-TwitchIntegration:server:Log", streamerConnectedTo)
end)

RegisterNUICallback('ChatLoaded', function(data, cb)
    local streamerConnectedTo = data.streamerConnectedTo
    TriggerEvent("as-TwitchIntegration:client:Log", streamerConnectedTo)
end)