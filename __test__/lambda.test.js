import { handler } from "../lambda.js";

describe("AWS Lambda", () => {
  test("completes request to lambda", async () => {
    const fakeEvent = {
      resource: "/{proxy+}",
      path: "/",
      httpMethod: "GET",
      headers: {
        Accept: "*/*",
        "CloudFront-Forwarded-Proto": "https",
        Host: "spoke.example.com",
        origin: "https://spoke.example.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
        "X-Twilio-Body": "\u0019!@#!@K#J!@K#J!@#",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
      },
      multiValueHeaders: {
        Accept: ["*/*"],
        "CloudFront-Forwarded-Proto": ["https"],
        Host: ["spoke.example.com"],
        "X-Twilio-Body": ["\u0019!@#!@K#J!@K#J!@#"],
        "X-Forwarded-Port": ["443"],
        "X-Forwarded-Proto": ["https"]
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: { proxy: "" },
      stageVariables: { lambdaVersion: "latest" },
      requestContext: {
        resourcePath: "/{proxy+}",
        httpMethod: "POST",
        requestTime: "25/Oct/2018:00:08:03 +0000",
        path: "/",
        protocol: "HTTP/1.1",
        stage: "latest",
        domainPrefix: "spoke",
        requestTimeEpoch: 1540426083986,
        domainName: "spoke.example.com"
      },
      isBase64Encoded: false
    };

    try {
      await handler(
        fakeEvent,
        {
          succeed: response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toBe(
              "text/html; charset=utf-8"
            );
            // console.log('context.succeed response', response)
          }
        },
        (err, res) => {
          console.log("result returned through callback", err, res);
        }
      );
    } catch (err) {
      console.error(err);
    }
    // console.log('lambda server', result)
  });
});
