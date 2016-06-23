module.exports = {
  extractModule: (modulePath) => {
   const result = modulePath.match(/(?:import)\s(.+)(?:from)\s['|"](.*)['|"];?/)
   return result.pop();
  }
}

