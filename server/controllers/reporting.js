
const Visit = require("../models/Visit");

const isIpLimited = async (req) => {
  let forwarded = req.headers["x-forwarded-for"]
  let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

  try {
    const isIpExist = await Visit.findOne({ ip: ip });
    if (isIpExist) {
      isIpExist.token = isIpExist.token + 1
      isIpExist.currentTime = Date.now()
      await isIpExist.save();
      
      const token6 = isIpExist.token >= 6
      const token12 = isIpExist.token >= 12
      const is24hOver = (isIpExist.currentTime - isIpExist.lastTime) < 86400000
      const is48hOver = (isIpExist.currentTime - isIpExist.lastTime) < 172800000
      if ((token6 && is24hOver) || (token12 && is48hOver)) {
          return true
      } else {
        isIpExist.lastTime = Date.now()
        await isIpExist.save();
        return false
      }
      
    } else {
      let newVisit = new Visit({
        ip: ip,
        token: 1,
        firstTime: Date.now(),
        lastTime: Date.now(),
        currentTime: Date.now(),
      });
      const savedVisit = await newVisit.save();
      return false
    }
  } catch (err) {
    console.log("visitIp err: ", err)
    return;
  }


}
  

