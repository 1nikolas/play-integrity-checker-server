import GoogleAuth from 'cloudflare-workers-and-google-oauth'

async function getTokenResponse(integrityToken, env) {
    const packageName = env.PACKAGE_NAME;
    const creds = env.GOOGLE_APPLICATION_CREDENTIALS;

    const scopes = ['https://www.googleapis.com/auth/playintegrity']
    const googleAuth = JSON.parse(creds)

    const oauth = new GoogleAuth(googleAuth, scopes)
    const googleToken = await oauth.getGoogleAuthToken()


    const res = await fetch(`https://playintegrity.googleapis.com/v1/${packageName}:decodeIntegrityToken`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${googleToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({integrity_token: integrityToken}),
    })

    const resJson = await res.json()

    if ('error' in resJson) {
        throw new Error(resJson.error.message)
    }

    if (!('tokenPayloadExternal' in resJson)){
        throw new Error('Google API Response did not contain tokenPayloadExternal.')
    }

    return resJson.tokenPayloadExternal
}

export async function checkEndpoint(params, env) {
    const integrityToken = params.get('token');

    if (!integrityToken) return Response.json({ error: 'Bad Request' }, { status: 400 });

    try {
        const data = await getTokenResponse(integrityToken, env);
        return Response.json(data, { status: 200 });
    } catch (e) {
        return Response.json({ error: 'Google API Error:\n' + e.message }, { status: 200 });
    }
}
