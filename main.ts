function i2cWrite3 (num0: number, num1: number, num2: number) {
    let buf = pins.createBuffer(3)
buf[0] = num0
    buf[1] = num1
    buf[2] = num2
    pins.i2cWriteBuffer(addr, buf)
}
function ADS1115Read (channel: number) {
    // counts per volt
    SCALE = 8000
    // starts conversion
    OS = 1
    // single-ended mode, AIN0 and GND
    // MUX = 4
    // Single shot mode
    MODE = 1
    // 1 = +/- 4.096V FSR
    PGA = 1
    // Disable the comparator
    DIS = 3
    let MUX=1 | channel
let configHi = OS<< 7 | MUX << 4 | PGA << 1 | MODE
configLo = DIS
    i2cWrite3(1, configHi, configLo)
    pins.i2cWriteNumber(
    addr,
    0,
    NumberFormat.Int8LE,
    false
    )
    // result = 0
    return pins.i2cReadNumber(addr, NumberFormat.Int16BE, false) / SCALE
}
let configLo = 0
let DIS = 0
let SCALE = 0
let addr = 0
let OS = 0
let MODE = 0
let PGA = 0
addr = 72
