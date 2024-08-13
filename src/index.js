import { createApp } from "@deroll/app";
import contractAbi from "./abi.json";
import { encodeFunctionData, hexToString, stringToHex } from "viem";

const contractAddress = process.env.SMART_CONTRACT_ADDRESS || "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

const app = createApp({
  url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5000",
});

app.addAdvanceHandler(async ({ metadata, payload }) => {
  {
    // Retrieve the message sender
    const sender = metadata.msg_sender;
    try {
      // Parse the payload
      const jsonPayload = JSON.parse(hexToString(payload));
      // Debug purpose
      console.log("Advance request payload: ", jsonPayload);
      console.log("Request is sent by: ", sender);
      // Redirect to necessary logic
      switch (jsonPayload.action) {
        // Add Candidate  ACTION
        case "add_candidate": // {"action": "add_candidate", "data": {"candidateName": "Doge"}
          console.log(
            `add candidate hit: sender: ${sender}, candidateName: ${jsonPayload.data.candidateName}`
          );
          // prepare voucher credential
          const addCandidateCallData = encodeFunctionData({
            abi: contractAbi,
            functionName: "addCandidate",
            args: [jsonPayload.data.candidateName],
          });

          // Create a voucher
          await app.createVoucher({
            destination: contractAddress,
            payload: addCandidateCallData,
          });
          break;
        // Vote for a Candidate ACTION
        case "vote": // {"action": "vote", "data": {"voteFor": 1}}
          console.log(
            `vote candidate hit: sender: ${sender}, voteFor: ${jsonPayload.data.voteFor}`
          );

          // prepare voucher credential
          const voteCallData = encodeFunctionData({
            abi: contractAbi,
            functionName: "castVote",
            args: [jsonPayload.data.voteFor],
          });

          // sour a voucher
          await app.createVoucher({
            destination: contractAddress,
            payload: voteCallData,
          });
          break;
        // Get Election Winner ACTION
        case "result":
          console.log(`result hit`);

          // prepare voucher credential
          const resultCallData = encodeFunctionData({
            abi: contractAbi,
            functionName: "getWinner",
            args: [],
          });

          // Create a voucher
          await app.createVoucher({
            destination: contractAddress,
            payload: resultCallData,
          });
          break;

        default:
          await app.createReport({
            payload: stringToHex("route is not implemented."),
          });
          break;
      }
    } catch (error) {
      await app.createReport({
        payload: stringToHex(`invalid request: ${String(error)}`),
      });
      return "reject";
    }

    return "accept";
  }
});

// app.addInspectHandler(async ({ payload }) => {
//   const url = hexToString(payload).split("/"); // rollup/winner
// });

app.start().catch((e) => {
  console.log(e);
  process.exit(1);
});
