import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import fetch from "node-fetch";
import ResponseMessage from "../../models/responseMessage";

jest.setTimeout(60_000);

const serverStart = () =>
  new Promise((resolve, _reject) => {
    const server = spawn("ts-node", ["../../server.ts"], {
      env: Object.assign({}, process.env, { PORT: 12000 }),
      cwd: __dirname,
    });

    server.stdout.once("data", async (data) => {
      const message = data.toString().trim();
      const url = /Server listening on port : (.+)$/.exec(message);
      const fetchUrl = url ? url[1] : "";
      resolve({ server: server, url: fetchUrl });
    });
  });

test("GET /api", async () => {
  const { server, url }: any = await serverStart();
  const response = await fetch(`http://127.0.0.1:4000/api`);
  const data = await response.json();
  expect(data).toEqual(new ResponseMessage(200, { v: "0.0.1" }));
  server.kill();
});
