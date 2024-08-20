//birthdayNotification.js
const fetch = require('node-fetch');
const constants = require('./Constants.json')

// 요청할 URL
const url = constants.INCROSS_URL

// GET 요청을 보내는 함수
async function fetchUserBirthday() {
    try {
        // HTTP GET 요청 보내기
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 응답이 성공적인지 확인
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // 응답 데이터 가져오기
        const userData = await response.json();
         
        // 데이터 출력
        // console.log('User Birthday Data:', userData);

        const serviceDevTeamBirthdays = filterServiceDevelopmentTeamBirthdays(userData.data);
        // console.log(serviceDevTeamBirthdays);

        return serviceDevTeamBirthdays
    } catch (error) {
        // 에러 처리
        console.error('There was a problem with the fetch operation:', error);
        return error
    }
}

// 서비스개발팀 || 인프라개발팀의 생일 데이터만 필터링하는 함수
function filterServiceDevelopmentTeamBirthdays(userData) {
    return userData.filter(user => user.DepartName === '서비스개발팀' || user.DepartName === '인프라개발팀');
}

// 오늘 날짜를 'DD-MM-YY' 형식으로 가져오는 함수
function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2); // 2자리 연도로 변환
    // return `${year}-${month}-${day}`;
    return `${year}-${month}-${20}`;
}

// BirthDate가 오늘 날짜와 일치하는지 확인하는 함수
function checkBirthdaysToday(users) {
    const todayDate = getTodayDate();
    console.log("오늘 날짜 => ", getTodayDate())
    return users.filter(user => {
        // BirthDate가 존재하고, 오늘 날짜와 일치하는지 확인
        return user.BirthDate && user.BirthDate.startsWith(todayDate);
    });
}

// 모듈로 내보내기
module.exports = [
    fetchUserBirthday,
    checkBirthdaysToday
]