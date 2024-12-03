local json = require "json"

Cred = "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"

Neo = "g44Ky-v_wSfxxGwp1Syn6UsfP-2Z9k6kMg5CCriTsmI"


Handlers.add(
  'trigger',
  Handlers.utils.hasMatchingTag("Action", "Cron"),
  function(msg)
    -- print("Cron job triggered. Transferring directly...")
    -- ao.send({
    --   Target = Cred,
    --   Action = "Transfer",
    --   Quantity = "1",
    --   Recipient = Neo
    -- })

    -- print("Cron job triggered. Transferring via SELF NOTICE")
    -- ao.send({ Target = ao.id, Action = "Transfer" })

    -- table.insert(msg, { ["Pushed-For"] = ao.id })
    -- table.insert(msg.Tags, { ["Pushed-For"] = ao.id })
    -- ao.send({ Target = ao.id, Action = "Self" })
  end
)

Handlers.add(
  'transfer',
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- print("Transfer initiated")
    -- ao.send({
    --   Target = Cred,
    --   Action = "Transfer",
    --   Quantity = "1",
    --   Recipient = Neo
    -- })
    -- print(json.encode(msg))
    -- ao.send({ Target = ao.id, Action = "Self" })
  end
)

Handlers.add(
  "debitNotice",
  Handlers.utils.hasMatchingTag("Action", "Self"),
  function(m)
    print(json.encode(m))
  end
)


Handlers.add(
  "sleepy",
  Handlers.utils.hasMatchingTag("Action", "Sleep"),
  function(m)
    print("Sleeping for 30 seconds")
    os.execute("sleep 30")
    print("Woke up")
  end
)
