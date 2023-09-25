const valueToLabel = (present: any, label = 'valueName', value = 'valueCode') => {
  if (Array.isArray(present)) {
    try {
      const obj: { [key: string]: any } = {};
      const done = present.reduce((prev: any, cur: any) => {
        if (!obj[cur[value]])
          obj[cur[value]] = prev.push({ label: cur[label], value: cur[value], opt: cur });
        return prev;
      }, []);
      return done;
    } catch (e) {
      console.log(e);
      return [];
    }
    return [];
  }
  return [];
};
export default valueToLabel;
