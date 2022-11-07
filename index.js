//for testing the use of child processes in nodeJS to run a py script (weather parsing)

const spawn = require("child_process").spawn;

const process = spawn('python',["./weatherParse.py"]);

process.stdout.on('data', (data) => {
    const str = String.fromCharCode.apply(null, data).replace(/\s/g, "").replace("b", "").replace("'", "");
            const values = str.split("-");

            const temp = values[0];
            const realFeel = values[1];
            const windDir = values[2];
            const windSpeed = values[3];
            const dewPoint = values[4];
            const precipitation = values[5];
            const totalPrecipitation = values[8];
            const pressure = values[6];
            const humidity = values[7];
        console.table({temperature: temp + " °F", realFeel: realFeel.replace("FeelsLike", "") + " °F", windDir: windDir, windSpeed: windSpeed.split('/')[0] + " mph",windGustSpeed: windSpeed.split('/')[1].replace("mph", "") + " mph", dewPoint: dewPoint + " °F", precipitation: precipitation + " in", totalPrecipitation: totalPrecipitation + " in", pressure: pressure + " inHg", humidity: humidity + " %"});
} )

process.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(uint8arrayToString(data));
});

process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });