// Name: App Script

//This code has to be in the .kenv folder that script kit makes for you, I only took it out so that I wasn't committing my entire script kit folder to github
import "@johnlindquist/kit"

let calander = await widget(`
    <div class="text-green-300 bg-slate-900 border-lime-200 border-2 rounded px-4 py-2 mr-1 w-64 font-mono">
        <h1>{{date}} <br> {{time}}</h1>
        <form>
            <input type="time" id=timer class="bg-slate-700 border-2 rounded w-40"></input>
        </form>
        <audio src="assets/old-mechanic-alarm-clock-140410.mp3"></audio>
    </div>`,{
    alwaysOnTop: true,
    movable: true,
    draggable: true,
    hasShadow: false,
    transparent: false,
})

let alarmValue
let awaitingTime = false
calander.onInput((event) => {
    timer()
    if(event.targetId === "timer"){
        alarmValue = event.value
        awaitingTime = true
    }
})

let timer = function(){
    let minsNum = new Date().getMinutes()
    let hrsNum = new Date().getHours()
    let mins = minsNum.toString().padStart(2, "0")
    let hrs = hrsNum.toString().padStart(2, "0")
    if(hrs + ":" + mins === alarmValue && awaitingTime === true){
        div(`<h1>Attention: Your Alarm for ${alarmValue} is going off</h1>`)
        awaitingTime = false
    }
}


setInterval(() => {
    calander.setState({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
    })
    
}, 1000)
setInterval(timer)





