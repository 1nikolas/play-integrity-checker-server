# Play Integrity API Checker Server
Cloudlare Worker server for the [Play Inegrity API Checker App](https://github.com/1nikolas/play-integrity-checker-app/)

You can find the old archived Vercel server [here](https://github.com/1nikolas/play-integrity-checker-server-vercel)

> [!WARNING]
> If you want to implement the Play Integrity API in your app you shouldn't do it this way. The API server should not send the whole JSON to the app, only a yes/no. Also ideally you should pair the integrity request with another one (for example login). That way your API won't let the user proceed without a valid Integrity token that passes integrity checks (even if your app is reverse engineered).

## Setup
The server is made for use in [Cloudflare Workers](https://workers.cloudflare.com/). To set it up yourslef:
1) Fork this repository and create a Worker by importing it
2) Go to Settings -> Variables and Secrets on Cloudflare's dashboard and set the following variables:
- `PACKAGE_NAME` with a value equal to your app's package name
- `GOOGLE_APPLICATION_CREDENTIALS` to the json contents of the service account on your Google Cloud project. Make sure it's the same project you linked on your Play Console. It's recommended that you add this one as a secret.

## How to set up Google Cloud
1) Make a new project
2) Go to APIs & Services -> Enabled APIs & Services -> Enable APIs & Services and enable the *Play Integrity API*
3) On the Google Play Integrity API page go to Credentials -> Create Credentials -> Service Account. Set a name and leave everything to the default.
4) Go to Keys -> Add Key -> Create new key. The json that downloads automactially is the json you need for the Environment Variable.

## License

MIT License

```
Copyright (c) 2025 Nikolas Spiridakis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
