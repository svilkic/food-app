var formatter = new Intl.NumberFormat("sr-Latn-RS", {
  style: "currency",
  currency: "rsd",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(number) {
  return formatter.format(number).toLowerCase();
}

export function generateID() {
  const string = Date.now().toString(8);
  return (
    "1" +
    string
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("")
  );
}

export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return Array.from(map);
}

export function firebaseTimestampToString(timestamp) {
  const { seconds, nanoseconds } = timestamp;
  const fireBaseTime = new Date(seconds * 1000 + nanoseconds / 1000000);
  var dd = String(fireBaseTime.getDate()).padStart(2, "0");
  var mm = String(fireBaseTime.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = fireBaseTime.getFullYear();
  const date = dd + "/" + mm + "/" + yyyy;
  const atTime = fireBaseTime.toLocaleTimeString();
  return date + " " + atTime;
}
