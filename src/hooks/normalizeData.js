const normalize = (dataRaw, totalPage) => {
  const data = dataRaw.map((r) => r)
  const arrGroup = Array.from({length: totalPage}, () => data.splice(0,5));
  const dataNormalize =
      arrGroup.reduce((obj,item, idx) => {
        return {
          ...obj,
          [idx+1]: item,
        };
      }, {})
  return dataNormalize
}

export default normalize