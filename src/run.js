const url = require('url');
const config = require('../config');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const axios = require('axios').default;
const qs = require('qs');

// All in 4 for testing only
const FIRST_CASE = "python src/script.py 4";
const SECOND_CASE = "python src/script.py 4";
const THIRD_CASE = "python src/script.py 4";
let currentCase = FIRST_CASE;

const SERVICE_ENDPOINT = config.serviceEndpoint;
const SERVICE_ALECTRION = config.serviceAlectrion;

const TIME_DELAY_MORNING = 20000;
const TIME_DELAY_EVENING = 600000;
const MORNING_HOUR = 8;
const EVENING_HOUR = 18;

let timeSleepMax = 30000;
let timeSleepMin = 10000;
let timeSleep = timeSleepMax;

const LIMIT_EXECUTIONS = 6;
let attempsRunScript = 0;

(async () => {
    console.log("Alectrion bot warding: " + SERVICE_ENDPOINT)
    let requestSuccesful = false;
    while(true){
        try{
            verifyDay();
            requestSuccesful = await sendGetRequest();
            if(!requestSuccesful) await runAction();
            await sleepTimer.sleep(timeSleep);
        } catch(error){
            console.log(error);
        }
    }
})();

const sendGetRequest = async () => {
    let apiIsWorking = true;
    try {
        let requestData = qs.stringify({"url": "12345"});
        let response = await axios.post(SERVICE_ENDPOINT, requestData);
        if(response.data == "\t\t"){
            apiIsWorking = false;
        }
    } catch (err) {
        apiIsWorking = false;
    }
    if(apiIsWorking) {
        if(attempsRunScript != 0) console.log("Server returns to normal");
        timeSleep = timeSleepMax;
        attempsRunScript = 0;
        return true;
    }
    timeSleep = timeSleepMin;
    console.log("No server response {"+ attempsRunScript +"}");
    console.log("Attemps run action: " + attempsRunScript);
    if(attempsRunScript++ >= LIMIT_EXECUTIONS){
        console.log("The service_ENDPOINT is not working, time to notify");
        timeSleep = timeSleepMax
        try {
            const requestPayload = {count: attempsRunScript, status: "offline"};
            const params = new url.URLSearchParams(requestPayload);
            const getRequest = `${SERVICE_ALECTRION}?${params}`;
            await axios.get(getRequest);
        } catch (err) {
            console.log("err:" + err)
        }
        return true;
    }
    return false;
};

const runAction = async () => {
    if(attempsRunScript == 2 || attempsRunScript == 4){
        currentCase = SECOND_CASE;
    }else if (attempsRunScript == 3){
        currentCase = THIRD_CASE;
    }
    else{
        currentCase = FIRST_CASE;
    }
    try {
        console.log("Running action for: " + SERVICE_ENDPOINT + ", with python script: " + currentCase);
        const { stdout, stderr } = await exec(currentCase);
        if (stderr) {
            console.error(`error: ${stderr}`);
        }else{
            console.log('\n\t stdout: ' + stdout);
        }
    } catch (error) {
        console.log("err " +scriptCommand+ " \n" + error);
    }
};

function verifyDay(){
    let dateNow = new Date();
    let hours = dateNow.getHours();
    if(hours >= MORNING_HOUR && hours <= EVENING_HOUR){
        timeSleepMax = TIME_DELAY_MORNING;
    }else{
        timeSleepMax = TIME_DELAY_EVENING;
    }
}

function sleepTimer(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
