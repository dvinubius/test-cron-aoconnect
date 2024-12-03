import { connect, createDataItemSigner } from "@permaweb/aoconnect";
import { readFileSync } from "node:fs";

const { result, message, spawn, monitor } = connect(
  {
    MU_URL: "https://mu.ao-testnet.xyz",
    CU_URL: "https://cu.ao-testnet.xyz",
    GATEWAY_URL: "https://arweave.net",
  },
);

const wallet = JSON.parse(
  readFileSync("./.aos.json").toString(),
);

const source = `
Handlers.add(
  'trigger',
  Handlers.utils.hasMatchingTag("Action", "TriggerSwap"),
  function(msg)
    Handlers.utils.reply("success")(msg)
    ao.send({ Target = ao.id, Data = "SUCCESS" })
  end
)
`

const createCron = async () => {
  try {
    const result = await spawn({
      module: "SBNb1qPQ1TDwpD_mboxm2YllmMLXpWw4U8P9Ff8W9vk",
      scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
      signer: createDataItemSigner(wallet),
      tags: [
        { name: "Name", value: "CronTest" },
        { name: "Cron-Interval", value: '1-minute' },
        { name: "Cron-Tag-Action", value: 'TriggerSwap' },
      ],
    })
    console.log('📜 LOG > process', result);

    const monitorResult = await monitor({
      process: result,
      signer: createDataItemSigner(wallet),
    });
    
    console.log('📜 LOG > monitorResult:', monitorResult)

    let installed = false
    while (!installed) {
      try {
        const evalMsgId = await message({
          process: result,
          data: source,
          signer: createDataItemSigner(wallet),
          tags: [{ name: "Action", value: "Eval" }],
        })
        installed = true
        console.log("📜 LOG > evalMsg:", evalMsgId)
      } catch (e) {
        console.log('500 on eval ', e)
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
    }

  } catch (err) {
    console.error(err)
  }
}


const spawnProcess = async () => {
  try {
    const r = await spawn({
      module: "SBNb1qPQ1TDwpD_mboxm2YllmMLXpWw4U8P9Ff8W9vk",
      scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
      signer: createDataItemSigner(wallet),
      tags: [
        { name: "Name", value: "Neo"}
      ]
    })
    console.log(r);

    evalMsgId = await message({
      process: r,
      data: source,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [{ name: "Action", value: "Eval" }],
    })

    console.log("📜 LOG > evalMsg:", evalMsgId)

  } catch (e) {

  }
}



createCron().then(res => {
  console.log("DONE");
}).catch(console.error);