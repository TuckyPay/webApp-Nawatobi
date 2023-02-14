const sound01 = new Audio("sounds//button45.mp3")
const sound02 = new Audio("sounds//button55.mp3")

const btn = document.getElementById("btn")
const vol_text = document.getElementById("vol-text")
const volbtn_plus = document.getElementById("plus_vol")
const volbtn_minus = document.getElementById("minus_vol")
const nowEvent = document.getElementById("nowEvent")
const nextEvent = document.getElementById("nextEvent")
const timer = document.getElementById("timer")
const btn_r = document.getElementById("btn-r")
let EventList = ["両足跳び",
                "駆け足跳び",
                "二拍子跳び",
                "グーパー跳び",
                "チョキチョキ跳び",
                "スキー跳び"] 
let EventTime = [30,30,30,30,30,30]
let startFlug = false
let flug = false;
let countSecounds = 0
let N = 0
let vol = 0.5

nowEvent.innerText = EventList[0]
nextEvent.innerText = EventList[1]

function startShowing(){
    PassageID = setInterval(showSecounds, 1000)  
} 

function stopShowing(){
    clearInterval(PassageID)
}

function showSecounds(){
    countSecounds++
    console.log(countSecounds+"秒経過")
    nowTime = EventTime[N] - countSecounds
    if(nowTime <= 0){
        sound02.volume = vol
        sound02.play()
    }
    else if(nowTime <= 3) {
        sound01.volume = vol
        sound01.play()
    }
    timer.innerText = nowTime + "秒"

    NAWATOBI()
}

const NAWATOBI = () => {
    if(countSecounds >= EventTime[N]) {
        N++
        nowEvent.innerText = EventList[N]
        if(N + 1 < EventList.length) {
            nextEvent.innerText = EventList[N + 1] 
        }
        else {
            nextEvent.innerText = "N/A"
        }
        countSecounds = 0
    }

    if(N >= EventList.length) {
        nowEvent.innerHTML = "終了！"
        btn.innerText = "START"
        N = 0
        countSecounds = 0
        flug = false
        startFlug = false
        stopShowing()
    }
}


btn.addEventListener("click", (e) => {
    e.preventDefault()
    if(!flug) {
        flug = true
        N = 0
        countSecounds = 0
        nowEvent.innerText = EventList[0]
        nextEvent.innerText = EventList[1]
        timer.innerText = EventTime[0] + "秒"
    }
    if(!startFlug) {
        startShowing();
        btn.innerText = "STOP"
        startFlug = true
    }
    else {
        stopShowing()
        startFlug = false
        btn.innerText = "START"
    }
    
})

btn_r.addEventListener("click", (e) => {
    e.preventDefault()
    stopShowing()
    btn.innerText = "START"
    flug = false
    startFlug = false
    N = 0
    countSecounds = 0
    nowEvent.innerText = EventList[0]
    nextEvent.innerText = EventList[1]
    timer.innerText = "(秒)"
})

volbtn_plus.addEventListener("click", (e) => {
    e.preventDefault()
    vol += 0.1
    if(vol > 1){
        vol = 1
    }
    vol_text.innerText = "vol:" + Math.round(vol * 10) / 10
    console.log(vol)
})

volbtn_minus.addEventListener("click", (e) => {
    e.preventDefault()
    vol -= 0.1
    if(vol < 0){
        vol = 0
    }
    vol_text.innerText = "vol:" + Math.round(vol * 10) / 10
    console.log(vol)
})
