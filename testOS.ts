import wdio = require('webdriverio');



async function main(): Promise<void> {
    const opts = {
        port: 4723,
        capabilities: {
            platformName: "Windows",
            platformVersion: "10.0",
            deviceName: "WindowsPC",
            // appWorkingDir: "C:\\Program Files\\FlashPARCS",
            // app: "C:\\Program Files\\FlashPARCS\\FlashParcs.exe"
            app: "Root"
        }
    };

    //~ is automationID

    var RootSession: wdio.BrowserObject = await wdio.remote(opts)

    var FPWindow = await RootSession.$('~BaseForm')

    var FPWindowHandle = await FPWindow.getAttribute("NativeWindowHandle")

    const FPOpts = {
        port: 4723,
        capabilities: {
            platformName: "Windows",
            platformVersion: "10.0",
            deviceName: "WindowsPC",
            appTopLevelWindow: parseInt(FPWindowHandle).toString(16)
        }
    };

    var FPSession = await wdio.remote(FPOpts)
    var FPWindow = await FPSession.$('~BaseForm')
    var allElems = await FPSession.findElements('xpath','*')    
    
}


main();



















