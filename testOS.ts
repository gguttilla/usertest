import { OperatingSystem } from './../win-funkies/src/OperatingSystem'

interface windowElement {
    id: string,
    text: string
}

async function main(): Promise<void> {
    
    //child_process.execSync('start cmd.exe /K "C:\\Users\\giogu\\Documents\\Work\\FlashParking\\Automation\\AutomationBatchProgram\\WindowAutomation\\WindowAutomation\\bin\\x64\\Debug\\WindowAutomation.exe "')

    var ScriptPath = "C:\\Users\\giogu\\Documents\\Work\\FlashParking\\AutomationCommands\\WindowAutomation\\WindowAutomation\\bin\\x64\\Debug\\WindowAutomation.exe";
   
    //var res = await OperatingSystem.promiseFromExec(ScriptPath + ' CreateNewProcess "C:\\Program Files\\FlashPARCS\\FlashParcs.exe"')
    //console.log(res)

    var res = await OperatingSystem.promiseFromExec(ScriptPath + ' GetRunningProcessHandle FlashPARCS')
    console.log(res)
    
    var rawWindowData = await OperatingSystem.promiseFromExec(ScriptPath + ' GetWindowElements ' + res)
    console.log(rawWindowData)

    
    var splitData = rawWindowData.split("\n")

    var windowData: Array<windowElement> = [];
    splitData.forEach((elem, i)=>{
        var id = elem.split(" ")[0]
        var text = elem.split(" ")[1]
        if(id != null && text != null){
            windowData.push({
                id: id,
                text: text.replace("\r", "")
            })  
        }
    })

    console.log(windowData)
    
    windowData.forEach(async (elem)=>{
        var cmd = '"' +  ScriptPath + '" ClickElement ' + res + ' ' + elem.id
        console.log(await OperatingSystem.promiseFromExec(cmd))
    })
    
}


main();



















