RegisterCommand('celular', function()
    SendNUIMessage({
        action = "abrir",
    })
end)

RegisterKeyMapping('celular', 'Abrir Celular', 'keyboard', 'K')
