export default async (req, res) => {
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_SECRET,
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
    })

    const reauthorizeResponse = await fetch('https://www.strava.com/oauth/token', {
        method: 'post',
        "headers": headers,
        "body": body
    })

    const reAuthJson = await reauthorizeResponse.json()

    const response = await fetch('https://www.strava.com/api/v3/athlete/activities?access_token=' + reAuthJson.access_token)
    const json = await response.json()
    
    return res.status(200).json({
        json
    })
}