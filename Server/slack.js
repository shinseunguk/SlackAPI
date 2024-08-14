// slack.js
const constants = require('./Constants.json')
// 슬랙 웹후크 URL
const SLACK_WEBHOOK_URL = constants.SLACK_WEBHOOK_URL

// 슬랙으로 메시지를 보내는 함수
async function sendSlackMessage(message) {
    try {
        const response = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: message })
        });

        if (!response.ok) {
            throw new Error('Slack message sending failed');
        }

        console.log('Slack message sent successfully');
    } catch (error) {
        console.error('Error sending Slack message:', error);
    }
}

// 모듈로 내보내기
module.exports = sendSlackMessage;