RegisterCommand('celular', function()
    print('teste??')
    SendNUIMessage({
        action = "abrir",
    })
end)

RegisterKeyMapping('celular', 'Abrir Celular', 'keyboard', 'K')