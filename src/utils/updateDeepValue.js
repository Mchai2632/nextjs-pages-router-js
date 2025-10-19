export function updateDeepValue(obj, path, value) {
  const keys = path.split(".");
  const newObj = structuredClone(obj); // ✅ 深拷贝
  let temp = newObj;

  keys.slice(0, -1).forEach((key) => {
    temp = temp[key];
  });

  temp[keys[keys.length - 1]] = value;
  return newObj;
}
