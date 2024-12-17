const roundRobinProxy = (proxyIndex: number, proxies: string[]) => {
  if (proxies.length === 0) return { proxy: undefined, newIndex: proxyIndex };
  const proxy = proxies[proxyIndex];
  const newIndex = (proxyIndex + 1) % proxies.length;
  return { proxy, newIndex };
};

export { roundRobinProxy };
