local json = require "json"

Handlers.add(
  "newOwner",
  Handlers.utils.hasMatchingTag("Action", "Set-Owner"),
  function(m)
    Owner = m.Tags["New-Owner"]
  end
)


Handlers.add(
  "getOwner",
  Handlers.utils.hasMatchingTag("Action", "Get-Owner"),
  function(m)
    ao.send({ Target = ao.id, Data = tostring(Owner) })
  end
)
