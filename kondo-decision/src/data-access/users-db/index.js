const CIM_URL = "https://dl.airtable.com/.attachments/109d5ff9630bc775ebc23a68ed9ef7c7/2f303f40/ScreenShot2020-07-31at3.56.57pm.png"

const CURRENT_USER = {
    avatarURL: CIM_URL,
    name: 'Duncan Clark'
}

let fetchCurrentUser = () => {
    return Promise.resolve(CURRENT_USER)
}


module.exports = {
    fetchCurrentUser
}