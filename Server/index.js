// index.js
const sendSlackMessage = require('./slack');
const [fetchUserBirthday, checkBirthdaysToday] = require('./birthdayNotification');

function executeTask() {
    // 데이터 요청 및 처리
    fetchUserBirthday().then(data => {
        console.log("이번달 기술연구소 생일자 =>\n", data)
        // 데이터로 후속 작업 수행
        const birthdaysToday = checkBirthdaysToday(data);

        if (birthdaysToday.length > 0) {
            console.log('오늘 생일인 사용자:', birthdaysToday);

            // 생일 사용자 각각에게 슬랙 메시지 보내기
            for (const user of birthdaysToday) {
                const message = `오늘은 ${user.Name_Default}님의 생일입니다! 🎉🎂 생일 축하드립니다!`;
                console.log(message)
                sendSlackMessage(message)
            }
        } else {
            console.log('오늘 생일인 사용자는 없습니다.');
        }
    }).catch(error => {
        // 에러 처리
        console.log("error 발생 => ", error);
    });
}

// 다음 실행 시간을 계산하여 해당 시간에 executeTask 호출
function scheduleDailyTask(hour, minute) {
    const now = new Date();
    let nextRun = new Date();

    nextRun.setHours(hour, minute, 0, 0); // 설정한 시간으로 nextRun 시간 설정

    // 만약 현재 시간이 설정 시간 이후라면 다음 날로 설정
    if (now > nextRun) {
        nextRun.setDate(nextRun.getDate() + 1);
    }

    // 남은 시간 계산
    const timeToNextRun = nextRun.getTime() - now.getTime();

    console.log(`Next run at: ${nextRun}`);

    // 설정된 시간에 executeTask를 호출하고, 이후 매일 호출되도록 재설정
    setTimeout(() => {
        executeTask();
        // 매일 호출하도록 설정
        setInterval(executeTask, 24 * 60 * 60 * 1000); // 24시간 간격으로 호출
    }, timeToNextRun);
}

// scheduleDailyTask(9, 0)
executeTask()